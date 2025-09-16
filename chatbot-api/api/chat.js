import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

console.log('Environment check:');
console.log('- API Key present:', !!process.env.OPENAI_API_KEY);
console.log('- API Key format:', process.env.OPENAI_API_KEY?.substring(0, 7) + '...');

export default async function handler(req, res) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const startTime = Date.now();
    const { message, config = {} } = req.body;
    
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Load knowledge base
    const kbPath = path.join(process.cwd(), 'data', 'kb.json');
    const kb = JSON.parse(fs.readFileSync(kbPath, 'utf8'));
    
    // Simple keyword-based retrieval
    // Simple keyword-based retrieval
    const query = message.toLowerCase();
    let retrievedDocs = kb
      .map(doc => ({
        ...doc,
        score: calculateRelevanceScore(doc, query)
      }))
      .filter(doc => doc.score >= 0) // Changed from > 0 to >= 0
      .sort((a, b) => b.score - a.score)
      .slice(0, config.top_k || 3);
    
    // Apply metadata filters if provided
    let filteredDocs = retrievedDocs;
    if (config.filters) {
      filteredDocs = retrievedDocs.filter(doc => {
        if (config.filters.type && doc.metadata.type !== config.filters.type) return false;
        if (config.filters.company && doc.metadata.company !== config.filters.company) return false;
        if (config.filters.category && doc.metadata.category !== config.filters.category) return false;
        return true;
      });
    }
    
    // Fallback context strategy - if no good matches, provide relevant context based on query type
    if (filteredDocs.length === 0 || filteredDocs.every(doc => doc.score === 0)) {
      console.log(`No relevant docs found for "${message}", applying fallback strategy`);
      
      // Contact/communication queries
      if (query.includes('contact') || query.includes('email') || query.includes('reach') || 
          query.includes('phone') || query.includes('linkedin') || query.includes('get in touch')) {
        filteredDocs = kb.filter(doc => doc.metadata.type === 'contact');
      }
      // Personal/demographic queries
      else if (query.includes('age') || query.includes('old') || query.includes('young') || 
               query.includes('where') || query.includes('live') || query.includes('from')) {
        // Provide experience docs that might give timeline context
        filteredDocs = kb.filter(doc => doc.metadata.type === 'experience').slice(0, 2);
        // Add contact for location info
        filteredDocs = filteredDocs.concat(kb.filter(doc => doc.metadata.type === 'contact'));
      }
      // Capability/skill queries
      else if (query.includes('can') || query.includes('able') || query.includes('know') || 
               query.includes('skill') || query.includes('technology') || query.includes('programming')) {
        filteredDocs = kb.filter(doc => doc.metadata.type === 'skills' || doc.metadata.type === 'experience');
      }
      // Work/career queries
      else if (query.includes('work') || query.includes('job') || query.includes('career') || 
               query.includes('employ') || query.includes('company')) {
        filteredDocs = kb.filter(doc => doc.metadata.type === 'experience');
      }
      // Project/portfolio queries
      else if (query.includes('project') || query.includes('built') || query.includes('made') || 
               query.includes('created') || query.includes('portfolio')) {
        filteredDocs = kb.filter(doc => doc.metadata.type === 'project');
      }
      // General questions - provide overview from multiple doc types
      else {
        // Get one doc from each type for comprehensive context
        const experienceDocs = kb.filter(doc => doc.metadata.type === 'experience').slice(0, 1);
        const projectDocs = kb.filter(doc => doc.metadata.type === 'project').slice(0, 1);
        const skillsDocs = kb.filter(doc => doc.metadata.type === 'skills').slice(0, 1);
        filteredDocs = [...experienceDocs, ...projectDocs, ...skillsDocs];
      }
      
      // If still no docs (shouldn't happen with a proper KB), return all docs
      if (filteredDocs.length === 0) {
        filteredDocs = kb.slice(0, 3);
      }
      
      // Limit to top_k even for fallback
      filteredDocs = filteredDocs.slice(0, config.top_k || 3);
    }
    
    // Create context for LLM
    const context = filteredDocs.map(doc => 
      `[${doc.doc_id}] ${doc.content}`
    ).join('\n\n');
    
    // Remove the "no information" early return since we now always have context
    // The LLM can handle cases where context isn't directly relevant
    
    if (filteredDocs.length === 0) {
      return res.status(200).json({
        answer: "I don't have enough information to answer that question. You can ask me about Lewis's experience, projects, or skills.",
        citations: [],
        confidence: 0.0,
        _trace: {
          retrieved_docs: [],
          query: message,
          filters_applied: config.filters || {},
          timestamp: new Date().toISOString(),
          processing_time_ms: Date.now() - startTime
        }
      });
    }
    
    let response;
    let usedMockResponse = false;
    
    // Try OpenAI API first, fallback to mock if it fails
    try {
    const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    temperature: config.llm?.temperature || 0.1,
    max_tokens: config.llm?.max_tokens || 500,
    messages: [
      {
        role: 'system',
        content: `You are Lewis Meyers' portfolio assistant. Use the provided context to answer questions, but you can also make reasonable inferences based on the information available.

    Guidelines:
    - Always cite sources using [doc_id] format when directly referencing information
    - For inferences, be clear about what you're inferring vs. what's explicitly stated
    - If asked about contact info, use the contact document
    - If asked about capabilities/skills not explicitly listed, you can infer from project descriptions and experience
    - If asked about personal details not provided (like age), acknowledge the limitation but provide context if possible
    - If asked about personality/traits, you can infer from accomplishments and work style
    - Be helpful while being transparent about the source of information

    IMPORTANT: Respond with valid JSON in this exact format:
    {
        "answer": "Your answer with [doc_id] citations and clear inferences",
        "citations": ["doc_id1", "doc_id2"],
        "confidence": 0.8
    }

    Do not include any text outside the JSON object.`
      },
      {
        role: 'user',
        content: `Context:\n${context}\n\nQuestion: ${message}\n\nRemember to respond with valid JSON only.`
      }
    ]
  });
      
      // Parse LLM response
      const llmContent = completion.choices[0].message.content.trim();
      
      try {
        response = JSON.parse(llmContent);
        
        // Validate response structure
        if (!response.answer || !Array.isArray(response.citations)) {
          throw new Error('Invalid response structure');
        }
      } catch (parseError) {
        console.error('Failed to parse LLM response:', llmContent);
        response = {
          answer: llmContent,
          citations: filteredDocs.map(d => d.doc_id),
          confidence: 0.5
        };
      }
      
    } catch (openaiError) {
      console.error('OpenAI API error, falling back to mock response:', openaiError.message);
      usedMockResponse = true;
      
      // Fallback to mock response
      let mockAnswer = "";
      const citationList = filteredDocs.map(d => d.doc_id);
      
      if (query.includes('experience') || query.includes('work')) {
        mockAnswer = `Based on the retrieved information, Lewis has significant experience in AI and frontend development. He currently works as an AI Frontend/Tier 3 Engineer at Teachstone, where he has improved reporting tool accessibility and automated workflows [${citationList.filter(c => c.includes('exp')).join(', ')}]. He also worked as an AI Platform Engineer at Hyperlink, contributing to fundraising and platform development.`;
      } else if (query.includes('project') || query.includes('built')) {
        mockAnswer = `Lewis has worked on several notable projects including Dream Net AI, an AI dream interpreter built with Next.js and ChatGPT that achieved 25% improved accuracy [${citationList.filter(c => c.includes('project')).join(', ')}]. He also developed the Soke2x Smoothie Shop with 3D elements using Three.js.`;
      } else if (query.includes('skill') || query.includes('tech')) {
        mockAnswer = `Lewis's technical skills include JavaScript, TypeScript, Next.js, React, HTML5/CSS3, TailwindCSS, Git, Docker, and Jira [${citationList.filter(c => c.includes('skill')).join(', ')}]. He has experience with both frontend development and AI platform engineering.`;
      } else if (query.includes('contact')) {
        mockAnswer = `You can contact Lewis at meyerslewis193@gmail.com or through his LinkedIn profile [${citationList.filter(c => c.includes('contact')).join(', ')}]. His portfolio website is available at lewismeyers.dev.`;
      } else {
        mockAnswer = `Based on the available information about Lewis Meyers, I can tell you about his experience, projects, and technical skills. ${filteredDocs[0]?.content.substring(0, 100)}... [${citationList[0]}]`;
      }
      
      response = {
        answer: mockAnswer,
        citations: citationList,
        confidence: 0.85
      };
    }
    
    // Add debug trace
    response._trace = {
      retrieved_docs: filteredDocs.map(d => ({
        doc_id: d.doc_id,
        score: d.score,
        title: d.title
      })),
      query: message,
      filters_applied: config.filters || {},
      total_kb_docs: kb.length,
      docs_after_filtering: filteredDocs.length,
      timestamp: new Date().toISOString(),
      processing_time_ms: Date.now() - startTime,
      used_mock_response: usedMockResponse,
      openai_available: !usedMockResponse
    };
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(response);
    
  } catch (error) {
    console.error('Chat API error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      _trace: {
        error_message: error.message,
        timestamp: new Date().toISOString()
      }
    });
  }
}

// Simple relevance scoring function
function calculateRelevanceScore(doc, query) {
  const content = doc.content.toLowerCase();
  const title = doc.title.toLowerCase();
  
  let score = 0;
  
  // Exact phrase matches get highest score
  if (content.includes(query)) {
    score += 10;
  }
  
  // Title matches get bonus points
  if (title.includes(query)) {
    score += 5;
  }
  
  // Individual word matches
  const queryWords = query.split(' ').filter(word => word.length > 2);
  queryWords.forEach(word => {
    if (content.includes(word)) {
      score += 1;
    }
    if (title.includes(word)) {
      score += 0.5;
    }
  });
  
  return score;
}
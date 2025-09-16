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
    const query = message.toLowerCase();
    const retrievedDocs = kb
      .map(doc => ({
        ...doc,
        score: calculateRelevanceScore(doc, query)
      }))
      .filter(doc => doc.score > 0)
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
    
    // Create context for LLM
    const context = filteredDocs.map(doc => 
      `[${doc.doc_id}] ${doc.content}`
    ).join('\n\n');
    
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
    
    // MOCK RESPONSE instead of OpenAI call
    // Comment out the real OpenAI call and use this instead:
    /*
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      temperature: config.llm?.temperature || 0.1,
      max_tokens: config.llm?.max_tokens || 500,
      messages: [...]
    });
    */
    
    // Generate a realistic mock response based on retrieved docs
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
    
    const response = {
      answer: mockAnswer,
      citations: citationList,
      confidence: 0.85
    };
    
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
      mock_response: true // Flag to indicate this is a mock
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
import React, { useState } from 'react';

interface ContactFormProps {
  fontMode?: 'pixel' | 'lato'; // Make it optional with a default
}

const ContactForm: React.FC<ContactFormProps> = ({ fontMode = 'pixel' }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Get font class based on current mode
  const fontClass = fontMode === 'pixel' ? 'font-pixel' : 'font-lato';

  return (
    <section id="contact" className={`py-[130px] px-4 text-center ${fontClass}`}>
      <h2 className="text-2xl md:text-3xl font-bold mb-10 text-black">Contact</h2>
      
      <div className="max-w-2xl mx-auto">
        {/* The key part is using FormSubmit's action URL with your email */}
        <form 
          action="https://formsubmit.co/meyerslewis193@gmail.com" 
          method="POST"
          className="space-y-6"
          onSubmit={() => {
            setIsSubmitting(true);
            // This timeout simulates the form submission process for UI feedback
            // The actual submission is handled by the form's action
            setTimeout(() => {
              setIsSubmitting(false);
              setSubmitStatus('success');
            }, 1000);
          }}
        >
          {/* Optional: Disable captcha */}
          <input type="hidden" name="_captcha" value="false" />
          
          {/* Optional: Set a success page or use _next to stay on page */}
          <input type="hidden" name="_next" value={window.location.href} />
          
          {/* Add subject prefix */}
          <input type="hidden" name="_subject" value="New submission from portfolio!" />
          
          {/* Prevent spam with honeypot */}
          <input type="text" name="_honey" style={{ display: 'none' }} />
          
          <div>
            <input
              type="text"
              name="name"
              placeholder="Name"
              required
              className={`w-full px-4 py-3 rounded-md border-2 border-primary-300 bg-white bg-opacity-10 text-black placeholder-grey placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-primary-300 ${fontClass} text-sm`}
            />
          </div>
          
          <div>
            <input
              type="email"
              name="email"
              placeholder="Your email"
              required
              className={`w-full px-4 py-3 rounded-md border-2 border-primary-300 bg-white bg-opacity-10 text-black placeholder-grey placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-primary-300 ${fontClass} text-sm`}
            />
          </div>
          
          <div>
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              required
              className={`w-full px-4 py-3 rounded-md border-2 border-primary-300 bg-white bg-opacity-10 text-black placeholder-grey placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-primary-300 ${fontClass} text-sm`}
            />
          </div>
          
          <div>
            <textarea
              name="message"
              placeholder="Message..."
              required
              rows={8}
              className={`w-full px-4 py-3 rounded-md border-2 border-primary-300 bg-white bg-opacity-10 text-black placeholder-grey placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-primary-300 ${fontClass} text-sm resize-none`}
            />
          </div>
          
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-6 bg-primary-600 hover:bg-primary-700 text-black rounded-md transition-colors duration-300 ${fontClass} text-sm md:text-base disabled:opacity-70`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
          
          {submitStatus === 'success' && (
            <div className={`bg-green-600 bg-opacity-80 text-white py-2 px-4 rounded-md ${fontClass} text-sm animate-pulse`}>
              Message sent! Thanks for reaching out.
            </div>
          )}
          
          {submitStatus === 'error' && (
            <div className={`bg-red-600 bg-opacity-80 text-white py-2 px-4 rounded-md ${fontClass} text-sm`}>
              Something went wrong. Please try again.
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
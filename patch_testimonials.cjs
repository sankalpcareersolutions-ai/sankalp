const fs = require('fs');
let code = fs.readFileSync('src/components/TestimonialsPage.tsx', 'utf-8');

// Add MessageSquare to lucide-react import
code = code.replace(
  /import \{ (.*?) \} from "lucide-react";/,
  'import { $1, MessageSquare, Send } from "lucide-react";'
);

// Add state for feedback form
code = code.replace(
  /const \[selectedSector, setSelectedSector\] = useState<string>\("All"\);/,
  `const [selectedSector, setSelectedSector] = useState<string>("All");
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [feedback, setFeedback] = useState({ name: "", email: "", rating: 5, content: "" });
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmitFeedback = (e) => {
    e.preventDefault();
    setSubmitSuccess(true);
    setTimeout(() => {
      setShowFeedbackForm(false);
      setSubmitSuccess(false);
      setFeedback({ name: "", email: "", rating: 5, content: "" });
    }, 3000);
  };`
);

// Add button in banner
const bannerAnchor = `          <p className="text-stone-300 font-sans text-sm md:text-base leading-relaxed">
            Discover how SANKALP aspirants successfully cracked CDS, SSB boards, ISRO examinations,
            DRDO RAC technical boards, BARC scientific screening, and paramilitary recruitments.
          </p>
        </div>
      </div>`;

const newBanner = `          <p className="text-stone-300 font-sans text-sm md:text-base leading-relaxed">
            Discover how SANKALP aspirants successfully cracked CDS, SSB boards, ISRO examinations,
            DRDO RAC technical boards, BARC scientific screening, and paramilitary recruitments.
          </p>
          <div className="pt-4">
             <button 
               onClick={() => setShowFeedbackForm(!showFeedbackForm)}
               className="inline-flex items-center gap-2 bg-[#c5a059] hover:bg-[#d5b069] text-emerald-950 font-bold px-5 py-2.5 rounded-lg text-sm transition-colors cursor-pointer"
             >
               <MessageSquare className="w-4 h-4" /> 
               Share Your Experience & Feedback
             </button>
          </div>
        </div>
      </div>

      {/* Feedback Form Section */}
      <AnimatePresence>
        {showFeedbackForm && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-white border border-stone-200 rounded-xl p-6 md:p-8 shadow-sm relative">
              <h3 className="text-xl font-bold text-stone-800 mb-2">Submit Your Review</h3>
              <p className="text-stone-500 text-sm mb-6">Your feedback helps us improve our guidance programs.</p>
              
              {submitSuccess ? (
                <div className="bg-emerald-50 text-emerald-800 p-4 rounded-lg flex items-center gap-3 border border-emerald-200">
                   <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
                      <Star className="w-4 h-4 fill-emerald-600 text-emerald-600" />
                   </div>
                   <div>
                     <p className="font-bold text-sm">Thank you for your feedback!</p>
                     <p className="text-xs opacity-90">Your review has been submitted successfully and is pending approval.</p>
                   </div>
                </div>
              ) : (
                <form onSubmit={handleSubmitFeedback} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">Full Name</label>
                      <input 
                        required
                        type="text" 
                        value={feedback.name}
                        onChange={(e) => setFeedback({...feedback, name: e.target.value})}
                        className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-700 focus:border-transparent outline-none"
                        placeholder="e.g. Rahul Sharma"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">Email Address</label>
                      <input 
                        required
                        type="email" 
                        value={feedback.email}
                        onChange={(e) => setFeedback({...feedback, email: e.target.value})}
                        className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-700 focus:border-transparent outline-none"
                        placeholder="Your email (kept private)"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Rating</label>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button 
                          type="button" 
                          key={star} 
                          onClick={() => setFeedback({...feedback, rating: star})}
                          className="p-1 focus:outline-none cursor-pointer"
                        >
                          <Star className={\`w-6 h-6 \${feedback.rating >= star ? 'fill-amber-500 text-amber-500' : 'text-stone-300'}\`} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Your Review / Feedback</label>
                    <textarea 
                      required
                      value={feedback.content}
                      onChange={(e) => setFeedback({...feedback, content: e.target.value})}
                      rows={4}
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-700 focus:border-transparent outline-none resize-none"
                      placeholder="Tell us about your experience..."
                    ></textarea>
                  </div>
                  <div className="flex justify-end gap-3 pt-2">
                    <button 
                      type="button" 
                      onClick={() => setShowFeedbackForm(false)}
                      className="px-4 py-2 text-stone-600 hover:text-stone-900 text-sm font-bold cursor-pointer transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="flex items-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold px-5 py-2 rounded-lg text-sm transition-colors cursor-pointer shadow-sm"
                    >
                      <Send className="w-4 h-4" /> Submit Review
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>`;

code = code.replace(bannerAnchor, newBanner);

// Add AnimatePresence to framer-motion import
code = code.replace(
  /import \{ motion \} from "motion\/react";/,
  'import { motion, AnimatePresence } from "motion/react";'
);

fs.writeFileSync('src/components/TestimonialsPage.tsx', code);

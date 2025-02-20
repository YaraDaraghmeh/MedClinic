import { motion } from "framer-motion";

const FeedbackSection = ({ onOpenModal }: { onOpenModal: () => void }) => (
  <motion.div 
    className="feedback-section"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
  >
    <motion.h2 
      className="feedback-title"
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      💬 Share Your Thoughts!
    </motion.h2>
    <motion.p 
      className="feedback-message"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
    >
      We love hearing from you! Your feedback helps us improve and make things even better.  
    </motion.p>
    <button
      onClick={onOpenModal}
      className="feedback-button border text-white transition-all duration-300 ease-in-out hover:bg-blue-700 hover:border-blue-700 hover:shadow-md"
    >
      🚀 Give Feedback
    </button>
  </motion.div>
);
export default FeedbackSection;
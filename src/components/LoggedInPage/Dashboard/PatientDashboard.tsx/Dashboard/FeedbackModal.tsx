import { motion } from "framer-motion";

const FeedbackModal = ({ isOpen, onClose, onSubmit, feedback, setFeedback }: {
  isOpen: boolean,
  onClose: () => void,
  onSubmit: (e: React.FormEvent) => Promise<void>,
  feedback: { message: string, rating: number },
  setFeedback: React.Dispatch<React.SetStateAction<{ message: string, rating: number }>>
}) => (
  isOpen && (
    <motion.div
      className="feedback-modal z-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="feedback-content"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
      >
        <h2>Share Your Feedback</h2>
        <form onSubmit={onSubmit} className="feedback-form">
          <div className="rating-section">
            <label>Rating</label>
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setFeedback(prev => ({ ...prev, rating: star }))}
                  className={`star ${star <= feedback.rating ? 'active' : ''}`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
          <div className="message-section">
            <label>Message</label>
            <textarea
              value={feedback.message}
              onChange={e => setFeedback(prev => ({ ...prev, message: e.target.value }))}
              className="feedback-textarea"
              rows={3}
            />
          </div>
          <div className="button-group">
            <button
              type="button"
              onClick={onClose}
              className="cancel-button !border-1 !border-gray-300"
            >
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Submit Feedback
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
);
export default FeedbackModal;
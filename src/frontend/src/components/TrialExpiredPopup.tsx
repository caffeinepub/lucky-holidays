import { AlertTriangle, PhoneCall, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

interface TrialExpiredPopupProps {
  open: boolean;
  onClose: () => void;
}

export default function TrialExpiredPopup({
  open,
  onClose,
}: TrialExpiredPopupProps) {
  return (
    <AnimatePresence>
      {open && (
        <dialog
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-transparent w-full h-full max-w-none max-h-none m-0"
          aria-modal="true"
          aria-labelledby="trial-popup-title"
          data-ocid="trial.modal"
          open
        >
          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            {/* Top accent bar */}
            <div
              className="h-2 w-full"
              style={{
                background: "linear-gradient(90deg, #ff4500, #ff8c00, #ffd700)",
              }}
            />

            {/* Content */}
            <div className="bg-gray-900 text-white px-6 py-6">
              {/* Close button */}
              <button
                type="button"
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
                aria-label="Close"
                data-ocid="trial.close_button"
              >
                <X size={20} />
              </button>

              {/* Icon + Title */}
              <div className="flex flex-col items-center text-center gap-3 mb-4">
                <motion.div
                  animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="flex items-center justify-center w-14 h-14 rounded-full"
                  style={{
                    background: "linear-gradient(135deg, #ff4500, #ff8c00)",
                  }}
                >
                  <AlertTriangle size={28} className="text-white" />
                </motion.div>

                <h2
                  id="trial-popup-title"
                  className="text-xl font-bold tracking-wide"
                  style={{ color: "#ff8c00" }}
                >
                  Trial Expired
                </h2>
              </div>

              {/* Message */}
              <p className="text-center text-gray-200 text-sm leading-relaxed mb-5">
                Your trial time has expired.
                <br />
                To renew, please contact us.
              </p>

              {/* Phone CTA */}
              <a
                href="tel:7019071669"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-white text-base transition-transform active:scale-95"
                style={{
                  background: "linear-gradient(90deg, #ff4500, #ff8c00)",
                }}
                data-ocid="trial.primary_button"
              >
                <PhoneCall size={18} />
                7019071669
              </a>

              {/* Dismiss */}
              <button
                type="button"
                onClick={onClose}
                className="w-full mt-3 py-2 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                data-ocid="trial.secondary_button"
              >
                Continue to site
              </button>
            </div>
          </motion.div>
        </dialog>
      )}
    </AnimatePresence>
  );
}

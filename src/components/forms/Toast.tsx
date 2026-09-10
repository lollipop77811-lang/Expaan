import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'

interface ToastProps {
  message?: string
  show: boolean
  onDismiss?: () => void
  duration?: number
}

/**
 * Toast — minimal, designed to match the system. Bone text on night bg,
 * 1px sage top border, micro label. Auto-dismiss after duration.
 */
export default function Toast({ message, show, onDismiss, duration = 3500 }: ToastProps) {
  useEffect(() => {
    if (!show) return
    const t = setTimeout(() => onDismiss?.(), duration)
    return () => clearTimeout(t)
  }, [show, duration, onDismiss])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] bg-night text-bone px-6 py-4 border-t border-sage"
          role="status"
          aria-live="polite"
        >
          <span className="text-micro">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

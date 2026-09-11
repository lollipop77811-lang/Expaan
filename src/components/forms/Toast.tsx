import { useEffect } from 'react'

interface ToastProps {
  message?: string
  show: boolean
  onDismiss?: () => void
  duration?: number
}

/**
 * Toast — DEMO MODE (no framer-motion).
 *
 * Originally this used framer-motion's AnimatePresence + motion.div with a
 * slide-up + fade animation (0.4s expo). For the demo build, all slow
 * expo-out motion has been stripped — the toast now shows/hides via plain
 * conditional render (instant).
 *
 * Preserves: bone text on night bg, 1px sage top border, micro label,
 * auto-dismiss after duration, aria-live polite role.
 */
export default function Toast({ message, show, onDismiss, duration = 3500 }: ToastProps) {
  useEffect(() => {
    if (!show) return
    const t = setTimeout(() => onDismiss?.(), duration)
    return () => clearTimeout(t)
  }, [show, duration, onDismiss])

  if (!show) return null

  return (
    <div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] bg-night text-bone px-6 py-4 border-t border-sage"
      role="status"
      aria-live="polite"
    >
      <span className="text-micro">{message}</span>
    </div>
  )
}

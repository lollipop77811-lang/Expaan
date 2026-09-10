import { motion, AnimatePresence } from 'framer-motion'
import { type ReactNode } from 'react'

interface PageTransitionProps {
  children: ReactNode
  routeKey: string
}

const EASE = [0.16, 1, 0.3, 1] as const

/**
 * PageTransition
 *  AnimatePresence route swap. The outgoing page fades 0.4s while a canvas
 *  panel wipes up 0.8s expo; the incoming content fades in over 0.4s.
 *
 *  Implementation:
 *   - AnimatePresence mode="wait" keeps the old page mounted during exit.
 *   - The page itself fades out (0.4s) on exit, fades in (0.4s) on enter.
 *   - A separate wipe overlay, keyed to routeKey, runs a 0.8s keyframe:
 *       0–40%   scaleY 0 → 1 with origin bottom (covers the screen)
 *       40–50%  hold full (origin flips to top)
 *       50–100% scaleY 1 → 0 with origin top (retracts upward)
 *     The wipe is therefore felt as a single "up-wipe" choreography.
 */
export default function PageTransition({ children, routeKey }: PageTransitionProps) {
  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={routeKey}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          {children}
        </motion.div>
      </AnimatePresence>

      {/* Wipe panel — keyed to route so it re-mounts and re-animates per swap. */}
      <motion.div
        key={`wipe-${routeKey}`}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[120] bg-canvas"
        initial={{ scaleY: 0, transformOrigin: 'bottom' }}
        animate={{
          scaleY: [0, 1, 1, 0],
          transformOrigin: ['bottom', 'bottom', 'top', 'top'],
        }}
        transition={{
          duration: 0.8,
          ease: EASE,
          times: [0, 0.4, 0.5, 1],
        }}
      />
    </div>
  )
}

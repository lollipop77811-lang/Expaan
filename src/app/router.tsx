import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import FullscreenMenu from '../components/layout/FullscreenMenu'
import InquiryModal from '../components/layout/InquiryModal'
import FloatingContacts from '../components/layout/FloatingContacts'

const Home = lazy(() => import('../pages/Home'))
const Story = lazy(() => import('../pages/Story'))
const Projects = lazy(() => import('../pages/Projects'))
const ProjectDetail = lazy(() => import('../pages/ProjectDetail'))
const Amenities = lazy(() => import('../pages/Amenities'))
const Neighborhood = lazy(() => import('../pages/Neighborhood'))
const Inquire = lazy(() => import('../pages/Inquire'))
const NotFound = lazy(() => import('../pages/NotFound'))

function PageFallback() {
  return <div className="min-h-screen bg-canvas" aria-label="Loading" />
}

/**
 * Router — demo mode (no PageTransition wrapper).
 * Routes swap instantly. Header + FullscreenMenu + InquiryModal mount
 * once outside the route tree so they don't remount per route.
 */
export default function Router() {
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Header />
      <FullscreenMenu />
      <InquiryModal />
      <FloatingContacts />
      <main id="main">
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/story" element={<Story />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="/amenities" element={<Amenities />} />
            <Route path="/neighborhood" element={<Neighborhood />} />
            <Route path="/inquire" element={<Inquire />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  )
}

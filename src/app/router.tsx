import { lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import PageTransition from '../components/layout/PageTransition'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import FullscreenMenu from '../components/layout/FullscreenMenu'
import InquiryModal from '../components/layout/InquiryModal'

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

export default function Router() {
  const location = useLocation()
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Header />
      <FullscreenMenu />
      <InquiryModal />
      <main id="main">
        <PageTransition routeKey={location.pathname}>
          <Suspense fallback={<PageFallback />}>
            <Routes location={location}>
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
        </PageTransition>
      </main>
      <Footer />
    </>
  )
}

import React from 'react'
import { useLocation, Navigate } from 'react-router-dom'
import { LANDING_PAGES_DATA } from '@/data/landingPages'
import { LandingPageView } from '@/components/LandingPageView'

export const LandingPageTemplate: React.FC = () => {
  const location = useLocation()
  const data = LANDING_PAGES_DATA[location.pathname]

  if (!data) {
    return <Navigate to="/" replace />
  }

  return <LandingPageView data={data} />
}

export default LandingPageTemplate

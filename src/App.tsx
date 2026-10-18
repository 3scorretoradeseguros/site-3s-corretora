import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { AuthProvider } from '@/contexts/AuthContext'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import Layout from '@/components/Layout'

import Index from '@/pages/Index'
import Login from '@/pages/Login'
import ContactsDashboard from '@/pages/ContactsDashboard'
import ResourcesIcons from '@/pages/ResourcesIcons'
import ForgotPassword from '@/pages/ForgotPassword'
import ResetPassword from '@/pages/ResetPassword'
import NotFound from '@/pages/NotFound'
import LandingPageTemplate from '@/pages/LandingPageTemplate'

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />

            {/* As 11 Landing Pages dedicadas com escape único */}
            <Route path="/seguro-auto-carro" element={<LandingPageTemplate />} />
            <Route path="/seguro-auto-moto" element={<LandingPageTemplate />} />
            <Route path="/seguro-auto-caminhao" element={<LandingPageTemplate />} />
            <Route path="/seguro-residencial" element={<LandingPageTemplate />} />
            <Route path="/seguro-empresarial" element={<LandingPageTemplate />} />
            <Route path="/seguro-condominio" element={<LandingPageTemplate />} />
            <Route path="/seguro-de-vida" element={<LandingPageTemplate />} />
            <Route path="/seguro-viagem" element={<LandingPageTemplate />} />
            <Route path="/seguro-celular" element={<LandingPageTemplate />} />
            <Route path="/seguro-rc-profissional" element={<LandingPageTemplate />} />
            <Route path="/planos-de-saude" element={<LandingPageTemplate />} />

            {/* Redirecionamentos para erros comuns de digitação ou URLs legadas em caixa mista */}
            <Route
              path="/seguro-auto-caminhhao"
              element={<Navigate to="/seguro-auto-caminhao" replace />}
            />
            <Route path="/planos-de-saúde" element={<Navigate to="/planos-de-saude" replace />} />
            <Route
              path="/seguro-RC-profissional"
              element={<Navigate to="/seguro-rc-profissional" replace />}
            />

            <Route path="/painel" element={<Login />} />
            <Route
              path="/painel/contatos"
              element={
                <ProtectedRoute>
                  <ContactsDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/painel/recursos"
              element={
                <ProtectedRoute>
                  <ResourcesIcons />
                </ProtectedRoute>
              }
            />
            <Route path="/recuperar-senha" element={<ForgotPassword />} />
            <Route path="/redefinir-senha" element={<ResetPassword />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </TooltipProvider>
    </AuthProvider>
  </BrowserRouter>
)

export default App

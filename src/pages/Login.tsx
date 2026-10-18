import React, { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { Lock, Mail, Eye, EyeOff, Loader2, ArrowLeft, AlertCircle, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import pb from '@/lib/pocketbase/client'
import { useAuth } from '@/contexts/AuthContext'
import { toast } from '@/hooks/use-toast'
import { Logo } from '@/components/Logo'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const navigate = useNavigate()
  const location = useLocation()
  const { refreshAuth, isAuthenticated } = useAuth()

  // Se já autenticado, redireciona diretamente para o painel de contatos
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/painel/contatos', { replace: true })
    }
  }, [isAuthenticated, navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)

    if (!email.trim() || !password) {
      setErrorMessage('Por favor, informe e-mail e senha.')
      return
    }

    setIsLoading(true)

    try {
      await pb.collection('users').authWithPassword(email.trim(), password)
      refreshAuth()
      toast({
        title: 'Login efetuado com sucesso',
        description: 'Bem-vinda ao Painel de Contatos da 3S Corretora.',
      })

      const origin = (location.state as any)?.from?.pathname || '/painel/contatos'
      navigate(origin, { replace: true })
    } catch (err: any) {
      console.error('Falha no login:', err)
      setErrorMessage('E-mail ou senha incorretos.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50/50 via-white to-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
        {/* Logo / Header */}
        <div className="text-center mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl"
          >
            <div className="p-1.5 rounded-2xl bg-white shadow-md shadow-[#004173]/10 border border-slate-100 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
              <Logo height={48} showText={false} alt="3S Corretora de Seguros" />
            </div>
            <div className="text-left">
              <span className="font-serif font-bold text-xl leading-tight text-[#004173] block">
                3S Corretora
              </span>
              <span className="text-xs text-slate-500 uppercase tracking-wider font-medium">
                Área Restrita
              </span>
            </div>
          </Link>

          <h2 className="mt-4 font-serif font-bold text-2xl text-slate-900 tracking-tight">
            Acesso da Corretora
          </h2>
          <p className="mt-1 text-sm text-slate-500">Área restrita para a equipe 3S.</p>
        </div>

        {/* Card do Formulário */}
        <div className="bg-white py-8 px-6 sm:px-10 shadow-xl shadow-slate-200/60 rounded-3xl border border-slate-100">
          {errorMessage && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label
                htmlFor="login-email"
                className="text-xs font-semibold uppercase tracking-wider text-slate-700"
              >
                E-mail
              </Label>
              <div className="relative">
                <Input
                  id="login-email"
                  type="email"
                  placeholder="seuemail@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-xl h-11 pl-10 border-slate-200 focus-visible:ring-[#004173]"
                  autoComplete="email"
                  required
                  disabled={isLoading}
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="login-password"
                  className="text-xs font-semibold uppercase tracking-wider text-slate-700"
                >
                  Senha
                </Label>
                <Link
                  to="/recuperar-senha"
                  className="text-xs font-medium text-[#0979B0] hover:text-[#004173] hover:underline"
                >
                  Esqueci minha senha
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="rounded-xl h-11 pl-10 pr-10 border-slate-200 focus-visible:ring-[#004173]"
                  autoComplete="current-password"
                  required
                  disabled={isLoading}
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label={showPassword ? 'Ocultar senha' : 'Exibir senha'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 rounded-xl bg-[#004173] hover:bg-[#00335c] text-white font-semibold text-sm shadow-md mt-2 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] transition-all"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#0CB7F2]" />
                  <span>Entrando...</span>
                </>
              ) : (
                <span>Entrar</span>
              )}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col items-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-[#004173] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Voltar ao site público</span>
            </Link>
          </div>
        </div>

        {/* Informação sobre credencial padrão para a corretora */}
        <div className="mt-4 text-center">
          <p className="text-xs text-slate-400">Ambiente seguro com criptografia ponta a ponta.</p>
        </div>
      </div>
    </div>
  )
}

import React, { useState } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import { Lock, Eye, EyeOff, ArrowLeft, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import pb from '@/lib/pocketbase/client'
import { toast } from '@/hooks/use-toast'
import { Logo } from '@/components/Logo'

export default function ResetPassword() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token') || ''

  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)

    if (!token) {
      setErrorMessage('Token de recuperação inválido ou expirado.')
      return
    }

    if (password.length < 8) {
      setErrorMessage('A nova senha deve ter no mínimo 8 caracteres.')
      return
    }

    if (password !== passwordConfirm) {
      setErrorMessage('As senhas não coincidem.')
      return
    }

    setIsLoading(true)

    try {
      await pb.collection('users').confirmPasswordReset(token, password, passwordConfirm)
      setIsSuccess(true)
      toast({
        title: 'Senha redefinida!',
        description: 'Sua senha foi alterada com sucesso. Você já pode fazer login.',
      })
    } catch (err: any) {
      console.error('Erro na redefinição:', err)
      setErrorMessage(
        err?.message || 'Não foi possível redefinir sua senha. O link pode ter expirado.',
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50/50 via-white to-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="text-center mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl"
          >
            <div className="p-1.5 rounded-2xl bg-white shadow-md shadow-[#004173]/10 border border-slate-100 flex items-center justify-center">
              <Logo height={48} showText={false} alt="3S Corretora de Seguros" />
            </div>
            <div className="text-left">
              <span className="font-serif font-bold text-xl leading-tight text-[#004173] block">
                3S Corretora
              </span>
              <span className="text-xs text-slate-500 uppercase tracking-wider font-medium">
                Redefinir Senha
              </span>
            </div>
          </Link>

          <h2 className="mt-4 font-serif font-bold text-2xl text-slate-900 tracking-tight">
            Criar Nova Senha
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Digite sua nova senha para acessar o painel da corretora.
          </p>
        </div>

        <div className="bg-white py-8 px-6 sm:px-10 shadow-xl shadow-slate-200/60 rounded-3xl border border-slate-100">
          {isSuccess ? (
            <div className="text-center py-4 space-y-4 animate-fade-in">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif font-bold text-lg text-slate-900">
                Senha redefinida com sucesso!
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Você já pode acessar o painel de contatos com a sua nova senha.
              </p>
              <div className="pt-4">
                <Button
                  onClick={() => navigate('/painel', { replace: true })}
                  className="w-full h-11 rounded-xl bg-[#004173] hover:bg-[#00335c] text-white font-semibold"
                >
                  Fazer login agora
                </Button>
              </div>
            </div>
          ) : (
            <>
              {(!token || errorMessage) && (
                <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2.5">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                  <span>
                    {errorMessage || 'Token ausente no link. Solicite uma nova recuperação.'}
                  </span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <Label
                    htmlFor="reset-password"
                    className="text-xs font-semibold uppercase tracking-wider text-slate-700"
                  >
                    Nova Senha (mínimo 8 dígitos)
                  </Label>
                  <div className="relative">
                    <Input
                      id="reset-password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="rounded-xl h-11 pl-10 pr-10 border-slate-200 focus-visible:ring-[#004173]"
                      required
                      minLength={8}
                      disabled={isLoading || !token}
                    />
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label
                    htmlFor="reset-confirm"
                    className="text-xs font-semibold uppercase tracking-wider text-slate-700"
                  >
                    Confirmar Nova Senha
                  </Label>
                  <div className="relative">
                    <Input
                      id="reset-confirm"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={passwordConfirm}
                      onChange={(e) => setPasswordConfirm(e.target.value)}
                      className="rounded-xl h-11 pl-10 border-slate-200 focus-visible:ring-[#004173]"
                      required
                      minLength={8}
                      disabled={isLoading || !token}
                    />
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading || !token}
                  className="w-full h-11 rounded-xl bg-[#004173] hover:bg-[#00335c] text-white font-semibold text-sm shadow-md mt-2 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#0CB7F2]" />
                      <span>Atualizando senha...</span>
                    </>
                  ) : (
                    <span>Salvar Nova Senha</span>
                  )}
                </Button>
              </form>

              <div className="mt-6 pt-6 border-t border-slate-100 text-center">
                <Link
                  to="/painel"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-[#004173] transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Voltar para o Login</span>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

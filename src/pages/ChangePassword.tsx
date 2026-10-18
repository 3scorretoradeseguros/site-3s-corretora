import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ShieldCheck,
  ArrowLeft,
  KeyRound,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import pb from '@/lib/pocketbase/client'
import { useAuth } from '@/contexts/AuthContext'
import { toast } from '@/hooks/use-toast'
import DashboardHeader from '@/components/DashboardHeader'
import SEO from '@/components/SEO'

export default function ChangePassword() {
  const { user, refreshAuth } = useAuth()

  const [oldPassword, setOldPassword] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)

  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)
    setSuccessMessage(null)

    // Validações no frontend
    if (!oldPassword || !password || !passwordConfirm) {
      setErrorMessage('Todos os campos são obrigatórios.')
      return
    }

    if (password.length < 8) {
      setErrorMessage('A nova senha deve ter no mínimo 8 caracteres.')
      return
    }

    if (password !== passwordConfirm) {
      setErrorMessage('A confirmação da nova senha não confere.')
      return
    }

    if (oldPassword === password) {
      setErrorMessage('A nova senha deve ser diferente da senha atual.')
      return
    }

    if (!user?.id) {
      setErrorMessage('Sessão inválida. Faça login novamente.')
      return
    }

    setIsLoading(true)

    try {
      // O usuário autenticado atualiza sua própria senha informando a senha antiga
      await pb.collection('users').update(user.id, {
        oldPassword,
        password,
        passwordConfirm,
      })

      // Se a sessão continuar ativa, re-autenticamos ou atualizamos para garantir token válido
      const currentUserEmail = user.email || pb.authStore.record?.email
      if (currentUserEmail) {
        try {
          // Re-autentica com as credenciais informadas para manter sessão ativa e renovada
          await pb.collection('users').authWithPassword(currentUserEmail, password)
        } catch (_) {
          // Fallback silencioso: o próprio token prévio pode permanecer ou authRefresh
          try {
            await pb.collection('users').authRefresh()
          } catch (__) {
            // Se falhar re-auth, authStore permanece conforme o SDK gerenciar
          }
        }
      }
      refreshAuth()

      // Limpar campos
      setOldPassword('')
      setPassword('')
      setPasswordConfirm('')
      setShowOldPassword(false)
      setShowPassword(false)
      setShowPasswordConfirm(false)

      setSuccessMessage('Senha alterada com sucesso! Suas credenciais foram atualizadas.')
      toast({
        title: 'Senha alterada com sucesso',
        description: 'Sua nova senha já está ativa para os próximos acessos.',
      })
    } catch (err: any) {
      console.error('Falha ao alterar senha:', err)
      const data = err?.response?.data
      let message = 'Não foi possível alterar a senha. Verifique os dados informados.'

      if (data?.oldPassword?.message) {
        message = 'Senha atual incorreta. Por favor, tente novamente.'
      } else if (data?.password?.message) {
        message = data.password.message
      } else if (data?.passwordConfirm?.message) {
        message = data.passwordConfirm.message
      } else if (err?.message?.toLowerCase().includes('old password')) {
        message = 'Senha atual incorreta. Por favor, tente novamente.'
      }

      setErrorMessage(message)
      toast({
        variant: 'destructive',
        title: 'Erro ao alterar senha',
        description: message,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <SEO
        title="Alterar Senha | Painel 3S Corretora"
        description="Área restrita de gestão de credenciais da 3S Corretora de Seguros."
        noindex={true}
      />

      {/* Top bar dedicada do Painel */}
      <DashboardHeader currentTab="senha" />

      {/* Conteúdo Principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-grow">
        {/* Breadcrumb e botão Voltar */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/painel/contatos"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-[#004173] px-3 py-2 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow transition-all"
          >
            <ArrowLeft className="w-4 h-4 text-[#0979B0]" />
            <span>Voltar ao Painel de Contatos</span>
          </Link>

          <span className="text-xs text-slate-500 font-medium hidden sm:inline-flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            Sessão Criptografada
          </span>
        </div>

        {/* Cabeçalho da Seção */}
        <div className="max-w-2xl mx-auto mb-6 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200/60 text-xs font-semibold text-[#004173] mb-3">
            <KeyRound className="w-3.5 h-3.5 text-[#0979B0]" />
            Segurança da Conta
          </div>
          <h1 className="font-serif font-black text-2xl sm:text-3xl text-[#004173] tracking-tight">
            Alterar Senha de Acesso
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Atualize sua senha de forma segura. A alteração entrará em vigor imediatamente.
          </p>
        </div>

        {/* Card do Formulário */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xl shadow-slate-200/50">
            {/* Mensagem de Erro */}
            {errorMessage && (
              <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-sm text-red-700 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 shrink-0 text-red-600 mt-0.5" />
                <div className="flex-1">
                  <strong className="font-semibold block text-red-800">
                    Não foi possível alterar a senha
                  </strong>
                  <span>{errorMessage}</span>
                </div>
              </div>
            )}

            {/* Mensagem de Sucesso */}
            {successMessage && (
              <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-sm text-emerald-800 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600 mt-0.5" />
                <div className="flex-1">
                  <strong className="font-semibold block text-emerald-900">
                    Senha alterada com sucesso!
                  </strong>
                  <span>{successMessage}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Informação do Usuário Conectado */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Conta conectada:</span>
                <span className="font-semibold text-slate-800 truncate max-w-[260px]">
                  {user?.email || 'seguros3scorretora@gmail.com'}
                </span>
              </div>

              {/* 1. Senha Atual */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="old-password"
                  className="text-xs font-semibold uppercase tracking-wider text-slate-700"
                >
                  Senha Atual
                </Label>
                <div className="relative">
                  <Input
                    id="old-password"
                    type={showOldPassword ? 'text' : 'password'}
                    placeholder="Digite sua senha atual"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="rounded-xl h-11 pl-10 pr-10 border-slate-200 focus-visible:ring-[#004173]"
                    autoComplete="current-password"
                    required
                    disabled={isLoading}
                  />
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <button
                    type="button"
                    onClick={() => setShowOldPassword(!showOldPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    aria-label={showOldPassword ? 'Ocultar senha atual' : 'Exibir senha atual'}
                  >
                    {showOldPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* 2. Nova Senha */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="new-password"
                  className="text-xs font-semibold uppercase tracking-wider text-slate-700"
                >
                  Nova Senha
                </Label>
                <div className="relative">
                  <Input
                    id="new-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="No mínimo 8 caracteres"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="rounded-xl h-11 pl-10 pr-10 border-slate-200 focus-visible:ring-[#004173]"
                    autoComplete="new-password"
                    minLength={8}
                    required
                    disabled={isLoading}
                  />
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    aria-label={showPassword ? 'Ocultar nova senha' : 'Exibir nova senha'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-[11px] text-slate-500">
                  Recomendado: utilize letras maiúsculas, minúsculas, números e símbolos.
                </p>
              </div>

              {/* 3. Confirmar Nova Senha */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="confirm-password"
                  className="text-xs font-semibold uppercase tracking-wider text-slate-700"
                >
                  Confirmar Nova Senha
                </Label>
                <div className="relative">
                  <Input
                    id="confirm-password"
                    type={showPasswordConfirm ? 'text' : 'password'}
                    placeholder="Repita a nova senha exatamente"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    className="rounded-xl h-11 pl-10 pr-10 border-slate-200 focus-visible:ring-[#004173]"
                    autoComplete="new-password"
                    minLength={8}
                    required
                    disabled={isLoading}
                  />
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <button
                    type="button"
                    onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    aria-label={
                      showPasswordConfirm
                        ? 'Ocultar confirmação de senha'
                        : 'Exibir confirmação de senha'
                    }
                  >
                    {showPasswordConfirm ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Botão de Ação */}
              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-11 rounded-xl bg-[#004173] hover:bg-[#00335c] text-white font-semibold text-sm shadow-md flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] transition-all"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#0CB7F2]" />
                      <span>Salvando nova senha...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4 text-[#0CB7F2]" />
                      <span>Salvar Nova Senha</span>
                    </>
                  )}
                </Button>
              </div>
            </form>

            {/* Rodapé do Card com Orientações */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Criptografia bcrypt gerenciada pelo PocketBase</span>
              </div>
              <Link
                to="/painel/contatos"
                className="text-[#0979B0] hover:text-[#004173] hover:underline font-medium"
              >
                Voltar aos contatos
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

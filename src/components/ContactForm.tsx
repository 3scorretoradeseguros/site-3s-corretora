import React, { useState } from 'react'
import { CheckCircle2, Send, Loader2, Sparkles, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from '@/hooks/use-toast'
import { createContact } from '@/services/contacts'
import { CONTACT_NEED_LABELS, type ContactNeed, type CreateContactInput } from '@/types'

interface FormErrors {
  name?: string
  contact?: string
  need?: string
  message?: string
}

export const ContactForm: React.FC = () => {
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [need, setNeed] = useState<ContactNeed | ''>('')
  const [message, setMessage] = useState('')

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const validate = (): boolean => {
    const errs: FormErrors = {}
    if (!name.trim()) {
      errs.name = 'Por favor, informe seu nome completo.'
    } else if (name.trim().length < 3) {
      errs.name = 'O nome deve ter pelo menos 3 caracteres.'
    }

    if (!contact.trim()) {
      errs.contact = 'Informe seu telefone WhatsApp ou e-mail.'
    } else if (contact.trim().length < 5) {
      errs.contact = 'Contato inválido. Informe um telefone ou e-mail válido.'
    }

    if (!need) {
      errs.need = 'Selecione qual seguro ou plano você precisa.'
    }

    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) {
      return
    }

    setIsSubmitting(true)

    try {
      const input: CreateContactInput = {
        name,
        contact,
        need: need as ContactNeed,
        message: message.trim() ? message : undefined,
      }

      await createContact(input)

      setIsSuccess(true)
      toast({
        title: 'Mensagem enviada com sucesso!',
        description: 'Recebemos seu contato. Em breve uma corretora falará com você.',
      })
    } catch (error: any) {
      console.error('Erro ao enviar contato:', error)
      // Extrair erros de campos do PocketBase se houver
      if (error?.data?.data) {
        const serverErrors: FormErrors = {}
        const dataErrors = error.data.data
        if (dataErrors.name) serverErrors.name = dataErrors.name.message
        if (dataErrors.contact) serverErrors.contact = dataErrors.contact.message
        if (dataErrors.need) serverErrors.need = dataErrors.need.message
        if (dataErrors.message) serverErrors.message = dataErrors.message.message
        setErrors(serverErrors)
      } else {
        toast({
          variant: 'destructive',
          title: 'Erro ao enviar contato',
          description:
            error?.message || 'Não foi possível registrar seu contato agora. Tente pelo WhatsApp.',
        })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    setName('')
    setContact('')
    setNeed('')
    setMessage('')
    setErrors({})
    setIsSuccess(false)
  }

  if (isSuccess) {
    return (
      <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl shadow-slate-200/50 border border-slate-100 text-center animate-fade-in flex flex-col items-center justify-center min-h-[420px]">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-5 animate-scale-in">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          Recebido com sucesso
        </span>
        <h3 className="font-serif font-bold text-2xl text-[#004173] mb-3">
          Recebemos seu contato!
        </h3>
        <p className="text-slate-600 max-w-md mx-auto text-sm leading-relaxed mb-8">
          Obrigado pela confiança. Em breve uma de nossas corretoras entrará em contato pelo
          WhatsApp ou telefone informado com a sua cotação personalizada.
        </p>
        <Button
          onClick={handleReset}
          variant="outline"
          className="rounded-xl border-slate-300 hover:bg-slate-50 font-medium px-6 py-2.5 text-slate-700"
        >
          Fazer novo contato
        </Button>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl shadow-slate-200/50 border border-slate-100">
      <div className="mb-6">
        <h3 className="font-serif font-bold text-2xl text-[#004173] mb-1.5">
          Solicitar Atendimento
        </h3>
        <p className="text-sm text-slate-500">
          Preencha o formulário abaixo e nossa equipe entrará em contato rapidamente.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {/* Nome */}
        <div className="space-y-1.5">
          <Label
            htmlFor="lead-name"
            className="text-xs font-semibold text-slate-700 uppercase tracking-wide"
          >
            Nome Completo <span className="text-red-500">*</span>
          </Label>
          <Input
            id="lead-name"
            type="text"
            placeholder="Ex.: Maria Fernanda Oliveira"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
              if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }))
            }}
            className={`rounded-xl h-11 border-slate-200 focus-visible:ring-[#004173] ${
              errors.name ? 'border-red-400 focus-visible:ring-red-400' : ''
            }`}
            disabled={isSubmitting}
            maxLength={120}
          />
          {errors.name && (
            <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.name}
            </p>
          )}
        </div>

        {/* Contato */}
        <div className="space-y-1.5">
          <Label
            htmlFor="lead-contact"
            className="text-xs font-semibold text-slate-700 uppercase tracking-wide"
          >
            WhatsApp ou E-mail <span className="text-red-500">*</span>
          </Label>
          <Input
            id="lead-contact"
            type="text"
            placeholder="(11) 99999-9999 ou seu@email.com"
            value={contact}
            onChange={(e) => {
              setContact(e.target.value)
              if (errors.contact) setErrors((prev) => ({ ...prev, contact: undefined }))
            }}
            className={`rounded-xl h-11 border-slate-200 focus-visible:ring-[#004173] ${
              errors.contact ? 'border-red-400 focus-visible:ring-red-400' : ''
            }`}
            disabled={isSubmitting}
            maxLength={180}
          />
          {errors.contact && (
            <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.contact}
            </p>
          )}
        </div>

        {/* O que você precisa? */}
        <div className="space-y-1.5">
          <Label
            htmlFor="lead-need"
            className="text-xs font-semibold text-slate-700 uppercase tracking-wide"
          >
            O que você precisa? <span className="text-red-500">*</span>
          </Label>
          <Select
            value={need}
            onValueChange={(val: ContactNeed) => {
              setNeed(val)
              if (errors.need) setErrors((prev) => ({ ...prev, need: undefined }))
            }}
            disabled={isSubmitting}
          >
            <SelectTrigger
              id="lead-need"
              className={`rounded-xl h-11 border-slate-200 text-left focus:ring-[#004173] ${
                errors.need ? 'border-red-400 focus:ring-red-400' : ''
              }`}
            >
              <SelectValue placeholder="Selecione o seguro ou plano" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              {Object.entries(CONTACT_NEED_LABELS).map(([value, label]) => (
                <SelectItem key={value} value={value} className="rounded-lg">
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.need && (
            <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.need}
            </p>
          )}
        </div>

        {/* Mensagem Opcional */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label
              htmlFor="lead-message"
              className="text-xs font-semibold text-slate-700 uppercase tracking-wide"
            >
              Mensagem <span className="text-slate-400 font-normal lowercase">(opcional)</span>
            </Label>
            <span className="text-[11px] text-slate-400">{message.length}/1000</span>
          </div>
          <Textarea
            id="lead-message"
            placeholder="Conte detalhes do que precisa (ano do carro, quantidade de pessoas no plano, valor do patrimônio, etc.)."
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="rounded-xl border-slate-200 focus-visible:ring-[#004173] resize-none"
            disabled={isSubmitting}
            maxLength={1000}
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-12 rounded-xl bg-[#004173] hover:bg-[#00335c] text-white font-semibold text-sm shadow-md shadow-[#004173]/20 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] transition-all duration-150 mt-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-[#0CB7F2]" />
              <span>Enviando dados...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4 text-[#0CB7F2]" />
              <span>Enviar e Receber Atendimento</span>
            </>
          )}
        </Button>

        <p className="text-[11px] text-slate-400 text-center pt-2">
          Seus dados estão protegidos. Não enviamos spam nem compartilhamos suas informações.
        </p>
      </form>
    </div>
  )
}

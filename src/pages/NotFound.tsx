import React from 'react'
import { Link } from 'react-router-dom'
import { Home, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <div className="w-16 h-16 rounded-3xl bg-sky-50 text-[#004173] font-serif font-black text-2xl flex items-center justify-center mb-6 shadow-sm">
        404
      </div>
      <h1 className="font-serif font-black text-3xl sm:text-4xl text-[#004173] tracking-tight mb-3">
        Página não encontrada
      </h1>
      <p className="text-slate-600 max-w-md mx-auto text-sm leading-relaxed mb-8">
        O endereço que você tentou acessar não existe ou foi movido. Navegue de volta para a página
        inicial da 3S Corretora.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Button asChild className="rounded-xl bg-[#004173] hover:bg-[#00335c] text-white">
          <Link to="/">
            <Home className="w-4 h-4 mr-2 text-[#0CB7F2]" />
            Voltar ao Início
          </Link>
        </Button>
        <Button asChild variant="outline" className="rounded-xl border-slate-300">
          <Link to="/painel">Acesso da Corretora</Link>
        </Button>
      </div>
    </div>
  )
}

import React, { useEffect } from 'react'

export interface SEOProps {
  title: string
  description: string
  canonicalUrl: string
  keywords?: string[]
  jsonLd?: Record<string, unknown>
}

export const SEO: React.FC<SEOProps> = ({ title, description, canonicalUrl, keywords, jsonLd }) => {
  useEffect(() => {
    // 1. Atualizar Title
    document.title = title

    // Função utilitária para atualizar ou criar meta tag
    const setMetaTag = (attribute: string, attrValue: string, content: string) => {
      let element = document.querySelector(`meta[${attribute}="${attrValue}"]`)
      if (!element) {
        element = document.createElement('meta')
        element.setAttribute(attribute, attrValue)
        document.head.appendChild(element)
      }
      element.setAttribute('content', content)
    }

    // 2. Meta Description
    setMetaTag('name', 'description', description)

    // 3. Keywords se fornecido
    if (keywords && keywords.length > 0) {
      setMetaTag('name', 'keywords', keywords.join(', '))
    }

    // 4. Open Graph
    setMetaTag('property', 'og:title', title)
    setMetaTag('property', 'og:description', description)
    setMetaTag('property', 'og:url', canonicalUrl)
    setMetaTag('property', 'og:type', 'website')
    setMetaTag('property', 'og:locale', 'pt_BR')

    // 5. Twitter Card
    setMetaTag('name', 'twitter:card', 'summary_large_image')
    setMetaTag('name', 'twitter:title', title)
    setMetaTag('name', 'twitter:description', description)

    // 6. Link Canonical
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
    if (!canonicalLink) {
      canonicalLink = document.createElement('link')
      canonicalLink.setAttribute('rel', 'canonical')
      document.head.appendChild(canonicalLink)
    }
    canonicalLink.setAttribute('href', canonicalUrl)

    // 7. Schema.org JSON-LD
    let scriptTag = document.getElementById('route-jsonld') as HTMLScriptElement | null
    if (jsonLd) {
      if (!scriptTag) {
        scriptTag = document.createElement('script')
        scriptTag.id = 'route-jsonld'
        scriptTag.type = 'application/ld+json'
        document.head.appendChild(scriptTag)
      }
      scriptTag.text = JSON.stringify(jsonLd)
    } else if (scriptTag) {
      scriptTag.remove()
    }

    return () => {
      // Limpeza opcional se desmontar
      const ld = document.getElementById('route-jsonld')
      if (ld) ld.remove()
    }
  }, [title, description, canonicalUrl, keywords, jsonLd])

  return null
}

export default SEO

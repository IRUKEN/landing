import type { Language } from './LanguageProvider'

export const translations = {
  es: {
    languageLabel: 'Cambiar idioma a inglés', heroKicker: 'NOTAS DE CAMPO / 2026', heroTitle: 'Ideas que se convierten en sistemas.', heroDescription: 'Notas prácticas sobre ingeniería full-stack, arquitectura, producto y las decisiones que hacen que el software sea más claro de operar.', featured: 'DESTACADO', readFieldNote: 'Leer nota de campo', latestWriting: 'PUBLICACIONES RECIENTES', latestArticles: 'Últimos artículos', latestDescription: 'Ejemplos reproducibles y aprendizajes obtenidos construyendo productos y plataformas.', readArticle: 'Leer', footerTopics: 'INGENIERÍA · PRODUCTO · SISTEMAS', backToBlog: 'Volver al blog', continueExploring: 'CONTINUAR EXPLORANDO', moreNotes: 'Más notas sobre ingeniería, producto y sistemas.', viewAllArticles: 'Ver todos los artículos', notFoundKicker: '404 / NOTA DE CAMPO', notFoundTitle: 'Artículo no encontrado.'
  },
  en: {
    languageLabel: 'Switch language to Spanish', heroKicker: 'FIELD NOTES / 2026', heroTitle: 'Ideas that become systems.', heroDescription: 'Practical notes on full-stack engineering, architecture, product, and the decisions that make software clearer to operate.', featured: 'FEATURED', readFieldNote: 'Read field note', latestWriting: 'LATEST WRITING', latestArticles: 'Latest articles', latestDescription: 'Reproducible examples and lessons learned while building products and platforms.', readArticle: 'Read', footerTopics: 'ENGINEERING · PRODUCT · SYSTEMS', backToBlog: 'Back to the blog', continueExploring: 'CONTINUE EXPLORING', moreNotes: 'More notes on engineering, product, and systems.', viewAllArticles: 'View all articles', notFoundKicker: '404 / FIELD NOTE', notFoundTitle: 'Article not found.'
  }
} satisfies Record<Language, Record<string, string>>

export function useTranslations(language: Language) {
  return translations[language]
}

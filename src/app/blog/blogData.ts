import type { Language } from '../i18n/LanguageProvider'

export type BlogSection = { title: string; paragraphs: string[]; bullets?: string[]; code?: string }
type LocalizedPost = { category: string; displayDate: string; readTime: string; title: string; excerpt: string; lede: string; sections: BlogSection[] }
export type BlogPost = { slug: string; date: string; es: LocalizedPost; en: LocalizedPost }
export type LocalizedBlogPost = LocalizedPost & Pick<BlogPost, 'slug' | 'date'>

export const blogPosts: BlogPost[] = [
  {
    slug: 'publicar-portafolio-aws', date: '2026-10-06',
    es: {
      category: 'AWS · ENTREGA', displayDate: '06 OCT 2026', readTime: '6 MIN',
      title: 'Cómo publicaría este portafolio en AWS sin complicarlo',
      excerpt: 'Una ruta práctica para pasar de una aplicación Vite a un despliegue automático, seguro y fácil de mantener.',
      lede: 'Una página personal no necesita una arquitectura enorme. Necesita un flujo de entrega claro, HTTPS y una forma segura de volver atrás cuando algo falla.',
      sections: [
        { title: 'El sistema más pequeño que resuelve el problema', paragraphs: ['Para este portafolio usaría AWS Amplify Hosting conectado directamente con GitHub. Cada cambio aprobado en la rama principal genera una compilación y una publicación nuevas, sin administrar servidores.', 'La infraestructura sigue siendo sencilla: GitHub conserva el código, Amplify ejecuta el build de Vite y la distribución global entrega los archivos generados.'] },
        { title: 'Un flujo de publicación predecible', paragraphs: ['La automatización debe reducir riesgo, no esconder lo que ocurre. Mantendría un proceso corto y visible:'], bullets: ['Desarrollar y probar el cambio localmente.', 'Crear un commit pequeño con una intención clara.', 'Enviar el cambio a GitHub y dejar que Amplify compile.', 'Validar la URL de producción y las métricas básicas de salud.'], code: 'npm run build\ngit add .\ngit commit -m "Add a new blog article"\ngit push origin main' },
        { title: 'Lo que dejaría para después', paragraphs: ['No agregaría una base de datos ni un panel de administración mientras el volumen de publicaciones sea pequeño. Los artículos pueden vivir como contenido versionado dentro del repositorio y migrarse a Markdown o a un CMS cuando exista una necesidad real.', 'Ese orden mantiene bajos los costos operativos y permite invertir primero en contenido, accesibilidad y rendimiento.'] }
      ]
    },
    en: {
      category: 'AWS · DELIVERY', displayDate: 'OCT 06 2026', readTime: '6 MIN',
      title: 'How I would publish this portfolio on AWS without overcomplicating it',
      excerpt: 'A practical path from a Vite application to an automated, secure, and maintainable deployment.',
      lede: 'A personal website does not need a massive architecture. It needs a clear delivery flow, HTTPS, and a safe way to roll back when something fails.',
      sections: [
        { title: 'The smallest system that solves the problem', paragraphs: ['For this portfolio, I would use AWS Amplify Hosting connected directly to GitHub. Every approved change on the main branch creates a new build and deployment without managing servers.', 'The infrastructure remains simple: GitHub stores the code, Amplify runs the Vite build, and the global distribution serves the generated files.'] },
        { title: 'A predictable publishing flow', paragraphs: ['Automation should reduce risk, not hide what is happening. I would keep the process short and visible:'], bullets: ['Develop and test the change locally.', 'Create a small commit with a clear purpose.', 'Push the change to GitHub and let Amplify build it.', 'Validate the production URL and basic health metrics.'], code: 'npm run build\ngit add .\ngit commit -m "Add a new blog article"\ngit push origin main' },
        { title: 'What I would leave for later', paragraphs: ['I would not add a database or administration panel while the publication volume remains small. Articles can live as versioned content in the repository and migrate to Markdown or a CMS when there is a real need.', 'That order keeps operational costs low and makes room to invest first in content, accessibility, and performance.'] }
      ]
    }
  },
  {
    slug: 'api-mantenible', date: '2026-09-28',
    es: {
      category: 'BACKEND · SISTEMAS', displayDate: '28 SEP 2026', readTime: '5 MIN', title: 'Cinco decisiones para construir una API mantenible', excerpt: 'Convenciones pequeñas que ayudan a que un backend crezca sin volverse difícil de probar, observar o cambiar.', lede: 'Una API se vuelve costosa cuando sus decisiones son implícitas. Estas prácticas reducen sorpresas y facilitan que otras personas contribuyan.',
      sections: [
        { title: '1. Contratos antes que implementaciones', paragraphs: ['Definir entradas, respuestas y errores antes de programar evita que cada endpoint invente sus propias reglas. Un contrato claro también permite que frontend y backend avancen con menos bloqueos.'] },
        { title: '2. Errores consistentes', paragraphs: ['Una estructura estable para códigos, mensajes y detalles permite que los clientes reaccionen correctamente sin analizar textos variables.'] },
        { title: '3. Validación en el límite', paragraphs: ['Los datos externos deben validarse al entrar. La lógica interna puede trabajar con valores conocidos y reducir comprobaciones repetidas.'] },
        { title: '4. Casos de uso pequeños', paragraphs: ['Separar las reglas de negocio de HTTP hace que las pruebas sean más rápidas y que la misma lógica pueda reutilizarse desde procesos, colas o tareas programadas.'] },
        { title: '5. Observabilidad desde el inicio', paragraphs: ['Registros estructurados, identificadores de solicitud y métricas básicas convierten una falla en un problema investigable. Lo que no puede observarse tampoco puede operarse con confianza.'] }
      ]
    },
    en: {
      category: 'BACKEND · SYSTEMS', displayDate: 'SEP 28 2026', readTime: '5 MIN', title: 'Five decisions for building a maintainable API', excerpt: 'Small conventions that help a backend grow without becoming difficult to test, observe, or change.', lede: 'An API becomes expensive when its decisions remain implicit. These practices reduce surprises and make it easier for others to contribute.',
      sections: [
        { title: '1. Contracts before implementations', paragraphs: ['Defining inputs, responses, and errors before coding prevents every endpoint from inventing its own rules. A clear contract also helps frontend and backend move forward with fewer blockers.'] },
        { title: '2. Consistent errors', paragraphs: ['A stable structure for codes, messages, and details allows clients to react correctly without parsing variable text.'] },
        { title: '3. Validation at the boundary', paragraphs: ['External data should be validated as it enters. Internal logic can then work with known values and avoid repeated checks.'] },
        { title: '4. Small use cases', paragraphs: ['Separating business rules from HTTP makes tests faster and allows the same logic to be reused by jobs, queues, or scheduled tasks.'] },
        { title: '5. Observability from the start', paragraphs: ['Structured logs, request identifiers, and basic metrics turn a failure into an issue that can be investigated. What cannot be observed cannot be operated with confidence.'] }
      ]
    }
  },
  {
    slug: 'sistemas-antes-que-herramientas', date: '2026-09-18',
    es: {
      category: 'ESTRATEGIA · PROCESO', displayDate: '18 SEP 2026', readTime: '4 MIN', title: 'Sistemas antes que herramientas', excerpt: 'Cómo separar el problema, el proceso y la tecnología para tomar decisiones técnicas con mayor claridad.', lede: 'Una herramienta puede acelerar un buen proceso, pero rara vez corrige un sistema que nadie ha entendido todavía.',
      sections: [
        { title: 'Empezar por el resultado', paragraphs: ['Antes de elegir una plataforma, conviene definir qué cambio observable debe producir el sistema, quién lo utiliza y qué restricciones no pueden ignorarse.'] },
        { title: 'Diseñar el flujo', paragraphs: ['Un mapa simple de entradas, decisiones, responsables y salidas suele revelar más que una lista temprana de tecnologías. Después de entender ese flujo, la selección técnica se vuelve mucho más concreta.'] },
        { title: 'Medir el costo completo', paragraphs: ['La mejor herramienta no es solamente la que permite lanzar rápido. También debe poder mantenerse, observarse y entregarse a otras personas sin depender de conocimiento oculto.'] }
      ]
    },
    en: {
      category: 'STRATEGY · PROCESS', displayDate: 'SEP 18 2026', readTime: '4 MIN', title: 'Systems before tools', excerpt: 'How separating the problem, process, and technology leads to clearer technical decisions.', lede: 'A tool can accelerate a good process, but it rarely fixes a system that nobody understands yet.',
      sections: [
        { title: 'Start with the outcome', paragraphs: ['Before choosing a platform, define the observable change the system must produce, who uses it, and which constraints cannot be ignored.'] },
        { title: 'Design the flow', paragraphs: ['A simple map of inputs, decisions, owners, and outputs usually reveals more than an early list of technologies. Once that flow is understood, the technical selection becomes much more concrete.'] },
        { title: 'Measure the complete cost', paragraphs: ['The best tool is not merely the one that launches quickly. It must also be maintainable, observable, and transferable without relying on hidden knowledge.'] }
      ]
    }
  }
]

export function getLocalizedPosts(language: Language): LocalizedBlogPost[] {
  return blogPosts.map(post => ({ slug: post.slug, date: post.date, ...post[language] }))
}

export function getLocalizedPost(slug: string, language: Language) {
  const post = blogPosts.find(candidate => candidate.slug === slug)
  return post ? { slug: post.slug, date: post.date, ...post[language] } : undefined
}

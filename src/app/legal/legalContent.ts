import type { Language } from '../i18n/LanguageProvider'

export type LegalDocument = 'terms' | 'privacy' | 'cookies'

type LegalSection = {
  title: string
  paragraphs?: string[]
  bullets?: string[]
}

type LegalCopy = {
  eyebrow: string
  title: string
  summary: string
  updated: string
  sections: LegalSection[]
}

type LegalUi = {
  legal: string
  terms: string
  privacy: string
  cookies: string
  contact: string
  noticeTitle: string
  noticeBody: string
  understand: string
  learnMore: string
}

export const legalUi: Record<Language, LegalUi> = {
  es: {
    legal: 'Información legal',
    terms: 'Términos y condiciones',
    privacy: 'Privacidad',
    cookies: 'Cookies y almacenamiento',
    contact: 'Contacto',
    noticeTitle: 'Privacidad por diseño',
    noticeBody: 'Este sitio no usa cookies publicitarias ni analítica. Solo guarda preferencias y datos funcionales en tu dispositivo.',
    understand: 'Entendido',
    learnMore: 'Ver detalles'
  },
  en: {
    legal: 'Legal information',
    terms: 'Terms and conditions',
    privacy: 'Privacy',
    cookies: 'Cookies and storage',
    contact: 'Contact',
    noticeTitle: 'Privacy by design',
    noticeBody: 'This site does not use advertising or analytics cookies. It only stores preferences and functional data on your device.',
    understand: 'Got it',
    learnMore: 'View details'
  }
}

export const legalDocuments: Record<LegalDocument, Record<Language, LegalCopy>> = {
  terms: {
    es: {
      eyebrow: 'LEGAL / TÉRMINOS',
      title: 'Términos y condiciones',
      summary: 'Reglas de uso del sitio ernitabash.com y alcance de su contenido.',
      updated: 'Vigentes desde el 7 de octubre de 2026',
      sections: [
        {
          title: '1. Titular del sitio',
          paragraphs: ['Este sitio personal es administrado por Erni Tabash Sequeira, Costa Rica. Para consultas relacionadas con estos términos puede escribir a ernitabash01@gmail.com.']
        },
        {
          title: '2. Aceptación y uso permitido',
          paragraphs: ['Al navegar por este sitio acepta estos términos. Puede consultar y compartir enlaces al contenido para fines lícitos, personales, académicos o profesionales, respetando la autoría y los derechos aplicables.'],
          bullets: ['No intente vulnerar, interferir o sobrecargar el sitio o su infraestructura.', 'No utilice el contenido para suplantar al autor ni atribuirle declaraciones que no haya realizado.', 'No extraiga ni reutilice contenido de forma automatizada cuando ello infrinja derechos o afecte la disponibilidad del servicio.']
        },
        {
          title: '3. Contenido y propiedad intelectual',
          paragraphs: ['Los textos, diseños y materiales originales pertenecen a su autor, salvo que se indique otra licencia o atribución. Las marcas, bibliotecas y materiales de terceros pertenecen a sus respectivos titulares. Las citas breves y enlaces son bienvenidos cuando incluyen atribución y enlace a la fuente.']
        },
        {
          title: '4. Información profesional, no asesoría',
          paragraphs: ['El blog y el portafolio tienen fines informativos. El contenido técnico refleja experiencias y criterios generales; no constituye asesoría legal, financiera, de ciberseguridad ni una garantía de resultados. Antes de aplicar una recomendación debe evaluarla según su contexto y riesgos.']
        },
        {
          title: '5. Contacto y contratación electrónica',
          paragraphs: ['Enviar un correo, mensaje o solicitud desde un enlace del sitio no crea por sí solo una relación contractual, laboral, de representación o confidencialidad. Tampoco se realizan pagos, compras ni contratación automatizada en este sitio.'],
          bullets: ['Cualquier servicio profesional requerirá una propuesta o acuerdo separado.', 'Ese acuerdo deberá definir al menos alcance, entregables, precio, impuestos, fechas, responsabilidades, confidencialidad y forma de terminación.', 'Cuando corresponda una firma digital certificada, se aplicará la Ley costarricense N.º 8454 y sus requisitos.']
        },
        {
          title: '6. Enlaces y servicios de terceros',
          paragraphs: ['Los enlaces a GitHub, LinkedIn u otros sitios se ofrecen como referencia. Sus contenidos, disponibilidad y prácticas de privacidad dependen de sus respectivos operadores.']
        },
        {
          title: '7. Disponibilidad y responsabilidad',
          paragraphs: ['Se procura mantener información correcta y un sitio seguro, pero no se garantiza disponibilidad ininterrumpida ni ausencia absoluta de errores. En la máxima medida permitida por la ley, el titular no será responsable por daños indirectos derivados del uso del contenido. Nada de estos términos limita derechos irrenunciables reconocidos por la legislación aplicable.']
        },
        {
          title: '8. Cambios, ley y jurisdicción',
          paragraphs: ['Estos términos pueden actualizarse de manera prospectiva; la fecha vigente aparecerá al inicio. Se interpretan conforme a las leyes de la República de Costa Rica. Las controversias se someterán a sus autoridades competentes, sin perjudicar las protecciones obligatorias que correspondan a consumidores u otras personas usuarias.']
        }
      ]
    },
    en: {
      eyebrow: 'LEGAL / TERMS',
      title: 'Terms and conditions',
      summary: 'Rules for using ernitabash.com and the scope of its content.',
      updated: 'Effective October 7, 2026',
      sections: [
        { title: '1. Site owner', paragraphs: ['This personal site is operated by Erni Tabash Sequeira in Costa Rica. Questions about these terms may be sent to ernitabash01@gmail.com.'] },
        { title: '2. Acceptance and permitted use', paragraphs: ['By browsing this site, you accept these terms. You may read and share links to its content for lawful personal, academic, or professional purposes while respecting authorship and applicable rights.'], bullets: ['Do not attempt to compromise, interfere with, or overload the site or its infrastructure.', 'Do not impersonate the author or attribute statements to him that he did not make.', 'Do not automatically extract or reuse content where doing so infringes rights or affects service availability.'] },
        { title: '3. Content and intellectual property', paragraphs: ['Original text, designs, and materials belong to their author unless another license or attribution is stated. Third-party trademarks, libraries, and materials belong to their respective owners. Short quotations and links are welcome when they include attribution and a link to the source.'] },
        { title: '4. Professional information, not advice', paragraphs: ['The blog and portfolio are informational. Technical content reflects general experience and judgment; it is not legal, financial, or cybersecurity advice and does not guarantee results. Evaluate every recommendation against your own context and risks before applying it.'] },
        { title: '5. Contact and electronic contracting', paragraphs: ['Sending an email, message, or request through a site link does not by itself create a contract, employment, agency, or confidential relationship. This site does not process payments, purchases, or automated contracts.'], bullets: ['Any professional service requires a separate proposal or agreement.', 'That agreement should define scope, deliverables, price, taxes, dates, responsibilities, confidentiality, and termination.', 'Where a certified digital signature is required, Costa Rican Law No. 8454 and its requirements apply.'] },
        { title: '6. Third-party links and services', paragraphs: ['Links to GitHub, LinkedIn, and other sites are provided for reference. Their content, availability, and privacy practices are controlled by their respective operators.'] },
        { title: '7. Availability and liability', paragraphs: ['Reasonable efforts are made to keep information accurate and the site secure, but uninterrupted availability and complete absence of errors cannot be guaranteed. To the fullest extent allowed by law, the owner is not liable for indirect damage arising from use of the content. Nothing here limits non-waivable rights under applicable law.'] },
        { title: '8. Changes, law, and jurisdiction', paragraphs: ['These terms may be updated prospectively; the effective date will appear above. They are governed by the laws of the Republic of Costa Rica. Disputes are subject to its competent authorities without limiting mandatory protections available to consumers or other users.'] }
      ]
    }
  },
  privacy: {
    es: {
      eyebrow: 'LEGAL / PRIVACIDAD',
      title: 'Política de privacidad',
      summary: 'Qué información se trata, para qué se utiliza y cómo puede ejercer sus derechos.',
      updated: 'Vigente desde el 7 de octubre de 2026',
      sections: [
        { title: '1. Responsable y contacto', paragraphs: ['Erni Tabash Sequeira es responsable del tratamiento descrito en esta política. Puede enviar consultas o solicitudes sobre sus datos a ernitabash01@gmail.com. Esta política se basa en la Ley N.º 8968 de Costa Rica y su Reglamento, Decreto Ejecutivo N.º 37554-JP.'] },
        { title: '2. Datos tratados', bullets: ['Datos que usted entrega voluntariamente al contactar por correo o por una red profesional, como nombre, dirección de contacto y contenido del mensaje.', 'Datos técnicos mínimos de acceso que el proveedor de alojamiento puede procesar para entregar y proteger el sitio, como dirección IP, fecha, solicitud, navegador y registros de seguridad.', 'Preferencia de idioma y, dentro de la herramienta privada de cronogramas, eventos o selecciones que se guardan únicamente en el almacenamiento local de su navegador.'] },
        { title: '3. Finalidades y fundamento', paragraphs: ['Los mensajes se utilizan para responder la solicitud y mantener la comunicación solicitada por usted. Los registros técnicos se emplean para disponibilidad, diagnóstico y seguridad. Las preferencias locales permiten recordar funciones elegidas por el usuario. No se venden datos, no se crean perfiles publicitarios y no se utiliza analítica de visitantes.'] },
        { title: '4. Proveedores y transferencias', paragraphs: ['El sitio se aloja en Amazon Web Services mediante AWS Amplify y CloudFront. Ese proveedor puede procesar datos técnicos como encargado tecnológico bajo sus propias medidas y ubicaciones de infraestructura. Los enlaces externos solo transmiten información cuando usted decide abrirlos. No se comparte deliberadamente información personal con terceros para publicidad.'] },
        { title: '5. Conservación y seguridad', paragraphs: ['Los mensajes se conservan únicamente durante el tiempo razonablemente necesario para atenderlos, mantener registros profesionales o cumplir obligaciones legales. Los datos locales permanecen en su navegador hasta que usted los elimina. Se aplican HTTPS, encabezados de seguridad, minimización de dependencias externas y controles de acceso del proveedor; ningún sistema puede prometer seguridad absoluta.'] },
        { title: '6. Sus derechos', paragraphs: ['Puede solicitar gratuitamente acceso, corrección, actualización o supresión de sus datos, así como retirar un consentimiento o consultar una transferencia. Envíe la solicitud desde un medio que permita verificar razonablemente su identidad. Conforme a la Ley N.º 8968, la solicitud debe resolverse según corresponda dentro de cinco días hábiles. También puede acudir a la Agencia de Protección de Datos de los Habitantes (PRODHAB).'] },
        { title: '7. Menores y datos sensibles', paragraphs: ['El sitio no está diseñado para recopilar deliberadamente datos de menores ni datos sensibles. No envíe esa información por correo abierto. Si considera que se recibió información de este tipo por error, solicite su eliminación.'] },
        { title: '8. Cambios', paragraphs: ['Las modificaciones materiales se reflejarán en esta página y no se aplicarán retroactivamente de forma incompatible con los derechos de las personas.'] }
      ]
    },
    en: {
      eyebrow: 'LEGAL / PRIVACY',
      title: 'Privacy policy',
      summary: 'What information is processed, why it is used, and how you can exercise your rights.',
      updated: 'Effective October 7, 2026',
      sections: [
        { title: '1. Controller and contact', paragraphs: ['Erni Tabash Sequeira is responsible for the processing described here. Send privacy questions or data requests to ernitabash01@gmail.com. This policy is based on Costa Rican Law No. 8968 and Executive Decree No. 37554-JP.'] },
        { title: '2. Data processed', bullets: ['Information you voluntarily provide by email or through a professional network, such as your name, contact address, and message.', 'Minimum access data the hosting provider may process to deliver and protect the site, such as IP address, date, request, browser, and security logs.', 'Language preference and, within the private schedule tool, events or selections stored only in your browser local storage.'] },
        { title: '3. Purposes and basis', paragraphs: ['Messages are used to answer your request and maintain the communication you initiated. Technical logs support availability, diagnostics, and security. Local preferences remember functions selected by the user. Data is not sold, advertising profiles are not created, and visitor analytics are not used.'] },
        { title: '4. Providers and transfers', paragraphs: ['The site is hosted on Amazon Web Services through AWS Amplify and CloudFront. That provider may process technical data as a technology processor using its own safeguards and infrastructure locations. External links transmit information only when you choose to open them. Personal information is not intentionally shared with third parties for advertising.'] },
        { title: '5. Retention and security', paragraphs: ['Messages are kept only as long as reasonably necessary to address them, maintain professional records, or satisfy legal obligations. Local data remains in your browser until you remove it. HTTPS, security headers, fewer external dependencies, and provider access controls are used; no system can promise absolute security.'] },
        { title: '6. Your rights', paragraphs: ['You may request access, correction, updating, or deletion free of charge, withdraw consent, or ask about a transfer. Send the request through a channel that allows reasonable identity verification. Under Law No. 8968, a request must be resolved as applicable within five business days. You may also contact Costa Rica’s Data Protection Agency (PRODHAB).'] },
        { title: '7. Children and sensitive data', paragraphs: ['The site is not designed to intentionally collect children’s or sensitive data. Do not send such information through open email. If you believe it was received by mistake, request its deletion.'] },
        { title: '8. Changes', paragraphs: ['Material changes will appear on this page and will not be applied retroactively in a way that conflicts with individual rights.'] }
      ]
    }
  },
  cookies: {
    es: {
      eyebrow: 'LEGAL / ALMACENAMIENTO',
      title: 'Cookies y almacenamiento local',
      summary: 'Una explicación concreta de lo que el sitio guarda en su navegador.',
      updated: 'Vigente desde el 7 de octubre de 2026',
      sections: [
        { title: '1. Resumen', paragraphs: ['Este sitio no instala cookies de publicidad, seguimiento ni analítica. Tampoco incorpora píxeles de marketing. Usa almacenamiento local estrictamente funcional para que ciertas preferencias permanezcan en el dispositivo.'] },
        { title: '2. Elementos almacenados', bullets: ['erni-tabash-language: recuerda si eligió español o inglés.', 'erni-tabash-privacy-notice: recuerda que cerró el aviso informativo de privacidad.', 'La herramienta /cronogramas puede guardar en su navegador el cronograma seleccionado y eventos personalizados. Esa información no se envía al servidor por la aplicación.'] },
        { title: '3. Cookies técnicas del alojamiento', paragraphs: ['En condiciones normales el sitio público no necesita establecer cookies. La infraestructura de AWS puede aplicar mecanismos técnicos de seguridad o entrega cuando sean necesarios. Si en el futuro se incorpora analítica, publicidad u otra tecnología no esencial, esta política y el mecanismo de consentimiento deberán actualizarse antes de activarla.'] },
        { title: '4. Cómo controlar o eliminar los datos', paragraphs: ['Puede borrar los datos del sitio desde la configuración de privacidad de su navegador, normalmente en la sección de cookies y datos del sitio. Al hacerlo se restablecerán el idioma y las preferencias locales; también puede perder eventos personalizados guardados en /cronogramas. Bloquear el almacenamiento local puede impedir que esas funciones recuerden sus elecciones.'] },
        { title: '5. Contacto', paragraphs: ['Para consultar esta política escriba a ernitabash01@gmail.com.'] }
      ]
    },
    en: {
      eyebrow: 'LEGAL / STORAGE',
      title: 'Cookies and local storage',
      summary: 'A concrete explanation of what the site stores in your browser.',
      updated: 'Effective October 7, 2026',
      sections: [
        { title: '1. Summary', paragraphs: ['This site does not install advertising, tracking, or analytics cookies and does not embed marketing pixels. It uses strictly functional local storage so selected preferences remain on the device.'] },
        { title: '2. Stored items', bullets: ['erni-tabash-language remembers whether you selected Spanish or English.', 'erni-tabash-privacy-notice remembers that you dismissed the informational privacy notice.', 'The /cronogramas tool may store the selected schedule and custom events in your browser. The application does not send this information to the server.'] },
        { title: '3. Technical hosting cookies', paragraphs: ['The public site does not normally need to set cookies. AWS infrastructure may apply technical delivery or security mechanisms when necessary. If analytics, advertising, or another non-essential technology is added later, this policy and the consent mechanism must be updated before it is enabled.'] },
        { title: '4. Controlling or deleting data', paragraphs: ['You can remove site data through your browser privacy settings, usually under cookies and site data. Doing so resets language and local preferences and may remove custom events saved in /cronogramas. Blocking local storage may prevent those features from remembering your choices.'] },
        { title: '5. Contact', paragraphs: ['Questions about this policy may be sent to ernitabash01@gmail.com.'] }
      ]
    }
  }
}

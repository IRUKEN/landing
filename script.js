// Detectar el idioma del navegador y normalizarlo
function detectUserLanguage() {
  const userLang = navigator.language || navigator.userLanguage; // Detectar idioma del SO
  console.log("Idioma del sistema detectado:", userLang);

  // Normalizar el idioma: Tomar solo los dos primeros caracteres ("es", "en", etc.)
  const normalizedLang = userLang.slice(0, 2);

  // Si el idioma detectado es "es", usar español; de lo contrario, inglés
  return normalizedLang === "es" ? "es" : "en";
}

// Esperar a que el DOM esté listo
document.addEventListener("DOMContentLoaded", function () {
  const detectedLang = detectUserLanguage(); // Detectar idioma del usuario
  console.log("Usando idioma:", detectedLang);

  i18next
    .init({
      lng: detectedLang, // Usar el idioma detectado
      fallbackLng: "es", // Fallback al español
      debug: true,
    })
    .then(() => {
      loadTranslations();
    })
    .catch((err) => console.error("Error al inicializar i18next:", err));
});

// Cargar archivos JSON externos y añadir recursos a i18next
function loadTranslations() {
  console.log("Cargando archivos JSON de traducción...");
  Promise.all([
    fetch("/es.json").then((res) => res.json()),
    fetch("/en.json").then((res) => res.json()),
  ])
    .then(([es, en]) => {
      console.log("Traducciones cargadas correctamente.");

      // Agregar traducciones a i18next
      Object.keys(es).forEach((key) => {
        i18next.addResource("es", "translation", key, es[key]);
      });
      Object.keys(en).forEach((key) => {
        i18next.addResource("en", "translation", key, en[key]);
      });

      updateContent(); // Aplicar traducciones en la página
    })
    .catch((err) => console.error("Error cargando traducciones:", err));
}

// Función para actualizar el contenido de la página con las traducciones
function updateContent() {
  console.log("Actualizando contenido con i18next...");
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    const translation = i18next.t(key);
    console.log(`Clave: ${key}, Traducción: ${translation}`);
    element.innerHTML = translation;
  });
}

// Función para cambiar el idioma manualmente
function switchLanguage() {
  const newLang = i18next.language === "es" ? "en" : "es";
  console.log("Cambiando idioma a:", newLang);
  i18next.changeLanguage(newLang).then(updateContent);
}

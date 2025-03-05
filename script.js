// Esperar a que el DOM esté listo
document.addEventListener("DOMContentLoaded", function () {
  i18next
    .init({
      lng: "es", // Idioma por defecto
      fallbackLng: "es",
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
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    const translation = i18next.t(key);
    element.innerHTML = translation;
  });
}

// Función para cambiar el idioma
function switchLanguage() {
  const newLang = i18next.language === "es" ? "en" : "es";
  i18next.changeLanguage(newLang).then(updateContent);
}

import { CalendarDays, RotateCcw, Search, Trash2, Upload } from 'lucide-react';
import type { ChangeEvent, FormEvent } from 'react';
import { filterOptions, kindClass, scheduleDisplayName, shortDateLabel } from './schedule';
import { useScheduleWorkspace } from './useScheduleWorkspace';
import './cronogramas.css';

export function CronogramasPage() {
  const workspace = useScheduleWorkspace();
  const active = workspace.activeSchedule;

  if (!active) {
    return <main className="crono-page"><div className="crono-loading">Cargando cronogramas...</div></main>;
  }

  const courseName = scheduleDisplayName(active.data);
  const scheduleLabel = active.data.course.CRONOGRAMA ?? active.slotLabel ?? 'Cronograma activo';

  return (
    <main className="crono-page">
      <header className="crono-hero" id="inicio">
        <nav className="crono-nav" aria-label="Navegación de cronogramas">
          <a href="/" className="crono-brand">Erni Tabash</a>
          <div>
            <a href="#cronogramas">Cronogramas</a>
            <a href="#evaluacion">Evaluación</a>
            <a href="#agenda">Agenda</a>
          </div>
        </nav>

        <section className="crono-hero-grid">
          <div>
            <p className="crono-eyebrow">Universidad Nacional · II ciclo 2026</p>
            <h1>Centro de cronogramas</h1>
            <p className="crono-lead">Seis programas disponibles para revisar evaluaciones, prácticas y eventos sin mezclar datos entre cursos.</p>
            <div className="crono-actions-row">
              <a className="crono-button primary" href="#cronogramas"><CalendarDays size={18} />Ver cronogramas</a>
              <button className="crono-button secondary" onClick={() => workspace.setFormOpen(true)}>Agregar evento</button>
            </div>
          </div>

          <aside className="crono-hero-card" aria-label="Resumen del cronograma activo">
            <span>Cronograma activo</span>
            <h2>{courseName}</h2>
            <p>{scheduleLabel}</p>
            <div className="crono-facts">
              <div><strong>{workspace.summary.totalEvents}</strong><small>eventos</small></div>
              <div><strong>{workspace.summary.importantEvents}</strong><small>hitos</small></div>
              <div><strong>{workspace.summary.customEvents}</strong><small>personales</small></div>
            </div>
            <small className="crono-period">{workspace.summary.firstDate} - {workspace.summary.lastDate}</small>
          </aside>
        </section>
      </header>

      <section id="cronogramas" className="crono-section crono-light">
        <div className="crono-container">
          <div className="crono-section-head">
            <div>
              <p className="crono-eyebrow">Programas separados</p>
              <h2>Mis cronogramas</h2>
            </div>
            <p>Escoge un programa para ver solamente la evaluación y la agenda correspondiente a ese cronograma.</p>
          </div>

          <div className="crono-dashboard">
            <div className="crono-schedule-list">
              {workspace.schedules.map(schedule => (
                <article className={`crono-slot ${workspace.selectedScheduleId === schedule.id ? 'active' : ''}`} key={schedule.id}>
                  <button type="button" onClick={() => workspace.setSelectedScheduleId(schedule.id)}>
                    <span>{schedule.assigned ? 'Personalizado' : 'Publicado'}</span>
                    <strong>{schedule.name}</strong>
                    <small>{schedule.data.events.length} eventos · {schedule.data.evaluations.length} evaluaciones</small>
                  </button>
                  <div className="crono-slot-actions">
                    <label>
                      <Upload size={16} />Asignar JSON
                      <input
                        type="file"
                        accept="application/json,.json"
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                          const file = event.target.files?.[0];
                          if (file) void workspace.assignScheduleData(schedule.id, file);
                          event.target.value = '';
                        }}
                      />
                    </label>
                    {schedule.assigned && (
                      <button type="button" onClick={() => workspace.resetAssignedSchedule(schedule.id)}><RotateCcw size={16} />Restaurar</button>
                    )}
                  </div>
                </article>
              ))}
            </div>

            <aside className="crono-side-summary">
              <div><span>Eventos</span><strong>{workspace.summary.totalEvents}</strong></div>
              <div><span>Hitos clave</span><strong>{workspace.summary.importantEvents}</strong></div>
              <div><span>Personales</span><strong>{workspace.summary.customEvents}</strong></div>
            </aside>
          </div>

          {workspace.importError && <p className="crono-error">{workspace.importError}</p>}
        </div>
      </section>

      <section id="evaluacion" className="crono-section crono-dark">
        <div className="crono-container">
          <div className="crono-section-head split">
            <div>
              <p className="crono-eyebrow">Distribución por cronograma</p>
              <h2>Evaluación del curso</h2>
            </div>
            <div className="crono-context">
              <span>{scheduleLabel}</span>
              <strong>{courseName}</strong>
              <small>{workspace.summary.firstDate} - {workspace.summary.lastDate}</small>
            </div>
          </div>

          <div className="crono-evaluation-grid">
            {active.data.evaluations.map(item => (
              <article className="crono-evaluation-card" key={`${item.name}-${item.percentage}`}>
                <strong>{item.percentage}</strong>
                <p>{item.name}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="agenda" className="crono-section crono-light">
        <div className="crono-container">
          <div className="crono-section-head split">
            <div>
              <p className="crono-eyebrow">Semana a semana</p>
              <h2>Agenda del curso</h2>
            </div>
            <button className="crono-button primary" onClick={() => workspace.setFormOpen(true)}>Nuevo evento</button>
          </div>

          <div className="crono-toolbar">
            <label className="crono-search">
              <Search size={18} />
              <input value={workspace.query} onChange={event => workspace.setQuery(event.target.value)} placeholder="Buscar tema, actividad, recurso o modalidad..." />
            </label>
            <div className="crono-filters" aria-label="Filtrar eventos">
              {filterOptions.map(option => (
                <button className={workspace.filter === option ? 'active' : ''} key={option} onClick={() => workspace.setFilter(option)}>{option}</button>
              ))}
            </div>
          </div>

          <div className="crono-timeline">
            {workspace.visibleEvents.map(event => (
              <article className={`crono-event ${event.custom ? 'custom' : ''}`} key={event.id}>
                <div className="crono-event-date">
                  <span>{event.session ? `Sesión ${event.session}` : 'Personal'}</span>
                  <strong>{shortDateLabel(event)}</strong>
                </div>
                <div className="crono-dot" />
                <div className="crono-event-card">
                  <div className="crono-tags"><span className={kindClass[event.kind] ?? 'info'}>{event.kind}</span><span>{event.type}</span></div>
                  <h3>{event.topic}</h3>
                  <p>{event.activity}</p>
                  {event.holiday && <p className="crono-holiday">{event.holiday}</p>}
                  {event.resources && <p className="crono-resources"><strong>Recursos:</strong> {event.resources}</p>}
                  {event.custom && <button className="crono-delete" onClick={() => workspace.removeCustomEvent(event.id)}><Trash2 size={16} />Eliminar evento</button>}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {workspace.formOpen && <EventModal onClose={() => workspace.setFormOpen(false)} onSubmit={workspace.saveCustomEvent} />}
    </main>
  );
}

function EventModal({ onClose, onSubmit }: { onClose: () => void; onSubmit: (event: FormEvent<HTMLFormElement>) => void }) {
  return (
    <div className="crono-modal" role="dialog" aria-modal="true" aria-labelledby="new-event-title">
      <button className="crono-modal-backdrop" aria-label="Cerrar" onClick={onClose} />
      <form className="crono-modal-card" onSubmit={onSubmit}>
        <header><div><p className="crono-eyebrow">Agenda personal</p><h2 id="new-event-title">Agregar evento</h2></div><button type="button" onClick={onClose}>Cerrar</button></header>
        <label>Título<input name="title" required placeholder="Ej. Entrega del cuestionario" /></label>
        <div className="crono-form-grid"><label>Fecha<input name="date" type="date" required /></label><label>Categoría<select name="kind"><option>Clase</option><option>Práctica</option><option>Prueba</option><option>Proyecto</option><option>Virtual</option></select></label></div>
        <label>Modalidad<select name="mode"><option>Presencial</option><option>Virtual sincrónica</option><option>Virtual asincrónica</option><option>Personal</option></select></label>
        <label>Detalles<textarea name="details" required placeholder="¿Qué debes preparar o entregar?" /></label>
        <label>Recursos<input name="resources" placeholder="Lectura, computadora, enlace..." /></label>
        <footer><button className="crono-button primary" type="submit">Guardar evento</button><button className="crono-button secondary" type="button" onClick={onClose}>Cancelar</button></footer>
      </form>
    </div>
  );
}

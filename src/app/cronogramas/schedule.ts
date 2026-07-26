import type { ScheduleData, ScheduleEvent, ScheduleSummary } from './types';

export const defaultScheduleId = 'cronograma-01-ofimatica';
export const filterOptions = ['Todos', 'Prueba', 'Práctica', 'Proyecto', 'Virtual', 'Clase', 'Cierre'];
export const kindClass: Record<string, string> = {
  Prueba: 'danger',
  Proyecto: 'warning',
  Practica: 'success',
  Práctica: 'success',
  Virtual: 'link',
  Cierre: 'dark',
  Diagnostico: 'info',
  Diagnóstico: 'info',
  Clase: 'light',
};

const importantKinds = new Set(['Prueba', 'Proyecto', 'Practica', 'Práctica', 'Cierre']);

export function repairMojibake(value: unknown): unknown {
  if (typeof value === 'string') {
    if (!/[ÃÂ]/.test(value)) return value;
    try {
      const bytes = Uint8Array.from(value, character => character.charCodeAt(0));
      return new TextDecoder('utf-8').decode(bytes);
    } catch {
      return value;
    }
  }

  if (Array.isArray(value)) return value.map(repairMojibake);

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, child]) => [String(repairMojibake(key)), repairMojibake(child)]),
    );
  }

  return value;
}

export function normalizeText(value: string) {
  return value.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();
}

export function scheduleDisplayName(data: ScheduleData) {
  return data.course['NOMBRE DEL CURSO'] ?? data.course['Nombre del curso'] ?? 'Cronograma sin nombre';
}

export function formatCustomDate(value: string) {
  if (!value) return 'Fecha por definir';
  return new Intl.DateTimeFormat('es-CR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${value}T12:00:00Z`));
}

export function shortDateLabel(event: ScheduleEvent) {
  return event.dateLabel.split(' Feriado')[0];
}

export function filterEvents(events: ScheduleEvent[], filter: string, query: string) {
  const normalizedQuery = normalizeText(query.trim());

  return events
    .filter(event => filter === 'Todos' || event.kind === filter)
    .filter(event => {
      if (!normalizedQuery) return true;
      return normalizeText(`${event.topic} ${event.activity} ${event.type} ${event.resources}`).includes(normalizedQuery);
    })
    .sort((a, b) => a.start.localeCompare(b.start) || a.id.localeCompare(b.id));
}

export function buildSummary(events: ScheduleEvent[]): ScheduleSummary {
  const sorted = [...events].sort((a, b) => a.start.localeCompare(b.start));

  return {
    totalEvents: events.length,
    importantEvents: events.filter(event => importantKinds.has(event.kind)).length,
    customEvents: events.filter(event => event.custom).length,
    firstDate: sorted[0]?.start ?? '',
    lastDate: sorted.at(-1)?.end ?? '',
  };
}

export function validateImportedSchedule(value: unknown): ScheduleData {
  if (!value || typeof value !== 'object') throw new Error('El archivo no contiene un cronograma válido.');
  const candidate = value as Partial<ScheduleData>;
  if (!candidate.course || typeof candidate.course !== 'object') throw new Error('Falta la información del curso.');
  if (!Array.isArray(candidate.events)) throw new Error('Falta la lista de eventos.');

  return {
    source: candidate.source,
    generatedFrom: candidate.generatedFrom,
    course: candidate.course,
    evaluations: Array.isArray(candidate.evaluations) ? candidate.evaluations : [],
    events: candidate.events.map((event, index) => ({
      id: String(event.id ?? `event-${index + 1}`),
      session: event.session ?? null,
      dateLabel: String(event.dateLabel ?? 'Fecha por definir'),
      start: String(event.start ?? ''),
      end: String(event.end ?? event.start ?? ''),
      type: String(event.type ?? 'Presencial'),
      kind: String(event.kind ?? 'Clase'),
      topic: String(event.topic ?? 'Tema por definir'),
      activity: String(event.activity ?? 'Actividad por definir'),
      resources: String(event.resources ?? ''),
      holiday: String(event.holiday ?? ''),
      custom: Boolean(event.custom),
    })),
  };
}

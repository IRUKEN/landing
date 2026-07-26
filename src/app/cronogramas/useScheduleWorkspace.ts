import { FormEvent, useEffect, useMemo, useState } from 'react';
import type { ScheduleData, ScheduleEvent, ScheduleRecord } from './types';
import {
  buildSummary,
  defaultScheduleId,
  filterEvents,
  formatCustomDate,
  repairMojibake,
  scheduleDisplayName,
  validateImportedSchedule,
} from './schedule';

const assignedSchedulesKey = 'erni-cronogramas-assigned';
const customEventsKeyPrefix = 'erni-cronogramas-custom:';

type ScheduleManifest = {
  schedules: {
    id: string;
    name: string;
    code?: string;
    file: string;
  }[];
};

function customEventsKey(scheduleId: string) {
  return `${customEventsKeyPrefix}${scheduleId}`;
}

function readJson<T>(key: string, fallback: T): T {
  try {
    const saved = localStorage.getItem(key);
    return saved ? (JSON.parse(saved) as T) : fallback;
  } catch {
    return fallback;
  }
}

function prepareSlotData(data: ScheduleData, slotId: string, slotLabel: string): ScheduleData {
  return {
    ...data,
    course: { ...data.course, CRONOGRAMA: slotLabel },
    events: data.events.map(event => ({ ...event, id: `${slotId}-${event.id}` })),
  };
}

function scheduleLabel(code: string | undefined, name: string) {
  return code ? `${code} - ${name}` : name;
}

function createSchedules(defaultSchedules: ScheduleRecord[], assignedSchedules: Record<string, ScheduleData> = {}) {
  return defaultSchedules.map<ScheduleRecord>(schedule => {
    const data = assignedSchedules[schedule.id] ?? schedule.data;
    const baseLabel = schedule.slotLabel ?? schedule.name;
    return {
      ...schedule,
      name: scheduleDisplayName(data),
      readonly: true,
      assigned: Boolean(assignedSchedules[schedule.id]),
      slotLabel: baseLabel,
      data: prepareSlotData(data, schedule.id, baseLabel),
    };
  });
}

async function loadDefaultSchedules(): Promise<ScheduleRecord[]> {
  const manifest = (await fetch('/cronogramas/manifest.json').then(response => response.json())) as ScheduleManifest;

  return Promise.all(
    manifest.schedules.map(async entry => {
      const data = validateImportedSchedule(
        repairMojibake(await fetch(entry.file).then(response => response.json())),
      );
      const label = scheduleLabel(entry.code, entry.name);

      return {
        id: entry.id,
        name: scheduleDisplayName(data),
        readonly: true,
        assigned: false,
        slotLabel: label,
        data,
      };
    }),
  );
}

export function useScheduleWorkspace() {
  const [defaultSchedules, setDefaultSchedules] = useState<ScheduleRecord[]>([]);
  const [schedules, setSchedules] = useState<ScheduleRecord[]>([]);
  const [selectedScheduleId, setSelectedScheduleId] = useState('cronograma-01-ofimatica');
  const [customEvents, setCustomEvents] = useState<ScheduleEvent[]>([]);
  const [filter, setFilter] = useState('Todos');
  const [query, setQuery] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [importError, setImportError] = useState('');

  useEffect(() => {
    loadDefaultSchedules()
      .then(defaults => {
        const assigned = readJson<Record<string, ScheduleData>>(assignedSchedulesKey, {});
        setDefaultSchedules(defaults);
        setSchedules(createSchedules(defaults, assigned));
        setSelectedScheduleId(defaults[0]?.id ?? defaultScheduleId);
      })
      .catch(() => setImportError('No se pudieron cargar los cronogramas publicados.'));
  }, []);

  const activeSchedule = useMemo(
    () => schedules.find(schedule => schedule.id === selectedScheduleId) ?? schedules[0] ?? null,
    [schedules, selectedScheduleId],
  );

  useEffect(() => {
    if (!activeSchedule?.id) return;
    setCustomEvents(readJson<ScheduleEvent[]>(customEventsKey(activeSchedule.id), []));
  }, [activeSchedule?.id]);

  const allEvents = useMemo(
    () => [...(activeSchedule?.data.events ?? []), ...customEvents],
    [activeSchedule, customEvents],
  );
  const visibleEvents = useMemo(() => filterEvents(allEvents, filter, query), [allEvents, filter, query]);
  const summary = useMemo(() => buildSummary(allEvents), [allEvents]);

  const selectSchedule = (id: string) => {
    setSelectedScheduleId(id);
    setCustomEvents(readJson<ScheduleEvent[]>(customEventsKey(id), []));
  };

  const saveCustomEvent = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!activeSchedule) return;
    const form = new FormData(event.currentTarget);
    const start = String(form.get('date'));
    const next: ScheduleEvent = {
      id: `custom-${Date.now()}`,
      dateLabel: formatCustomDate(start),
      start,
      end: start,
      type: String(form.get('mode')),
      kind: String(form.get('kind')),
      topic: String(form.get('title')),
      activity: String(form.get('details')),
      resources: String(form.get('resources')),
      custom: true,
    };
    const updated = [...customEvents, next];
    setCustomEvents(updated);
    localStorage.setItem(customEventsKey(activeSchedule.id), JSON.stringify(updated));
    event.currentTarget.reset();
    setFormOpen(false);
  };

  const removeCustomEvent = (id: string) => {
    if (!activeSchedule) return;
    const updated = customEvents.filter(event => event.id !== id);
    setCustomEvents(updated);
    localStorage.setItem(customEventsKey(activeSchedule.id), JSON.stringify(updated));
  };

  const assignScheduleData = async (scheduleId: string, file: File) => {
    if (!defaultSchedules.length) return;
    setImportError('');

    try {
      const data = validateImportedSchedule(repairMojibake(JSON.parse(await file.text())));
      const assigned = readJson<Record<string, ScheduleData>>(assignedSchedulesKey, {});
      const updatedAssigned = { ...assigned, [scheduleId]: data };
      localStorage.setItem(assignedSchedulesKey, JSON.stringify(updatedAssigned));
      setSchedules(createSchedules(defaultSchedules, updatedAssigned));
      selectSchedule(scheduleId);
    } catch (error) {
      setImportError(error instanceof Error ? error.message : 'No se pudo asignar el cronograma.');
    }
  };

  const resetAssignedSchedule = (scheduleId: string) => {
    if (!defaultSchedules.length) return;
    const assigned = readJson<Record<string, ScheduleData>>(assignedSchedulesKey, {});
    delete assigned[scheduleId];
    localStorage.setItem(assignedSchedulesKey, JSON.stringify(assigned));
    localStorage.removeItem(customEventsKey(scheduleId));
    setSchedules(createSchedules(defaultSchedules, assigned));
    selectSchedule(scheduleId);
  };

  return {
    activeSchedule,
    assignScheduleData,
    customEvents,
    filter,
    formOpen,
    importError,
    query,
    removeCustomEvent,
    resetAssignedSchedule,
    saveCustomEvent,
    schedules,
    selectedScheduleId,
    setFilter,
    setFormOpen,
    setQuery,
    setSelectedScheduleId: selectSchedule,
    summary,
    visibleEvents,
  };
}

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
const scheduleSlots = [
  { id: defaultScheduleId, label: 'Cronograma 01' },
  { id: 'ofimatica-2026-02', label: 'Cronograma 02' },
  { id: 'ofimatica-2026-03', label: 'Cronograma 03' },
  { id: 'ofimatica-2026-04', label: 'Cronograma 04' },
  { id: 'ofimatica-2026-05', label: 'Cronograma 05' },
  { id: 'ofimatica-2026-06', label: 'Cronograma 06' },
];

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

function createSchedules(templateData: ScheduleData, assignedSchedules: Record<string, ScheduleData> = {}) {
  return scheduleSlots.map<ScheduleRecord>(slot => {
    const data = assignedSchedules[slot.id] ?? templateData;
    return {
      id: slot.id,
      name: `${slot.label} - ${scheduleDisplayName(data)}`,
      readonly: true,
      assigned: Boolean(assignedSchedules[slot.id]),
      slotLabel: slot.label,
      data: prepareSlotData(data, slot.id, slot.label),
    };
  });
}

export function useScheduleWorkspace() {
  const [templateData, setTemplateData] = useState<ScheduleData | null>(null);
  const [schedules, setSchedules] = useState<ScheduleRecord[]>([]);
  const [selectedScheduleId, setSelectedScheduleId] = useState(defaultScheduleId);
  const [customEvents, setCustomEvents] = useState<ScheduleEvent[]>([]);
  const [filter, setFilter] = useState('Todos');
  const [query, setQuery] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [importError, setImportError] = useState('');

  useEffect(() => {
    fetch('/cronogramas/events.json')
      .then(response => response.json())
      .then(raw => {
        const data = repairMojibake(raw) as ScheduleData;
        const assigned = readJson<Record<string, ScheduleData>>(assignedSchedulesKey, {});
        setTemplateData(data);
        setSchedules(createSchedules(data, assigned));
      })
      .catch(() => setImportError('No se pudo cargar el cronograma base.'));
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
    if (!templateData) return;
    setImportError('');

    try {
      const data = validateImportedSchedule(repairMojibake(JSON.parse(await file.text())));
      const assigned = readJson<Record<string, ScheduleData>>(assignedSchedulesKey, {});
      const updatedAssigned = { ...assigned, [scheduleId]: data };
      localStorage.setItem(assignedSchedulesKey, JSON.stringify(updatedAssigned));
      setSchedules(createSchedules(templateData, updatedAssigned));
      selectSchedule(scheduleId);
    } catch (error) {
      setImportError(error instanceof Error ? error.message : 'No se pudo asignar el cronograma.');
    }
  };

  const resetAssignedSchedule = (scheduleId: string) => {
    if (!templateData) return;
    const assigned = readJson<Record<string, ScheduleData>>(assignedSchedulesKey, {});
    delete assigned[scheduleId];
    localStorage.setItem(assignedSchedulesKey, JSON.stringify(assigned));
    localStorage.removeItem(customEventsKey(scheduleId));
    setSchedules(createSchedules(templateData, assigned));
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

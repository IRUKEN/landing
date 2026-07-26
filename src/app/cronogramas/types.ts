export type ScheduleEvent = {
  id: string;
  session?: number | null;
  dateLabel: string;
  start: string;
  end: string;
  type: string;
  kind: string;
  topic: string;
  activity: string;
  resources: string;
  holiday?: string;
  custom?: boolean;
};

export type ScheduleData = {
  source?: string;
  generatedFrom?: string;
  course: Record<string, string>;
  evaluations: { name: string; percentage: string }[];
  events: ScheduleEvent[];
};

export type ScheduleRecord = {
  id: string;
  name: string;
  data: ScheduleData;
  assigned?: boolean;
  readonly?: boolean;
  slotLabel?: string;
};

export type ScheduleSummary = {
  totalEvents: number;
  importantEvents: number;
  customEvents: number;
  firstDate: string;
  lastDate: string;
};

export interface CalendarEvent {
  title: string;
  endDate?: string;
  startDate: string;
  description?: string;
  _id: string;
}

export interface CreateCalendarEvent {
  title: string;
  endDate: string;
  startDate: string;
  description?: string;
}

interface CampersNotes {
  [key: string]: {
    [year: string]: string;
  };
}

export interface ICampEvent {
  camp_id: string;
  event: string;
  timestamp: string;
}

export interface ICreateCalendarEvent {
  title: string;
  date: Date | null;
}

export interface ICalendarEvent {
  camp_id: string;
  date: string;
  event: string;
  timestamp: string;
}

export interface ICamp {
  camp_id: string;
  tco?: string;
  tco_fullname: string;
  city: string;
  created_at?: number;
  camp_name?: string;
  camp_website?: string;
  updated_at?: number;
  camp_description: string;
  campers_notes?: CampersNotes;
}
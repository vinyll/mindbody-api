import type {
  Class,
  ClassDescription,
  Client,
  Course,
  Location,
  Staff,
} from './mindbody/types';
import type { Nullable } from './types';

export type ClassSchedules = {
  ClassSchedules: ClassSchedule[];
};

export type ClassSchedule = {
  Classes: Class[];
  Clients: Nullable<Client[]>;
  Course: Nullable<Course[]>;
  SemesterId: Nullable<number>;
  IsAvailable: boolean;
  Id: number;
  ClassDescription: ClassDescription;
  DaySunday: boolean;
  DayMonday: boolean;
  DayTuesday: boolean;
  DayWednesday: boolean;
  DayThursday: boolean;
  DayFriday: boolean;
  DaySaturday: boolean;
  AllowOpenEnrollment: boolean;
  AllowDateForwardEnrollment: boolean;
  StartTime: string;
  EndTime: string;
  StartDate: string;
  EndDate: string;
  Staff: Staff;
  Location: Location;
};

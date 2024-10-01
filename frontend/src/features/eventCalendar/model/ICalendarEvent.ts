import { Event } from "react-big-calendar";
import { IEvent } from "./IEvent";

export interface ICalendarEvent extends Event, IEvent {}

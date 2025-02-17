import { ErrorCode } from '../http/types/ErrorCode.ts'
import { PaginatedResponse } from '../http/types/PaginatedResponse.ts'
import { QueryParams } from '../http/types/QueryParams.ts'
import { RequestArgsGet, RequestArgsGetOptionalParams, RequestArgsPost } from '../http/types/RequestArgs.ts'

import { Class, Classes } from './types/Class.ts'
import { ClassDescriptions } from './types/ClassDescription.ts'
import { ClassSchedules } from './types/ClassSchedule.ts'
import { Courses } from './types/Course.ts'
import { Visit } from './types/Visit.ts'

import { MindbodyAPIClient } from '../http/MindbodyAPIClient.ts';
import {WaitlistEntries} from "./types/WaitlistEntry.ts"
import {Semesters} from "./types/Semester.ts"

const MINDBODY = MindbodyAPIClient.get();

// ========================
// GET /class/{endpoint}
// ========================

export type GetClassesQueryParams = QueryParams<{
  ClassDescriptionIds?: number[];
  ClassIds?: number[];
  ClassScheduleIds?: number[];
  StaffIds?: number[];
  StartDateTime?: string;
  EndDateTime?: string;
  ClientId?: string;
  Clients?: [];
  ProgramIds?: number[];
  SessionTypeIds?: number[];
  LocationIds?: number[];
  SemesterIds?: number[];
  HideCanceledClasses?: boolean;
  SchedulingWindow?: boolean;
  LastModifiedDate?: boolean;
}>;

/**
 * https://developers.mindbodyonline.com/PublicDocumentation/V6#class-endpoint
 */
async function getClasses(
  args: RequestArgsGetOptionalParams<GetClassesQueryParams>,
): Promise<PaginatedResponse<Classes>> {
  return await MINDBODY.getPaginated('/class/classes', {
    ...args,
    objectIndexKey: 'Classes',
  });
}

export type GetClassDescriptionsQueryParams = QueryParams<{
  ClassDescriptionId: number;
  ProgramIds?: number[];
  StartClassDateTime?: string;
  EndClassDateTime?: string;
  StaffId?: number;
  LocationId?: number;
}>;

/**
 * https://developers.mindbodyonline.com/PublicDocumentation/V6#get-class-descriptions
 */
async function getClassDescriptions(
  args: RequestArgsGet<GetClassDescriptionsQueryParams>,
): Promise<PaginatedResponse<ClassDescriptions>> {
  return await MINDBODY.getPaginated('/class/classdescriptions', {
    ...args,
    objectIndexKey: 'ClassDescriptions',
  });
}

export type GetClassSchedulesQueryParams = QueryParams<{
  ClassScheduleIds?: number[];
  LocationIds?: number[];
  SessionTypeIds?: number[];
  StaffIds?: number[];
  StartDate?: string;
  EndDate?: string;
}>;

/**
 * https://developers.mindbodyonline.com/PublicDocumentation/V6#get-class-schedules
 */
async function getClassSchedules(
  args: RequestArgsGetOptionalParams<GetClassSchedulesQueryParams>,
): Promise<PaginatedResponse<ClassSchedules>> {
  return await MINDBODY.getPaginated('/class/classschedules', {
    ...args,
    objectIndexKey: 'ClassSchedules',
  });
}

export type GetClassVisitsQueryParams = QueryParams<{
  ClassID: number;
  LastModifiedDate?: string;
}>;

/**
 * Returns a list of visits that contain information for a specified class.
 * On success, this request returns the class object in the response with a list of visits.
 *
 * https://developers.mindbodyonline.com/PublicDocumentation/V6#get-class-visit
 */
async function getClassVisits(
  args: RequestArgsGet<GetClassVisitsQueryParams>,
): Promise<{ Class: Class }> {
  return await MINDBODY.get('/class/classvisits', args);
}

export type GetCoursesQueryParams = QueryParams<{
  LocationIds?: number[];
  CourseIds?: number[];
  StaffIds?: number[];
  ProgramIds?: number[];
  SemesterIds?: number[];
  StartDate?: string;
  EndDate?: string;
}>;

/**
 * This endpoint will provide all the data related to courses depending on the access level.
 *
 * https://developers.mindbodyonline.com/PublicDocumentation/V6#get-courses
 */
async function getCourses(
  args: RequestArgsGetOptionalParams<GetCoursesQueryParams>,
): Promise<PaginatedResponse<Courses>> {
  return await MINDBODY.getPaginated('/class/courses', {
    ...args,
    objectIndexKey: 'Courses',
  });
}

export type GetWaitlistEntriesQueryParams = QueryParams<{
  ClassIds?: number[];
  ClassScheduleIds?: number[];
  ClientIds?: string[];
  HidePastEntries?: boolean;
  WaitlistEntryIds?: number[];
}>;

/**
 * Returns a list of waiting list entries for a specified class schedule or class.
 * The request requires staff credentials and either a class schedule ID or class ID.
 *
 * https://developers.mindbodyonline.com/PublicDocumentation/V6#get-wait-list-entries
 */
async function getWaitlistEntries(
  args: RequestArgsGetOptionalParams<GetWaitlistEntriesQueryParams>,
): Promise<PaginatedResponse<WaitlistEntries>> {
  return await MINDBODY.getPaginated('/class/waitlistentries', {
    ...args,
    objectIndexKey: 'WaitlistEntries',
  });
}

export type GetSemestersQueryParams = QueryParams<{
  StartDate?: string;
  EndDate?: string;
  Active?: boolean;
  SemesterIDs?: number[];
}>;

/**
 * This endpoint retrieves the business class semesters.
 *
 * https://developers.mindbodyonline.com/PublicDocumentation/V6#get-semesters
 */
async function getSemesters(
  args: RequestArgsGetOptionalParams<GetSemestersQueryParams>,
): Promise<PaginatedResponse<Semesters>> {
  return await MINDBODY.getPaginated('/class/semesters', {
    ...args,
    objectIndexKey: 'Semesters',
  });
}

// ========================
// POST /class/{endpoint}
// ========================

export type AddClientToClassPayload = {
  ClientId: string;
  ClassId: string;
  RequirePayment: boolean;
  Waitlist: boolean;
  SendEmail?: boolean;
  WaitlistEntryId?: number;
  ClientServiceId?: number;
  CrossRegionalBooking?: boolean;
  CrossRegionalBookingClientServiceSiteId?: number;
  Test?: boolean;
};

/**
 *
 * This endpoint adds a client to a class or to a class waiting list. To prevent
 * overbooking a class or booking outside the schedule windows set forth by the
 * business, it is necessary to first check the capacity level of the class
 * (‘MaxCapacity’ and 'TotalBooked’) and the 'IsAvailable’ parameter by running
 * the GetClasses REQUEST. It is helpful to use this endpoint in the following situations:
 *
 * - Use after calling GET Clients and GET Classes so that you are sure which
 *   client to book in which class.
 * - If adding a client to a class from a waiting list, use this call after
 *   you call GET WaitlistEntries and determine the ID of the waiting list
 *   from which you are moving the client.
 * - If adding a client to a class and using a pricing option that the client
 *   has already purchased, use this call after you call GET ClientServices to
 *   determine the ID of the pricing option that the client wants to use.
 *
 * If you add a client to a class and the client purchases a new pricing option,
 * use GET Services, GET Classes, and then POST CheckoutShoppingCart in place of this call.
 *
 * This endpoint also supports cross-regional class bookings. If you want to
 * perform a cross-regional class booking, set CrossRegionalBooking to true.
 * This endpoint also supports adding a user to a waiting list using a cross-regional
 * client pricing option (service). Cross-regional booking workflows do not support
 * client service scheduling restrictions.
 *
 * When performing a cross-regional class booking, this endpoint loops through
 * the sites that the client is associated with, looks for client pricing options
 * at each of those sites, and then uses the oldest client pricing option found.
 * If you know that a client has a client service at another site, you can specify
 * that site using the CrossRegionalBookingClientServiceSiteId query parameter.
 *
 * If you perform a cross-regional booking, two additional fields are included in
 * the SessionType object of the response:
 *
 * - SiteID, which specifies where the client service is coming from
 * - CrossRegionalBookingPerformed, a Boolean field that is set to true
 *
 * As a prerequisite to using this endpoint, your SourceName must have been granted
 * access to the organization to which the site belongs.
 *
 * https://developers.mindbodyonline.com/PublicDocumentation/V6#add-client-to-class
 */
async function addClientToClass(
  args: RequestArgsPost<AddClientToClassPayload>,
): Promise<{ Visit: Visit }> {
  return await MINDBODY.post('/class/addclienttoclass', args);
}

export type RemoveClientFromClassPayload = {
  ClientId: string;
  ClassId: string;
  LateCancel?: boolean;
  SendEmail?: boolean;
  Test?: boolean;
};

/**
 * https://developers.mindbodyonline.com/PublicDocumentation/V6#remove-client-from-class
 */
async function removeClientFromClass(
  args: RequestArgsPost<RemoveClientFromClassPayload>,
): Promise<{ Class: Class }> {
  return await MINDBODY.post('/class/removeclientfromclass', args);
}

export type RemoveClientsFromClassesPayload = {
  Details: {
    ClientIds: string[];
    ClassId: string;
  }[];
  LateCancel?: boolean;
  SendEmail?: boolean;
  Test?: boolean;
};

/**
 * https://developers.mindbodyonline.com/PublicDocumentation/V6#remove-clients-from-classes
 */
async function removeClientsFromClasses(
  args: RequestArgsPost<RemoveClientsFromClassesPayload>,
): Promise<Classes & { Errors: { Message: string; Code: ErrorCode }[] }> {
  return await MINDBODY.post('/class/removeclientsfromclasses', args);
}

export type RemoveFromWaitlistPayload = {
  WaitlistEntryIds: number[];
};

/**
 * This endpoint does not return a response. If a call to this endpoint results
 * in a 200 OK HTTP status code, then the call was successful.
 *
 * https://developers.mindbodyonline.com/PublicDocumentation/V6#remove-from-waitlist
 */
async function removeFromWaitlist(
  args: RequestArgsPost<RemoveFromWaitlistPayload>,
): Promise<void> {
  await MINDBODY.post('/class/removefromwaitlist', args);
}

export type SubstituteClassTeacherPayload = {
  ClassId: number;
  StaffId: number;
  OverrideConflicts?: boolean;
  SendClientEmail?: boolean;
  SendOriginalTeacherEmail?: boolean;
  SendSubstituteTeacherEmail?: boolean;
};

/**
 * https://developers.mindbodyonline.com/PublicDocumentation/V6#substitute-class-teacher
 */
async function substituteClassTeacher(
  args: RequestArgsPost<SubstituteClassTeacherPayload>,
): Promise<{ Class: Class }> {
  return await MINDBODY.post('/class/substituteclassteacher', args);
}

export type CancelSingleClassPayload = {
  ClassID: number;
  HideCancel?: boolean;
  SendClientEmail?: boolean;
  SendStaffEmail?: boolean;
};

/**
 * https://developers.mindbodyonline.com/PublicDocumentation/V6#cancel-single-class
 */
async function cancelSingleClass(
  args: RequestArgsPost<CancelSingleClassPayload>,
): Promise<{ Message: string }> {
  return await MINDBODY.post('/class/cancelsingleclass', args);
}

export default {
  getClasses,
  getClassDescriptions,
  getClassSchedules,
  getClassVisits,
  getCourses,
  getWaitlistEntries,
  getSemesters,
  addClientToClass,
  removeClientFromClass,
  removeClientsFromClasses,
  removeFromWaitlist,
  cancelSingleClass,
  substituteClassTeacher,
};

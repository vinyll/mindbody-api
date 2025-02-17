import {MindbodyAPIClient} from "../http/MindbodyAPIClient.ts"
import {QueryParams} from "../http/types/QueryParams.ts"
import {
  RequestArgsDelete,
  RequestArgsGet,
  RequestArgsGetOptionalParams,
  RequestArgsPost
} from "../http/types/RequestArgs.ts"
import {PaginatedResponse} from "../http/types/PaginatedResponse.ts"
import {AddOns} from "./types/AddOn.ts"
import {AppointmentOptions} from "./types/AppointmentOption.ts"
import {Availabilities} from "./types/Availability.ts"
import {Staff} from "./types/Staff.ts"
import {Appointment, Appointments} from "./types/Appointment.ts"


const mindbody = MindbodyAPIClient.get();

// ========================
// GET /appointment/{endpoint}
// ========================

export type GetActiveSessionTimesQueryParams = QueryParams<{
  ScheduleType?:
    | 'All'
    | 'Class'
    | 'Enrollment'
    | 'Appointment'
    | 'Resource'
    | 'Media'
    | 'Arrival';
  SessionTypeIds?: number[];
  StartTime?: string;
  EndTime?: string;
}>;

/**
 * This is not appointment availability but rather the active business hours for
 * studios and which increments services can be booked at.
 * See BookableItems for appointment availability.
 *
 * https://developers.mindbodyonline.com/PublicDocumentation/V6#appointment-endpoint
 */
async function getActiveSessionTimes(
  args: RequestArgsGetOptionalParams<GetActiveSessionTimesQueryParams>,
): Promise<PaginatedResponse<{ ActiveSessionTimes: string[] }>> {
  return await mindbody.getPaginated('/appointment/activesessiontimes', {
    ...args,
    objectIndexKey: 'ActiveSessionTimes',
  });
}

export type GetAppointmentAddOnsQueryParams = QueryParams<{
  StaffId?: string;
}>;

/**
 * Get active appointment add-ons.
 *
 * https://developers.mindbodyonline.com/PublicDocumentation/V6#get-appointment-add-ons
 */
async function getAppointmentAddOns(
  args: RequestArgsGetOptionalParams<GetAppointmentAddOnsQueryParams>,
): Promise<PaginatedResponse<AddOns>> {
  return await mindbody.getPaginated('/appointment/addons', {
    ...args,
    objectIndexKey: 'AddOnds',
  });
}

export type GetAppointmentAvailableDatesQueryParams = QueryParams<{
  SessionTypeId: string;
  LocationId?: number;
  StaffId?: number;
  StartDate?: string;
  EndDate?: string;
}>;

/**
 * Returns a list of dates to narrow down staff availability when booking. Dates
 * are those which staff are scheduled to work and do not guarantee booking
 * availabilities. After this call is made, use GET BookableItems to retrieve
 * availabilities for specific dates before booking.
 *
 * https://developers.mindbodyonline.com/PublicDocumentation/V6#get-appointment-available-dates
 */
async function getAppointmentAvailableDates(
  args: RequestArgsGet<GetAppointmentAvailableDatesQueryParams>,
): Promise<{ AvailableDates: string[] }> {
  return await mindbody.get('/appointment/availabledates', args);
}

/**
 * https://developers.mindbodyonline.com/PublicDocumentation/V6#get-appointment-options
 */
async function getAppointmentOptions(
  args: RequestArgsGetOptionalParams<never>,
): Promise<AppointmentOptions> {
  return await mindbody.get('/appointment/appointmentoptions', args);
}

export type GetBookableItemsQueryParams = QueryParams<{
  SessionTypeIds: number[];
  LocationIds?: number[];
  StaffIds?: number[];
  AppointmentId?: number;
  StartDate?: string;
  EndDate?: string;
}>;

/**
 * Returns a list of availabilities with the information needed to book appointments.
 * Availabilities include information such as the location and its amenities,
 * staff members, programs, and session types. Recommended to use with ActiveSessionTimes
 * to see which increments each business allows for booking appointments.
 *
 * https://developers.mindbodyonline.com/PublicDocumentation/V6#get-bookable-items
 */
async function getBookableItems(
  args: RequestArgsGet<GetBookableItemsQueryParams>,
): Promise<PaginatedResponse<Availabilities>> {
  return await mindbody.getPaginated('/appointment/bookableitems', {
    ...args,
    objectIndexKey: 'Availabilities',
  });
}

export type GetScheduleItemsQueryParams = QueryParams<{
  LocationIds?: number[];
  StaffIds?: number[];
  StartDate?: string;
  EndDate?: string;
  IgnorePrepFinishTimes?: boolean;
}>;

/**
 * Returns a list of schedule items, including appointments, availabilities, and
 * unavailabilities. Unavailabilities are the times at which appointments cannot
 * be booked, for example, on holidays or after hours when the business is closed.
 *
 * https://developers.mindbodyonline.com/PublicDocumentation/V6#get-schedule-items
 */
async function getScheduleItems(
  args: RequestArgsGetOptionalParams<GetScheduleItemsQueryParams>,
): Promise<PaginatedResponse<{ StaffMembers: Staff[] }>> {
  return await mindbody.getPaginated('/appointment/scheduleitems', {
    ...args,
    objectIndexKey: 'StaffMembers',
  });
}

export type GetStaffAppointmentsQueryParams = QueryParams<{
  AppointmentIds?: number[];
  LocationIds?: number[];
  StaffIds?: number[];
  StartDate?: string;
  EndDate?: string;
  ClientId?: string;
}>;

/**
 * Returns a list of appointments by staff member.
 *
 * https://developers.mindbodyonline.com/PublicDocumentation/V6#get-staff-appointments
 */
async function getStaffAppointments(
  args: RequestArgsGetOptionalParams<GetStaffAppointmentsQueryParams>,
): Promise<PaginatedResponse<Appointments>> {
  return await mindbody.getPaginated('/appointment/staffappointments', {
    ...args,
    objectIndexKey: 'Appointments',
  });
}

// ========================
// POST /appointment/{endpoint}
// ========================

export type AddAppointmentPayload = {
  ClientId: string;
  LocationId: number;
  SessionTypeId: number;
  StaffId: number;
  StartDateTime: string;
  EndDateTime?: string;
  ApplyPayment?: boolean;
  Duration?: number;
  Execute?: string;
  GenderPreference?: 'None' | 'Female' | 'Male';
  Notes?: string;
  ProviderId?: string;
  ResourceIds?: number[];
  SendEmail?: boolean;
  StaffRequested?: boolean;
  IsWaitlist?: boolean;
  Test?: boolean;
};

/**
 * A user token is required for this endpoint. To book an appointment, you must
 * use a location ID, staff ID, client ID, session type ID, and the StartDateTime
 * of the appointment. You can get most of this information using GET BookableItems.
 *
 * https://developers.mindbodyonline.com/PublicDocumentation/V6#add-appointment
 */
async function addAppointment(
  args: RequestArgsPost<AddAppointmentPayload>,
): Promise<{ Appointment: Appointment }> {
  return await mindbody.post('/appointment/addappointment', args);
}

export type AddAppointmentAddOnPayload = {
  AppointmentId: number;
  SessionTypeId: number;
  StaffId: number;
  ApplyPayment?: boolean;
  Test?: boolean;
};

/**
 * This endpoint books an add-on on top of an existing, regular appointment.
 * To book an add-on, you must use an existing appointment ID and session type ID.
 * You can get a session type ID using GET AppointmentAddOns.
 *
 * https://developers.mindbodyonline.com/PublicDocumentation/V6#add-appointment-addon
 */
async function addAppointmentAddOn(
  args: RequestArgsPost<AddAppointmentAddOnPayload>,
): Promise<{
  AppointmentId: number;
  AddOnAppointmentId: number;
}> {
  return await mindbody.post('/appointment/addappointmentaddon', args);
}

export type UpdateAppointmentPayload = {
  AppointmentId: number;
  Execute?: string;
  GenderPreference?: 'None' | 'Female' | 'Male';
  Notes?: string;
  ProviderId?: string;
  ResourceIds?: number[];
  SendEmail?: boolean;
  SessionTypeId?: number;
  StaffId?: number;
  StartDateTime?: string;
  EndDateTime?: string;
  Test?: boolean;
};



/**
 * To update the information for a specific appointment, you must have a staff user
 * token with the proper permissions. Note that you can only update the appointment’s
 * StartDateTime, EndDateTime, StaffId, Notes, and SessionTypeId.
 *
 * https://developers.mindbodyonline.com/PublicDocumentation/V6#update-appointment
 */
async function updateAppointment(
  args: RequestArgsPost<UpdateAppointmentPayload>,
): Promise<{ Appointment: Appointment }> {
  return await mindbody.post('/appointment/updateappointment', args);
}

export type AddAvailabilitiesPayload = {
  StaffIDs?: number[];
  IsUnavailable?: boolean;
  PublicDisplay?: 'Show' | 'Mask' | 'Hide';
  DaysOfWeek?: (
    | 'Sunday'
    | 'Monday'
    | 'Tuesday'
    | 'Wednesday'
    | 'Thursday'
    | 'Friday'
    | 'Saturday'
  )[];
  LocationID?: number;
  ProgramIDs?: number[];
  StartDateTime?: string;
  EndDateTime?: string;
  UnavailableDescription?: string;
  Test?: boolean;
};

/**
 * Add availabilities and unavailabilities for a staff member.
 *
 * https://developers.mindbodyonline.com/PublicDocumentation/V6#add-availabilities
 */
async function addAvailabilities(
  args: RequestArgsPost<AddAvailabilitiesPayload>,
): Promise<{ StaffMembers: Staff[] }> {
  return await mindbody.post('/appointment/availabilities', args);
}

// ========================
// PUT /appointment/{endpoint}
// ========================

export type UpdateAvailabilitiesPayload = {
  AvailabilityIds: number[];
  PublicDisplay?: 'Show' | 'Mask' | 'Hide';
  DaysOfWeek?: (
    | 'Sunday'
    | 'Monday'
    | 'Tuesday'
    | 'Wednesday'
    | 'Thursday'
    | 'Friday'
    | 'Saturday'
  )[];
  LocationID?: number;
  ProgramIDs?: number[];
  StartDateTime?: string;
  EndDateTime?: string;
  UnavailableDescription?: string;
  Test?: boolean;
};

/**
 * Add availabilities and unavailabilities for a staff member.
 *
 * https://developers.mindbodyonline.com/PublicDocumentation/V6#add-availabilities
 */
async function updateAvailabilities(
  args: RequestArgsPost<UpdateAvailabilitiesPayload>,
): Promise<{ StaffMembers: Staff[] }> {
  return await mindbody.put('/appointment/availabilities', args);
}

// ========================
// DELETE /appointment/{endpoint}
// ========================

export type DeleteAppointmentAddOnQueryParams = {
  Id: number;
};

/**
 * This endpoint can be used to early-cancel a booked appointment add-on.
 * This endpoint does not return a response. If a call to this endpoint results
 * in a 204 No Content HTTP status code, then the call was successful.
 *
 * https://developers.mindbodyonline.com/PublicDocumentation/V6#delete-appointment-addon
 */
async function deleteAppointmentAddOn(
  args: RequestArgsDelete<DeleteAppointmentAddOnQueryParams>,
): Promise<void> {
  await mindbody.delete('/appointment/deleteappointmentaddon', args);
}

export type DeleteAvailabilityQueryParams = {
  AvailabilityId: number;
  Test?: boolean;
};

/**
 * This endpoint deletes the availability or unavailability.
 * This endpoint does not return a response. If a call to this endpoint results
 * in a 204 No Content HTTP status code, then the call was successful.
 *
 * https://developers.mindbodyonline.com/PublicDocumentation/V6#delete-availability
 */
async function deleteAvailability(
  args: RequestArgsDelete<DeleteAvailabilityQueryParams>,
): Promise<void> {
  await mindbody.delete('/appointment/availability', args);
}

export type RemoveFromAppointmentWaitlistQueryParams = {
  AvailabilityId: number;
  Test?: boolean;
};

/**
 * This endpoint does not return a response. If a call to this endpoint results
 * in a 204 No Content HTTP status code, then the call was successful.
 *
 * https://developers.mindbodyonline.com/PublicDocumentation/V6#remove-from-appointment-waitlist
 */
async function removeFromAppointmentWaitlist(
  args: RequestArgsDelete<RemoveFromAppointmentWaitlistQueryParams>,
): Promise<void> {
  await mindbody.delete('/appointment/removefromappointmentwaitlist', args);
}

export default {
  getActiveSessionTimes,
  getAppointmentAddOns,
  getAppointmentAvailableDates,
  getAppointmentOptions,
  getBookableItems,
  getStaffAppointments,
  getScheduleItems,
  addAppointment,
  addAppointmentAddOn,
  addAvailabilities,
  updateAppointment,
  updateAvailabilities,
  deleteAvailability,
  deleteAppointmentAddOn,
  removeFromAppointmentWaitlist,
};

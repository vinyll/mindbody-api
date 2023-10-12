import type * as Http from './http/types';
import type * as MBType from './mindbody/types';
import type * as MBWebhookType from './webhooks/types';

import Appointment from './mindbody/Appointment.ts';
import Class from './mindbody/Class.ts';
import Client from './mindbody/Client.ts';
import Config from './Config.ts';
import Enrollment from './mindbody/Enrollment.ts';
import MindbodyError from './http/MindbodyError.ts';
import Payroll from './mindbody/Payroll.ts';
import Sale from './mindbody/Sale.ts';
import Site from './mindbody/Site.ts';
import Staff from './mindbody/Staff.ts';
import Webhooks from './webhooks';

const exports = {
  Appointment,
  Class,
  Client,
  Config,
  Enrollment,
  MindbodyError,
  Payroll,
  Sale,
  Site,
  Staff,
  Webhooks,
};

export type { MBType, MBWebhookType, Http };
export default exports;
export {
  Appointment,
  Class,
  Client,
  Config,
  Enrollment,
  MindbodyError,
  Payroll,
  Sale,
  Site,
  Staff,
  Webhooks,
};

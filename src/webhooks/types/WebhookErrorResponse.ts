import type { WebhookErrorCode } from './WebhookErrorCode.ts';

export type WebhookErrorResponse = {
  errors: {
    errorCode: number;
    errorType: WebhookErrorCode;
    errorMessage: string;
  }[];
};

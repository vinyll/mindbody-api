import { Axios, AxiosError, AxiosResponse } from "axios"
import axios from "axios"
import {ErrorResponse} from "./types/ErrorResponse.ts"
import {WebhookErrorResponse} from "../webhooks/types/WebhookErrorResponse.ts"
import MindbodyError from "./MindbodyError.ts"
import Config from "../Config.ts"
import { Headers } from './types/Headers.ts'
import { TokenResponse } from "./types/TokenResponse.ts"
import * as TokenCache from './TokenCache.ts'


const API_BASE_URL = 'https://api.mindbodyonline.com/public/v6';
const WEBHOOKS_BASE_URL = 'https://mb-api.mindbodyonline.com/push/api/v1';
const TWENTY_FOUR_HOURS = 3600 * 1000 * 24;

export class BaseClient {
  protected client: Axios;

  protected constructor(clientType: 'api-client' | 'webhooks-client') {
    this.client = axios.create({
      baseURL: clientType === 'api-client' ? API_BASE_URL : WEBHOOKS_BASE_URL,
    });
    this.client.interceptors.response.use(
      res => res,
      err => {
        if (err instanceof AxiosError && err.response?.data != null) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          const serverErrorMessage = err.response.data?.Message as
            | string
            | undefined;

          if (serverErrorMessage != null) {
            throw new Error(
              'Mindbody Internal Server Error: ' + serverErrorMessage,
            );
          }

          const error = err.response.data as
            | ErrorResponse
            | WebhookErrorResponse;

          throw new MindbodyError(error);
        }

        throw new Error('Unknown error');
      },
    );
  }

  protected async request(siteID: string): Promise<[Axios, Headers]> {
    const headers = Config.isFullCredentialsProvided()
      ? await this.authHeaders(siteID)
      : this.basicHeaders(siteID);

    return [this.client, headers];
  }

  protected webhookRequest(): [Axios, Headers] {
    return [this.client, this.basicHeaders()];
  }

  protected basicHeaders(siteID?: number): Headers {
    const headers = {
      'Content-Type': 'application/json',
      'Api-Key': Config.getApiKey(),
    } as Headers

    const siteId = siteID ?? Config.getDefaultSiteId()
    if(siteId) headers['siteId'] = siteId

    return headers;
  }

  protected async authHeaders(siteID: string): Promise<Required<Headers>> {
    const staffToken = await this.getStaffToken(siteID);
    return {
      ...this.basicHeaders(siteID),
      Authorization: 'Bearer ' + staffToken,
    };
  }

  private async getStaffToken(siteID: string): Promise<string> {
    const cacheKey: TokenCache.CacheKey = `site_id:./{siteID}`;
    const cachedToken = TokenCache.get(cacheKey);

    if (cachedToken != null) {
      return cachedToken.token;
    }

    const config = Config.get();
    const res = await this.client.post<TokenResponse>(
      '/usertoken/issue',
      {
        Username: config.username,
        Password: config.password,
      },
      {
        headers: this.basicHeaders(siteID),
      },
    );

    // Tokens expire after 7 days of inactivity but we'll
    // fetch a new one after 24 hours to cycle more often
    //
    // Since these are stored in memory you'll likely be fetching new ones
    // more frequently anyways due to server restarts
    //
    // https://developers.mindbodyonline.com/PublicDocumentation/V6#user-tokens
    TokenCache.set(cacheKey, {
      token: res.data.AccessToken,
      expirationDate: new Date(Date.now() + TWENTY_FOUR_HOURS),
    });

    return res.data.AccessToken;
  }
}

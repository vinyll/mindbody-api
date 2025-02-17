import {BaseClient} from "./BaseClient.ts"
import {Kv} from "./types/Kv.ts"
import {RequestArgsDelete, RequestArgsGet, RequestArgsGetOptionalParams, RequestArgsPost} from "./types/RequestArgs.ts"
import {PaginatedResponse} from "./types/PaginatedResponse.ts"
import {autoPager} from "./autoPager.ts"

export type Returnable = Kv | (string | number)[];

export class MindbodyAPIClient extends BaseClient {
  private static instance?: MindbodyAPIClient = new this();

  private constructor() {
    super('api-client');
  }

  public static get(): MindbodyAPIClient {
    return this.instance ?? (this.instance = new this());
  }

  public async get<R extends Returnable>(
    endpoint: string,
    args: RequestArgsGet<Kv> | RequestArgsGetOptionalParams<Kv>,
  ): Promise<R> {
    const [client, headers] = await this.request(args.siteID);
    const res = await client<R>(endpoint, {
      method: 'GET',
      headers,
      params: args.params,
    });

    return res.data;
  }

  public async getPaginated<R extends Returnable>(
    endpoint: string,
    args: (RequestArgsGet<Kv> | RequestArgsGetOptionalParams<Kv>) & {
      objectIndexKey: string;
    },
  ): Promise<PaginatedResponse<R>> {
    const [client, headers] = await this.request(args.siteID);
    const res = await client<PaginatedResponse<R>>(endpoint, {
      method: 'GET',
      headers,
      params: args.params,
    });

    if (args.autoPaginate) {
      return await autoPager({
        client: client,
        endpoint: endpoint,
        headers: headers,
        firstPage: res.data,
        objectIndexKey: args.objectIndexKey,
        params: args.params
      });
    }

    return res.data;
  }

  public async post<R extends Returnable>(
    endpoint: string,
    args: RequestArgsPost<Kv>,
  ): Promise<R> {
    const [client, headers] = await this.request(args.siteID);
    const res = await client<R>(endpoint, {
      method: 'POST',
      headers,
      data: args.payload,
    });

    return res.data;
  }

  public async put<R extends Returnable>(
    endpoint: string,
    args: RequestArgsPost<Kv>,
  ): Promise<R> {
    const [client, headers] = await this.request(args.siteID);
    const res = await client<R>(endpoint, {
      method: 'PUT',
      headers,
      data: args.payload,
    });

    return res.data;
  }

  /**
   * Mindbody does not return a response on DELETE requests. This method
   * returns a boolean if Mindbody responds to a DELETE request with a 204 status code.
   */
  public async delete(
    endpoint: string,
    args: RequestArgsDelete<Kv>,
  ): Promise<boolean> {
    const [client, headers] = await this.request(args.siteID);
    const res = await client.delete(endpoint, {
      method: 'DELETE',
      headers,
      params: args.params,
    });

    return res.status === 204;
  }
}

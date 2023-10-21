import { Client, cacheExchange, fetchExchange } from '@urql/core';
import { Variables } from 'graphql-request/src/types';

export class Requests {
  private readonly FLY_API_HOST = 'https://api.fly.io/graphql';
  private readonly FLY_PLAIN_API_HOST = 'https://api.machines.dev';
  private client: Client;

  constructor(private readonly apiKey: string) {
    this.client = new Client({
      url: this.FLY_API_HOST,
      exchanges: [cacheExchange, fetchExchange],
      fetchOptions: () => {
        return {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
          },
        }
      },
    });
  }

  public async query<T>(body: any, variables: Variables): Promise<T> {
    const result = await this.client.query(body, variables).toPromise();
    return result.data as T;
  }

  public async plainQuery<T>(path: string, body: any, returnAsText: boolean): Promise<any> {
    const result = await fetch(`${this.FLY_PLAIN_API_HOST}${path}`, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      method: 'POST',
    });

    return {
      status: result.status,
      result: returnAsText ? await result.text() : await result.json(),
    };
  }

  public async plainDeleteQuery<T>(path: string, body: any, returnAsText: boolean): Promise<any> {
    const result = await fetch(`${this.FLY_PLAIN_API_HOST}${path}`, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      method: 'DELETE',
    });

    return {
      status: result.status,
      result: returnAsText ? await result.text() : await result.json(),
    };
  }
}
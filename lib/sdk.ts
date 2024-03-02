import { Requests } from './requests';
import { CreateApplication } from './dtos/create-machine.dto';
import { CreateAppDto } from './dtos/create-app.dto';
import { CreatedApp } from './responses/created-instance.response';
import { AppDetails } from './responses/app-details';
import { Ok } from './responses/ok';
import { WaitUntilStateDto } from './dtos/wait-until-state.dto';

export class FlyMachinesSDK {
  private client: Requests;

  constructor(
    private readonly apiKey: string,
    private readonly orgSlug: string,
  ) {
    if (this.apiKey === '') {
      console.debug('API Key is not provided. Trying to read from ENV ($FLY_API_TOKEN)')
      this.apiKey = process.env.FLY_API_TOKEN;
    }

    if (this.apiKey === '') {
      throw new Error('api_key_cant_be_empty');
    }

    if (this.orgSlug === '') {
      throw new Error('org_slug_cant_be_empty');
    }

    this.client = new Requests(this.apiKey);
  }

  public async getMachinesForApp(appName: string): Promise<any> {
    const QUERY = `
        query getMachinesForTheApp ($appId: String!) {
            machines (state: "started", appId: $appId){
                totalCount,
                nodes {
                    state,
                    name,
                    app {
                        id,
                        name
                    }
                }
            }
        }
    `;

    return this.client.query(QUERY, {appId: appName});
  }

  async getApplicationDetails(appName: string): Promise<AppDetails> {
    const QUERY = `
       query getAppDetails ($appId: String!) {
          app(name: $appId) {
            hostname,
            deployed,
            state,
            machines {
              nodes {
                instanceId,
                id
              }
            },
            config {
              services {
                internalPort
              }
            }
          }
      }`;

    return this.client.query<AppDetails>(QUERY, {appId: appName});
  }

  async deleteApplication(name: string): Promise<boolean> {
    const result = await this.client.plainDeleteQuery(`/v1/apps/${name}`, null, true);
    return result.status === 202;
  }

  async stopApplicationInstance(appName: string, instanceId: string): Promise<Ok> {
    return this.client.plainQuery(`/v1/apps/${appName}/machines/${instanceId}/stop`, null, false);
  }

  async startApplicationInstance(appName: string, instanceId: string): Promise<Ok> {
    return this.client.plainQuery(`/v1/apps/${appName}/machines/${instanceId}/start`, null, false);
  }

  async waitUntilState(params: WaitUntilStateDto): Promise<Ok> {
    return this.client.plainQuery(`/v1/apps/${params.appName}/machines/${params.machineId}/wait?instance_id=${params.machineInstanceId}&state=${params.desiredState}`, null, false);
  }

  async createApplicationOnMachine(dto: CreateApplication): Promise<CreatedApp> {
    const appDto: CreateAppDto = {
      app_name: dto.name,
      org_slug: this.orgSlug,
    }
    const application = await this.client.plainQuery('/v1/apps', appDto, true);
    if (application.status !== 201) {
      console.error(application.result);
      throw new Error('failed_to_create_instance');
    }

    return this.client.plainQuery(`/v1/apps/${dto.name}/machines`, dto, false);
  }
}
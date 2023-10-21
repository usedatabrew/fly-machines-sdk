## Fly.IO Machines SDK for Node.JS

!(FlyDocs Image)[./images/fly.png]

### Install package

```shell
npm i fly-machines-sdk
```

### Init SDK

Get Fly.io API Token

```shell
export FLY_TOKEN=$(fly auth token)
```

```ts
import { FlyMachinesSDK } from 'fly-machines-sdk';

const apiKey = process.env.FLY_TOKEN;
const orgSlug = 'personal';

const sdk = new FlyMachinesSDK(apikey, orgSlug);
```

### Create new application
Since fly.io migrated to app v2 each application should have a machine
But two requests will be executed. 
1. Create application
2. Assign machine with the application

```ts
await sdk.createApplicationOnMachine({ name: 'app_name', config: {} });
```


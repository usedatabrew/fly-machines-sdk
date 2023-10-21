export interface AppDetails {
  app: App;
}

export interface App {
  hostname: string;
  deployed: boolean;
  state:    string;
  config:   Config;
  machines: Machines;
}

export interface Config {
  services: Service[];
}

export interface Service {
  internalPort: number;
}

export interface Machines {
  nodes: Node[];
}

export interface Node {
  instanceId: string;
  id: string;
}

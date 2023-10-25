export interface CreateApplication {
  name: string
  config: Config
}

export interface Config {
  image: string
  region: string
  env: any
  services: Service[]
  checks: Checks
  size?: string;
  guest?: {
    cpus: number,
    memory_mb: number,
    cpu_kind: 'shared' | 'performance',
    kernel_args?: string[],
  }
}

export interface Service {
  ports: Port[]
  protocol: string
  internal_port: number
}

export interface Port {
  port: number
  handlers: string[]
}

export interface Checks {
  httpget: Httpget
}

export interface Httpget {
  type: string
  port: number
  method: string
  path: string
  interval: string
  timeout: string
}

export interface CreatedApp {
  id:          string;
  name:        string;
  state:       string;
  region:      string;
  instance_id: string;
  private_ip:  string;
  config:      Config;
}

export interface Config {
  env:        Env;
  init:       Init;
  image:      string;
  metadata:   null;
  restart:    Restart;
  services:   Service[];
  guest:      Guest;
  checks:     Checks;
  image_ref:  ImageRef;
  created_at: Date;
}

export interface Checks {
  httpget: Httpget;
}

export interface Httpget {
  type:     string;
  port:     number;
  interval: string;
  timeout:  string;
  method:   string;
  path:     string;
}

export interface Env {
  APP_ENV: string;
}

export interface Guest {
  cpu_kind:  string;
  cpus:      number;
  memory_mb: number;
}

export interface ImageRef {
  registry:   string;
  repository: string;
  tag:        string;
  digest:     string;
}

export interface Init {
  exec:       null;
  entrypoint: null;
  cmd:        null;
  tty:        boolean;
}

export interface Restart {
  policy: string;
}

export interface Service {
  internal_port: number;
  ports:         Port[];
  protocol:      string;
}

export interface Port {
  handlers: string[];
  port:     number;
}

export interface WaitUntilStateDto {
  appName: string;
  machineId: string;
  machineInstanceId: string;
  desiredState: 'created' | 'starting' | 'started' | 'stopping' | 'stopped' | 'replacing' | 'destroying' | 'destroyed';
}

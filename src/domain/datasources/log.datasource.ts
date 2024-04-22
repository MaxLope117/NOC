import { LogEntity, LogSeverityLevel } from '../entities';

//* abstract impide la generación de instancias de la clase
export abstract class LogDatasource {
  abstract saveLog(log: LogEntity): Promise<void>;
  abstract getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]>;
}

import { LogEntity, LogSeverityLevel } from '../entities';

//* abstract impide la generación de instancias de la clase
/**
 ** El repository es quién llama el datasource.
 */
export abstract class LogRepository {

    abstract saveLog(log: LogEntity): Promise<void>;
    abstract getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]>;

}
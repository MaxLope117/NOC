import {
  LogDatasource,
  LogEntity,
  LogRepository,
  LogSeverityLevel,
} from '../../domain';

export class LogRepositoryImpl implements LogRepository {
  // private logDatasource: LogDatasource;
  constructor(private readonly logDatasource: LogDatasource) {}

  async saveLog(log: LogEntity): Promise<void> {
    return this.logDatasource.saveLog(log);
  }
  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    return this.logDatasource.getLogs(severityLevel);
  }
}

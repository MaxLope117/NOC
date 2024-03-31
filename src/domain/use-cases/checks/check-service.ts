import { LogEntity, LogSeverityLevel } from '../../entities';
import { LogRepository } from '../../repository';

interface CheckServiceUseCase {
    execute(url: string): Promise<boolean>;
}

type SuccessCallback = (() => void) | undefined;
type ErrorCallback = ((error:string) => void) | undefined;

//* No es un proveedor de información es un servicio.
export class CheckService implements CheckServiceUseCase {

    constructor(
        private readonly logRepository: LogRepository,
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback,
    ) {}

    async execute(url: string): Promise<boolean> {

        try {
            
            const req = await fetch(url);
            if (!req.ok) {
                throw new Error(`Error on check service ${url}`);
            }

            const log = new LogEntity(`Service ${url} working`, LogSeverityLevel.low);
            this.logRepository.saveLog(log);

            this.successCallback && this.successCallback();

            return true;
            
        } catch (error) {
            
            const errorMessage = `${url} is not OK - ${error}`;
            const log = new LogEntity(errorMessage, LogSeverityLevel.high)
            this.logRepository.saveLog(log);
            
            this.errorCallback && this.errorCallback(`${error}`)

            return false;

        }

    }

}

export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high',
}

export interface LogEntityOptions {
    level: LogSeverityLevel; // Enum
    message: string;
    origin: string; // archivo
    createdAt?: Date;
}

export class LogEntity {

    public level: LogSeverityLevel; // Enum
    public message: string;
    public createdAt: Date;
    public origin: string; // archivo

    constructor(options: LogEntityOptions) {
        const { message, level, origin, createdAt = new Date() } = options;
        this.message = message;
        this.level = level;
        this.origin = origin;
        this.createdAt = createdAt;
    }

    //* static - No se necesita instanciar la clase para utilizar el método (factory constructor).
    //? {"level": "high", "messsage": "Database OFF", "createdAt": "1265423485"}
    static fromJson = (json: string): LogEntity => {

        const { message, level, createdAt, origin } = JSON.parse(json);

        if (!message) throw new Error('Message - Is required');
        if (!level) throw new Error('Severity level - Is required');
        if (!createdAt) throw new Error('Created At - Is required');

        const log = new LogEntity({message, level, createdAt, origin});
        log.createdAt = new Date(createdAt);

        return log;

    }
    
}
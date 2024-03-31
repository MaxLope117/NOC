
export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high',
}

export class LogEntity {

    public level: LogSeverityLevel; // Enum
    public message: string;
    public createdAt: Date;

    constructor(
        message: string, level: LogSeverityLevel
    ) {
        this.message = message;
        this.level = level;
        this.createdAt = new Date();
    }

    //* No se necesita instanciar la clase para utilizar el método (factory constructor).
    //? {"level": "high", "messsage": "Database OFF", "createdAt": "1265423485"}
    static fromJson = (json: string): LogEntity => {

        const { message, level, createdAt } = JSON.parse(json);

        if (!message) throw new Error('Message - Is required');
        if (!level) throw new Error('Severity level - Is required');
        if (!createdAt) throw new Error('Created At - Is required');

        const log = new LogEntity(message, level);
        log.createdAt = new Date(createdAt);

        return log;

    }
    
}
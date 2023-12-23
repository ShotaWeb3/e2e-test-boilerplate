import * as winston from 'winston';


export default class LocalLogger {
    private logger: winston.Logger;

    constructor() {
        this.logger = winston.createLogger({
            level: process.env.LOG_LEVEL || 'info',
            format: winston.format.simple(),
            transports: [
              new winston.transports.Console()
            ]
        });
    }

    /**
     * infoログを出力
     * @param message 
     */
    public info(message: string): void {
        this.logger.info(message);
    }

    /**
     * errorログを出力
     * @param message 
     * @param e 
     */
    public error(message: string, e: unknown): void {
        this.logger.error(message, e);
    }
}

import winston from 'winston';

const prettyPrintFormat = winston.format.printf(({ level, message, timestamp }) => {
    const timestampWidth =22;
    const levelWidth = 22;

    const formattedTimestamp = timestamp.padEnd(timestampWidth, ' ');
    const formattedLevel = `[${level}]`.padEnd(levelWidth, ' ');
    return `${formattedTimestamp}${formattedLevel}${message}`;
});

// Custom Logger class
class CustomLogger {
    private logger: winston.Logger;

    constructor() {
        this.logger = winston.createLogger({
            format: winston.format.combine(
                winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                winston.format.colorize(),
                prettyPrintFormat
            ),
            transports: [
                new winston.transports.Console(),
            ],
            levels: {
                Database: 0,
                Express: 1,
                HTTP: 1,
                HTTPS: 1,
                Success: 1,
                transaction: 2,
                Mailer: 2,
                error: 3,
                warn: 4,
                info: 5,
                verbose: 6,
                debug: 3,
                silly: 8,
            },
        });

        // Set the colors for each log level
        winston.addColors({
            Database: 'magenta',
            Success: 'green',
            HTTPS: 'blue',
            Mailer: 'yellow',
            transaction: 'blue',
            error: 'red',
            warn: 'yellow',
            info: 'white',
            verbose: 'cyan',
            debug: 'gray',
            silly: 'gray',
            HTTP: 'cyan',
            Express: 'green',
        });
    }

    // Custom log methods
    mailer(message: string) {
        return this.logger.log('Mailer', message);
    }
    http(message: string) {
        return this.logger.log('HTTP', message);
    }
    https(message: string) {
        return this.logger.log('HTTPS', message);
    }
    express(message: string) {
        return this.logger.log('Express', message);
    }
    database(message: string) {
        return this.logger.log('Database', message);
    }

    success(message: string) {
        return this.logger.log('Success', message);
    }

    transaction(message: string) {
        return this.logger.log('transaction', message);
    }

    // Default log methods
    error(message: string) {
        return this.logger.log('error', message);
    }

    warn(message: string) {
        return this.logger.log('warn', message);
    }

    info(message: string) {
        return this.logger.log('info', message);
    }

    verbose(message: string) {
        return this.logger.log('verbose', message);
    }

    debug(message: string) {
        return this.logger.log('debug', message);
    }

    silly(message: string) {
        return this.logger.log('silly', message);
    }

    // Additional methods as required
}

// Create and export the logger instance
const logger = new CustomLogger();
export default logger;
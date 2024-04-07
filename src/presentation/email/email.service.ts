import nodemailer from 'nodemailer';
import { envs } from '../../config';
import { LogEntity, LogRepository, LogSeverityLevel } from '../../domain';

interface SendMailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachments?: Attachment[];
}

interface Attachment {
    filename: string;
    path: string;
}

export class EmailService {
    private trasporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_KEY,
        }
    });

    constructor(
        private readonly logRepository: LogRepository,
    ) {}

    async sendEmail(options: SendMailOptions): Promise<boolean> {

        const { to, subject, htmlBody, attachments = [] } = options;

        try {

            const sendInformation = await this.trasporter.sendMail({
                to,
                from: 'maxlope.cursos@gmail.com',
                subject,
                html: htmlBody,
                attachments,
            });
            // console.log(sendInformation);

            const log = new LogEntity({
                level: LogSeverityLevel.medium,
                message: 'Email Sent',
                origin: 'email.service.ts',
            });

            this.logRepository.saveLog(log);

            return true;
            
        } catch (error) {

            const log = new LogEntity({
                level: LogSeverityLevel.high,
                message: 'Email not Sent',
                origin: 'email.service.ts',
            });

            this.logRepository.saveLog(log);

            return false;
            
        }

    }

    async sendEmailWithFileSystemLogs(to: string | string[]) : Promise<boolean> {
        const subject = 'Logs del servidor';
        const htmlBody = `
        <html>
            <body>
                <h1>Logs de sistema - NOC</h1>
                <p>Duis proident ad consequat voluptate anim reprehenderit et.</<p>
                <p>Ver logs adjuntos</<p>
            </body>
            <style>
                html {
                    background-color: #aaa7cc;
                }
                h1 {
                    font-size: 4.2rem;
                }
                p {
                    font-size: 2rem;
                }
                h1, p {
                    color: black;
                }
            </<style>
        </html>
        `;

        const attachments: Attachment[] = [
            { filename: 'logs-all.log', path: './logs/logs-all.log' },
            { filename: 'logs-high.log', path: './logs/logs-high.log' },
            { filename: 'logs-low.log', path: './logs/logs-low.log' },
            { filename: 'logs-medium.log', path: './logs/logs-medium.log' },
        ]

        return this.sendEmail({
            to, subject, attachments, htmlBody
        });
    }
}
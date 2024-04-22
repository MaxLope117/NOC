import { SendEmailLogs } from '../domain';
import { FileSystemDatasource, LogRepositoryImpl } from '../infrastructure';
import { EmailService } from './email';

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource(),
  // new postfresSQLLogDatasource(),
  // new mongoLogDatasource(),
);

const emailService = new EmailService();

export class Server {
  public static start() {
    console.log('\n=====================================');
    console.log('\tServer started...');
    console.log('=====================================\n');

    //* Send email
    new SendEmailLogs(emailService, fileSystemLogRepository)
      .execute(['lopemax11.7@gmail.com'])
      .catch((error) => {
        console.log(error);
      });

    // console.log(envs.MAILER_EMAIL, envs.MAILER_KEY);
    // const emailService = new EmailService(
    //     fileSystemLogRepository,
    // );
    // emailService.sendEmailWithFileSystemLogs(['lopemax11.7@gmail.com', 'maxlope@outlook.com']);
    // emailService.sendEmail({
    //     to: 'lopemax11.7@gmail.com',
    //     subject: 'Logs de sistema',
    //     htmlBody: `
    //         <h3>Logs de Sistema - NOC</h3>
    //         <p>Ullamco officia aliqua nostrud qui in culpa minim amet fugiat.</p>
    //         <p>Ver logs adjuntos</p>

    //     `
    // });

    //* Cron Service
    // CronService.createJob(
    //     '*/10 * * * * *',
    //     () => {
    //         const url = 'https://google.com';
    //         // const url = 'http://localhost:3000/';
    //         new CheckService(
    //             fileSystemLogRepository,
    //             () => console.log(`${url} - Is OK`), //* O 'undefined'
    //             (error) => console.error(error), //* O 'undefined'
    //         ).execute(url);
    //         // new CheckService().execute('http://localhost:3000/');
    //     }
    // );
  }
}

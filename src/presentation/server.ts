import { CheckService } from '../domain';
import { CronService } from './cron';

export class Server {

    public static start() {
        console.log('\n=====================================');
            console.log('\tServer started...');
        console.log('=====================================\n');

        CronService.createJob(
            '*/5 * * * * *',
            () => {
                const url = 'https://google.com'
                new CheckService(
                    () => console.log(`${url} - Is OK`),
                    (error) => console.error(error),
                ).execute(url);
                // new CheckService().execute('http://localhost:3000/');
            }
        );
    }

}
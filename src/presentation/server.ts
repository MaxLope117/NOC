import { CheckService } from '../domain';
import { FileSystemDatasource, LogRepositoryImpl } from '../infrastructure';
import { CronService } from './cron';

const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource(),
    // new postfresSQLLogDatasource(),
    // new mongoLogDatasource(),
)


export class Server {

    public static start() {
        console.log('\n=====================================');
            console.log('\tServer started...');
        console.log('=====================================\n');

        CronService.createJob(
            '*/10 * * * * *',
            () => {
                const url = 'https://google.com';
                // const url = 'http://localhost:3000/';
                new CheckService(
                    fileSystemLogRepository,
                    () => console.log(`${url} - Is OK`), //* O 'undefined'
                    (error) => console.error(error), //* O 'undefined'
                ).execute(url);
                // new CheckService().execute('http://localhost:3000/');
            }
        );
    }

}
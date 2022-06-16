import cluster from "cluster";
import { cpus } from 'os';

const cpusNumbers = cpus().length;


if (cluster.isPrimary) {
    console.log(`Master pid: ${process.pid}`);
    console.log(`Starting ${cpusNumbers} forks`);

    for (let i = 0; i < cpusNumbers; i++) {
        cluster.fork();
    }
} else {
    import('./server');
}

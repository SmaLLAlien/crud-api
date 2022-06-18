import cluster from "cluster";
import { cpus } from 'os';
import {handleProcessExit} from "./utils/handleProcessExit";

const cpusNumbers = cpus().length;


if (cluster.isPrimary) {
    console.log(`Master pid: ${process.pid}`);
    console.log(`Starting ${cpusNumbers} forks`);

    for (let i = 0; i < cpusNumbers; i++) {
        const worker = cluster.fork();
        worker.on('disconnect', () => {
            console.log(`Worker ${worker.id} disconnected`);
        });
        worker.on('message', (msg) => {
            if (msg?.cmd === 'exit') {
                for (const worker of Object.values(cluster.workers)) {
                    worker?.kill('SIGTERM');
                }
                process.exit();
            }
        })
    }
} else {
    import('./server');
}
[`exit`, `SIGINT`, `SIGUSR1`, `SIGUSR2`, `uncaughtException`, `SIGTERM`].forEach((eventType, index) => {
    process.on(eventType, () => handleProcessExit(index + 1));
});

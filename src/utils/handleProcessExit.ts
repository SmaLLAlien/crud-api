import cluster from "cluster";

let isLastMsgAlreadyShowed = false;

export const handleProcessExit = (code) => {
    if (!isLastMsgAlreadyShowed) {
        if (cluster.isPrimary) {
            process.stdout.write(`Process: ${process.pid} is off\n`);
            for (const worker of Object.values(cluster.workers)) {
                worker?.disconnect();
            }
            process.exit(code);
        } else {
            process.send({cmd: 'exit'});
        }
        isLastMsgAlreadyShowed = true;
    }
};

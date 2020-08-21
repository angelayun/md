if (cluster.isMaster) {

    for (let i = 0; i < os.cpus().length / 2; i++) {

        const worker = cluster.fork();

        let missedPing = 0; //将错过心跳的次数做个记录

        const inter = setInterval(() => {

            worker.send('ping');

            missedPing++;

            if (missedPing >= 3) {  //如果错失３次心跳，则很有可能这个进程已经死掉了

                clearInterval(inter); //清除interval

                process.kill(worker.process.pid);  //退出子进程

            }

        }, 3000);//每隔3s给worker发送一条消息，对子进程进行心跳检测，防止出现僵尸进程

        worker.on('message', (msg) => {   //对worker做一个信息的监听

            if (msg == 'pong')     //如果心跳声有返回，则错失的心跳数减一

                missedPing--;

        })

    }

    cluster.on('exit', () => {  //主进程中可以监听到一个exit事件，当某一个子进程退出调度

        setTimeout(() => {

            cluster.fork(); //新建一个子进程　这样做有很大风险，很容易服务器挂掉

        }, 5000); //因此采用延时处理，５秒之后再创建子进程

    })

} else {

    require('./app');

    process.on('message', (str) => {  //监听process的消息事件

        if (str == 'ping')  // 判断消息是心跳包的消息         

            process.send('pong')       //就往主进程里发送一个pong消息

    })

    process.on('uncaughtException', (err) => {   // 监听，当发生一些未被捕捉到的错误的时候

        console.error(err);　　//打印错误　上报错误

        process.exit(1);　//退出进程

    })

    setInterval(() => {     //内存泄露的监控

        if (process.memoryUsage().rss > 734003200) {   //对进程的内存使用情况做一个监控,700M

            process.exit(1);  //发生内存泄露,会使服务越来越卡，直接退出进程，并在５s之后重启

        }

    }, 5000)

}
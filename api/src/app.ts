
/*

This file is the ❤ of the server 0_0

Endpoints--> localhost:8080

TechStack ->>  NodeJS, Express, Typescript, Mongoose, Prisma, Stripe
HTTP Client --> Axios
Deployment --> Docker, Docker-compose, EC2, Nginx, PM2

To Run HTTP server On LocalHost: npm run dev
To Run HTTPS server On EC2: npm run deploy

*/

import 'module-alias/register';
import config from 'config';
import Mongo from "@/Utils/Mongo";
import Logger from "@/Utils/Logger";
import ExpressServer from "@/Utils/Server";
import {Express} from "express";

const app:Express = ExpressServer()
app?.listen(config.get<number>('port'), async () => {
    const Domain = config.get<string>('domain');
    Logger.express(`Server Online`);
    await Mongo();
    if (process.env.NODE_ENV === 'production') {
        Logger.https(`https://${Domain}`);
    } else {
        Logger.http(`http://${Domain}:8080`);
    }
})

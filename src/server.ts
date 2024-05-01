import express from 'express';
import http from 'http';
import { MONGO, SERVER } from './config/config';
import './config/logging';
import 'reflect-metadata';

import mongoose from 'mongoose';

import { corsHandler } from './middleware/corsHandlers';
import { loggingHandler } from './middleware/loggingHandler';
import { routeNotFound } from './middleware/routeNotFound';
import { defineRoutes } from './modules/routes';
import MainController from './controllers/main';
import { log } from 'console';

export const app = express();
export let httpServer: ReturnType<typeof http.createServer>;

export const Main = async () => {
    logging.info(`------------------------------------------------`);
    logging.info(`Initialized Server`);
    logging.info(`------------------------------------------------`);
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    logging.info(`------------------------------------------------`);
    logging.info(`Connecting to MongoDB`);
    logging.info(`------------------------------------------------`);
    try {
        const connection = await mongoose.connect(MONGO.MONGO_CONNECTION, MONGO.MONGO_OPTIONS);
        logging.info(`------------------------------------------------`);
        logging.info(`Connected to MongoDB`, connection.version);
        logging.info(`------------------------------------------------`);
    } catch (error) {
         logging.info(`------------------------------------------------`);
        logging.error(`Error connecting to MongoDB: ${error}`);
         logging.info(`------------------------------------------------`);
    }

    logging.info(`------------------------------------------------`);
    logging.info(`Logging & Configurations`);
    logging.info(`------------------------------------------------`);
    app.use(loggingHandler);
    app.use(corsHandler);

    logging.info(`------------------------------------------------`);
    logging.info(`Define Controller Routing`);
    logging.info(`------------------------------------------------`);
    defineRoutes([MainController], app);

    logging.info(`------------------------------------------------`);
    logging.info(`Define Controller Routing`);
    logging.info(`------------------------------------------------`);
    app.use(routeNotFound);

    logging.info(`------------------------------------------------`);
    logging.info(`STARTING SERVER`);
    logging.info(`------------------------------------------------`);
    httpServer = http.createServer(app);
    httpServer.listen(SERVER.SERVER_PORT, () => {
        logging.info(`------------------------------------------------`);
        logging.info(`Server is running on ${SERVER.SERVER_PORT}`);
        logging.info(`------------------------------------------------`);
    });
};

export const Shutdown = (callback: any) => {
    httpServer && httpServer.close(callback);
};


Main();
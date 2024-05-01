"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shutdown = exports.Main = exports.httpServer = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const config_1 = require("./config/config");
require("./config/logging");
const corsHandlers_1 = require("./middleware/corsHandlers");
const loggingHandler_1 = require("./middleware/loggingHandler");
const routeNotFound_1 = require("./middleware/routeNotFound");
exports.app = (0, express_1.default)();
const Main = () => {
    logging.info(`------------------------------------------------`);
    logging.info(`Initialized Server`);
    logging.info(`------------------------------------------------`);
    exports.app.use(express_1.default.urlencoded({ extended: true }));
    exports.app.use(express_1.default.json());
    logging.info(`------------------------------------------------`);
    logging.info(`Logging & Configurations`);
    logging.info(`------------------------------------------------`);
    exports.app.use(loggingHandler_1.loggingHandler);
    exports.app.use(corsHandlers_1.corsHandler);
    logging.info(`------------------------------------------------`);
    logging.info(`Define Controller Routing`);
    logging.info(`------------------------------------------------`);
    exports.app.get('/', (req, res, next) => {
        return res.status(200).json({ message: 'Hello World' });
    });
    logging.info(`------------------------------------------------`);
    logging.info(`Define Controller Routing`);
    logging.info(`------------------------------------------------`);
    exports.app.use(routeNotFound_1.routeNotFound);
    logging.info(`------------------------------------------------`);
    logging.info(`STARTING SERVER`);
    logging.info(`------------------------------------------------`);
    exports.httpServer = http_1.default.createServer(exports.app);
    exports.httpServer.listen(config_1.SERVER.SERVER_PORT, () => {
        logging.info(`------------------------------------------------`);
        logging.info(`Server is running on ${config_1.SERVER.SERVER_PORT}`);
        logging.info(`------------------------------------------------`);
    });
};
exports.Main = Main;
const Shutdown = (callback) => {
    exports.httpServer && exports.httpServer.close(callback);
};
exports.Shutdown = Shutdown;
(0, exports.Main)();

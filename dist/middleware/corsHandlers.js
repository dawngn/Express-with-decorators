"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsHandler = void 0;
function corsHandler(req, res, next) {
    res.header('Access-Control-Allow-Origin', req.header('origin'));
    res.header('Access-Control-Allow-Methods', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
        return res.status(200).json({});
    }
    next();
}
exports.corsHandler = corsHandler;

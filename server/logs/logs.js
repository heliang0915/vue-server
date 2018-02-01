import log4js from 'log4js';
import path from 'path';
import {conf,env} from '../../config';
log4js.configure(path.join(__dirname,"log4js.json"));
let fileLog = log4js.getLogger('log_info');
let consoleLog = log4js.getLogger('console');
let consoleLogger = consoleLog;
let useLog = function(app) {
    if(env!="development"){
        app.use(log4js.connectLogger(fileLog, {level:'AUTO', format:':method :url :status :response-timems'}));
    }else{
        app.use(log4js.connectLogger(consoleLog, {level:'AUTO', format:':method :url :status :response-timems'}));
    }
}
export {consoleLogger,useLog,fileLog}




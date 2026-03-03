import path from 'path';
import fs from 'fs';
import fsPromises from "fs/promises";
// import {v4 : uuid} from "uuid"
import {format} from "date-fns"
import express , {Request, Response, NextFunction} from "express"

export const logEvents = async (message: string,logFile: string) => {
    const logDir = path.join(__dirname, "..", ".." , "logs");

    if(!fs.existsSync(logDir)){
        await fsPromises.mkdir(logDir)
    }
    const logTime = format(new Date(), "yyy/MM/dd \t HH:mm:ss")
    const logMessage = `${logTime}: ${message} \n`;

    await fsPromises.appendFile(path.join(logDir, `${logFile}`), logMessage)

}

export const logger = async(req: Request, res: Response, next: NextFunction) => {
    const message = `${req.method}: ${req.headers.origin || "No origin"}: ${req.url}`

    logEvents(message, "logs.txt").catch(err => console.log(err))
    console.log(message)
    next();

}
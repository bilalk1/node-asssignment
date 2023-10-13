import { StatusCodes } from 'http-status-codes';
import express, { Request, Response } from 'express';
import http from 'http';

import routes from './routes';
import { SERVER_HEALTHY } from './messages';


export default class App {
	public express: express.Application;

	public httpServer: http.Server;

	public async init(): Promise<void> {
		this.express = express();
		this.httpServer = http.createServer(this.express);
		this.routes();
	}

	private routes(): void {
		this.express.use('/', routes());
		this.express.use('/health', (req: Request, res: Response) => res.status(StatusCodes.OK).json(SERVER_HEALTHY));
	}
}

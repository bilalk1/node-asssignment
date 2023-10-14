import { StatusCodes } from 'http-status-codes';
import express, { Request, Response } from 'express';
import http from 'http';

import routes from './routes';
import { SERVER_HEALTHY } from './messages';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';
import addErrorHandler from './middleware/error-handler';


export default class App {
	public express: express.Application;

	public httpServer: http.Server;

	public async init(): Promise<void> {
		this.express = express();
		this.httpServer = http.createServer(this.express);
		this.middleware()
		this.routes();
		this.express.use(addErrorHandler);
	}

	private routes(): void {
		this.express.use('/', routes());
		this.express.use('/health', (req: Request, res: Response) => res.status(StatusCodes.OK).json(SERVER_HEALTHY));
	}

	private middleware(): void {
		this.express.use(helmet({ contentSecurityPolicy: false }));
		this.express.use(express.json({ limit: '100mb' }));
		this.express.use(
			express.urlencoded({ limit: '100mb', extended: true }),
		);
		this.express.use(cors());
		this.express.use(bodyParser.json())
	}
}

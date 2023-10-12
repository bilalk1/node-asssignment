import express from 'express';
import http from 'http';
import routes from './routes';


export default class App {
	public express: express.Application;

	public httpServer: http.Server;

	public async init(): Promise<void> {
		this.express = express();
		this.httpServer = http.createServer(this.express);
		this.routes();
	}

	private routes(): void {
		this.express.use('/api', routes());
	}
}

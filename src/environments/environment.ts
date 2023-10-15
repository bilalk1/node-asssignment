import * as fs from 'fs';
import * as path from 'path';
import { config as configDotenv } from 'dotenv';

import { EnvironmentFile, Environments } from './environment.constant';
import IEnvironment from './environment.interface';

class Environment implements IEnvironment {
  public port: number;

  public secretKey: string;

  public applyEncryption: boolean;

  public env: string;

  public dbConnString: string;

  public dbName: string;

  /**
   *
   * @param NODE_ENV
   */
  constructor(NODE_ENV?: string) {
    this.env = NODE_ENV || process.env.NODE_ENV || Environments.LOCAL;
    this.setEnvironment(this.env);
    const port: string | undefined | number = process.env.PORT || 8080;
    this.port = Number(port);
    this.applyEncryption = JSON.parse(process.env.APPLY_ENCRYPTION);
    this.secretKey = process.env.SECRET_KEY;
    this.dbConnString = process.env.DB_CONN_STRING;
    this.dbName = process.env.DB_NAME;
  }

  /**
   *
   * @returns
   */
  public getCurrentEnvironment(): string {
    return this.env;
  }

  /**
   *
   * @param env
   */
  public setEnvironment(env: string): void {
    this.env = env || Environments.LOCAL;
    const rootdir: string = path.resolve(__dirname, '../../');
    const envPath = path.resolve(rootdir, EnvironmentFile.LOCAL);
    if (!fs.existsSync(envPath)) {
      throw new Error('.env file is missing in root directory');
    }
    configDotenv({ path: envPath });
  }

  /**
   *
   * @returns
   */
  public isProductionEnvironment(): boolean {
    return this.getCurrentEnvironment() === Environments.PRODUCTION;
  }

  /**
   *
   * @returns
   */
  public isDevEnvironment(): boolean {
    return this.getCurrentEnvironment() === Environments.LOCAL;
  }

  /**
   *
   * @returns
   */
  public isTestEnvironment(): boolean {
    return this.getCurrentEnvironment() === Environments.TEST;
  }

  /**
   *
   * @returns
   */
  public isStagingEnvironment(): boolean {
    return this.getCurrentEnvironment() === Environments.STAGING;
  }
}

export default Environment;

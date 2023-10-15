import jwt from 'jsonwebtoken';

/**
 * jwt service
 */
export default class JwtService {
  /**
   * 
   * @param payload 
   * @returns 
   */
  public async createToken(payload: any): Promise<any> {
    const token = await jwt.sign(payload, global.environment.secretKey, { expiresIn: '24h' });
    return token;
  }

}

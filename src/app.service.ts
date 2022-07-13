import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './app.repository';
import { User } from './schema/user';

@Injectable()
export class AppService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtTokenService: JwtService,
  ) {}

  async generateToken(userExample: User): Promise<any> {
    const user = await this.userRepository.findUser(userExample);

    const { email, type, location, userUuid } = user;

    const payload = { username: email, type, location, userUuid };

    const privateKey = process.env.PRIVATE_KEY;
    const duration = process.env.TOKEN_DURATION_SECONDS;

    const mountedPrivateKey = this.buildPrivateKey(privateKey);
    const options = this.buildOptions(mountedPrivateKey, duration);

    const accessToken = await this.jwtTokenService.signAsync(payload, options);

    return { accessToken };
  }

  buildOptions = (privateKey: string, duration: string): any => ({
    privateKey,
    expiresIn: duration,
    algorithm: 'RS256',
  });

  buildPrivateKey = (privateKey: string): string =>
    privateKey.replace(/\\n/g, '\n');
}

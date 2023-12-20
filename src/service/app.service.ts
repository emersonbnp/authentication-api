import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../repository/app.repository';
import { User } from '../schema/user';
import { IAppService } from './app.service.interface';
import { IUserRepository } from '../repository/app.repository.interface';

@Injectable()
export class AppService implements IAppService {
  constructor(
    @Inject(IUserRepository)private readonly userRepository: IUserRepository,
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

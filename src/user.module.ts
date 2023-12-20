import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { UserRepository } from './repository/app.repository';
import { AppService } from './service/app.service';
import { User, UserSchema } from './schema/user';
import { IAppService } from './service/app.service.interface';
import { IUserRepository } from './repository/app.repository.interface';

@Module({
  imports: [
    MongooseModule.forFeature([{name: User.name, schema: UserSchema  }]),
  ],
  controllers: [AppController],
  providers: [
    JwtService,
    AppService,
    UserRepository,
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
    {
      provide: IAppService,
      useClass: AppService,
    }
  ],
  exports: [IAppService],
})

export class UserModule {}
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { UserRepository } from './app.repository';
import { AppService } from './app.service';
import { User, UserSchema } from './schema/user';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(
      `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@localhost`,
    ),
    JwtModule.register({
      privateKey: process.env.TRANSFER_CALL_PRIVATE_KEY,
      signOptions: { expiresIn: process.env.TOKEN_DURATION_SECONDS },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, UserRepository, JwtService],
})
export class AppModule {}

import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../src/app.controller';
import { AppService } from './service/app.service';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { UserRepository } from './repository/app.repository'
import mongoose from 'mongoose';
import { UserSchema, UserDocument, User} from '../src/schema/user';
import { UserRequest }from '../src/dtos/user.request'
import { v4 as uuidv4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { JwtModule } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';
import { UserModule } from './user.module';
import { IUserRepository } from './repository/app.repository.interface';
import { IAppService } from './service/app.service.interface';
import { HttpStatus } from '@nestjs/common';

let mongod: MongoMemoryServer;

const rootMongooseTestModule = (options: MongooseModuleOptions = {}) =>
  MongooseModule.forRootAsync({
    useFactory: async () => {
      //mongod = await MongoMemoryServer.create();
      mongod = await MongoMemoryServer.create({ binary: { version: '6.0.1' } });
      const mongoUri = mongod.getUri();
      return {
        uri: mongoUri,
        ...options,
      };
    },
  });

const closeInMongodConnection = async () => {
  await mongoose.disconnect();
  if (mongod) await mongod.stop();
};

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;
  let appRepository: UserRepository;

  beforeAll(async () => {
    
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      ],
      providers: [
        { provide: IAppService, useClass: AppService },
        { provide: IUserRepository, useClass: UserRepository },
        {provide: UserRepository, useClass: Model<UserDocument> },
        UserRepository, JwtService, AppService,
      ],
      controllers: [AppController],
    }).compile();
    appController = module.get<AppController>(AppController);
    appRepository = module.get<UserRepository>(UserRepository);
    appService = module.get<AppService>(AppService)
  });

  afterAll(async () => {
    await closeInMongodConnection();
  });

  afterEach(async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    };
  });

  describe('verifyUser', () => {
      it('if a user is not found return a not found status', async () => {
         
        const mockUserRequest = new UserRequest({
          username: 'test1@test.com',
          password: '123456',})

          const mockUser = new User({
            email: 'test1@test.com',
            password: '123456',})

          const mockUserFound: User = {
                 _id: null,
                 userUuid: "6832618b-539a-498a-b3da-fda290e412d4",
                 email: "test1@test.com",
                 password: "123456",
                 type: "user",
                 location: {
                     type: "Point",
                     coordinates: [
                        -23.5639641,
                        -46.6680179
                    ],
                },
                }
       
        const mockToken = 123;
  
        //jest.spyOn(appController, 'generateToken').mockResolvedValue(mockToken);
  
        const mockResponse = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
     
        const response = await appController.generateToken(mockResponse as any, mockUserRequest);
  
        expect(mockResponse.status).toBeCalledWith(HttpStatus.NOT_FOUND);
      });   
    });
  });

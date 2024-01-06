import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../repository/app.repository';
import { User } from '../schema/user';

export interface IAppService {
  generateToken(userExample: User): Promise<any>
}

export const IAppService = Symbol('IAppService');
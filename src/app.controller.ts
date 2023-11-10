import {
  BadRequestException,
  Body,
  Controller,
  HttpStatus,
  NotFoundException,
  Post,
  Res,
} from '@nestjs/common';
import { AppService } from './app.service';
import { UserRequest } from './dtos/user.request';

@Controller('/auth')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/generate-token')
  async generateToken(
    @Res() response: any,
    @Body() user: UserRequest,
  ): Promise<any> {
    try {
      user = new UserRequest(user);
      const token = await this.appService.generateToken(user.toUser());
      return response.status(HttpStatus.OK).json({ data: token });
    } catch (e) {
      if (e instanceof BadRequestException) {
        return response.status(HttpStatus.BAD_REQUEST).json({error: 'Usuário não encontrado'});
      }
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json();
    }
  }
}

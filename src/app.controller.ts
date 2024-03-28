import {
  BadRequestException,
  Body,
  Controller,
  HttpStatus,
  NotFoundException,
  Post,
  Res,
  Inject
} from '@nestjs/common';
import { IAppService } from './service/app.service.interface';
import { UserRequest } from './dtos/user.request';

@Controller('/auth')
export class AppController {
  constructor (@Inject(IAppService)private readonly appService: IAppService) {}

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
      if (e instanceof NotFoundException) {
        return response.status(HttpStatus.NOT_FOUND).json({error: 'Usuário não encontrado'});
      }
      if (e instanceof BadRequestException) {
        return response.status(HttpStatus.BAD_REQUEST).json();
      }
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json();
    }
  }
}

import {Controller, Get, Param} from '@nestjs/common';
import { AppService } from './app.service';
import {Chat} from "./Types";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('api/chats/list')
  getChatList(): Array<Chat> {
    return this.appService.getChatList();
  }

  @Get('api/chats/:id')
  getChat(@Param() params): Chat {
    return this.appService.getChat(parseInt(params.id));
  }
}

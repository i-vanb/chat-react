import { Injectable } from '@nestjs/common';
import {Chat} from "./Types";

const dumpChats = [
  {id: 1, name: 'Стоит ли переходить на Angular'}
]

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getChatList():Array<Chat> {
    return dumpChats
  }
  getChat(id:number):Chat{
    return dumpChats.filter(i=>i.id === id)[0]
  }
}

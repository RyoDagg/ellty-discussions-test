import { Controller, Post, Body, Req } from '@nestjs/common';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private readonly service: MessagesService) {}

  @Post()
  async create(@Body() body: any, @Req() req: any) {
    return this.service.create(body, req.user.userId);
  }
}

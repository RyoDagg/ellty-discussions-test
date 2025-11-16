import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { DiscussionsService } from './discussions.service';

@Controller('discussions')
export class DiscussionsController {
  constructor(private readonly service: DiscussionsService) {}

  @Post()
  async create(@Body() body: { start: number }) {
    return this.service.create(body.start);
  }

  @Get()
  async list() {
    return this.service.findAll();
  }

  @Get(':id')
  async getTree(@Param('id') id: string) {
    return this.service.getTree(id);
  }
}

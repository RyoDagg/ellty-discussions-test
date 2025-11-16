import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { DiscussionsService } from './discussions.service';
import { JwtAuthGuard } from 'src/user/jwt-auth.guard';

@Controller('discussions')
export class DiscussionsController {
  constructor(private readonly service: DiscussionsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body('start') start: number, @Req() req: any) {
    return this.service.create(start, req.user.userId);
  }

  @Get()
  async list() {
    return this.service.findAll();
  }

  @Get(':id')
  async getDiscussion(@Param('id') id: string) {
    return this.service.getDiscussion(id);
  }
}

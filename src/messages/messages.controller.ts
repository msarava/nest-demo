import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { createMessageDTO } from './dtos/create-message.dto';
import { MessagesService } from './messages.services';

@Controller('/messages')
export class MessagesController {
  y;
  constructor(public messageService: MessagesService) {}

  @Get()
  getAllMessages() {
    return this.messageService.findAll();
  }

  @Post()
  createMessage(@Body() body: createMessageDTO) {
    return this.messageService.create(body.content);
  }

  @Get('/:id')
  async getMessageById(@Param('id') id: string) {
    const message = await this.messageService.findOne(id);

    if (!message) {
      throw new NotFoundException('message not found');
    }
    return message;
  }
}

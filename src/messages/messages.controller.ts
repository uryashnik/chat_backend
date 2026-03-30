import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { AuthRequest } from '../common/types';
import { UpdateMessageDto } from './dto/update-message.dto';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  create(@Body() createMessageDto: CreateMessageDto, @Req() req: AuthRequest) {
    return this.messagesService.create(createMessageDto, req.user.id);
  }

  @Get()
  findAll() {
    return this.messagesService.findAll();
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMessageDto: UpdateMessageDto,
    @Req() req: AuthRequest,
  ) {
    return this.messagesService.update(+id, updateMessageDto, req.user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: AuthRequest) {
    return this.messagesService.remove(+id, req.user.id);
  }
}

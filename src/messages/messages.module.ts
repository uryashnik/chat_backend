import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageEntity } from '../common/entities/message.entity';
import { MessageTagEntity } from '../common/entities/message-tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MessageEntity, MessageTagEntity])],
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class MessagesModule {}

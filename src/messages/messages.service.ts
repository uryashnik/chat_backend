import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { Repository } from 'typeorm';
import { MessageEntity } from '../common/entities/message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateMessageDto } from './dto/update-message.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(MessageEntity)
    readonly messagesRepository: Repository<MessageEntity>,
  ) {}

  private getQb() {
    return this.messagesRepository
      .createQueryBuilder('messages')
      .leftJoinAndSelect('messages.author', 'author')
      .leftJoinAndSelect('messages.tag', 'tag');
  }

  private findOne(id: number) {
    return this.getQb().where({ id }).getOne();
  }

  create(createMessageDto: CreateMessageDto, userId: number) {
    return this.messagesRepository.save({
      ...createMessageDto,
      author: { id: userId },
    });
  }

  findAll() {
    return this.getQb().getMany();
  }

  public async update(
    id: number,
    updateMessageDto: UpdateMessageDto,
    userId: number,
  ) {
    const message = await this.findOne(id);

    if (!message) {
      throw new NotFoundException(`Message with id ${id} not found`);
    }
    if (message.author.id !== userId) {
      throw new ForbiddenException(`Only author can edit message`);
    }

    Object.assign(message, updateMessageDto);

    return this.messagesRepository.save(message);
  }

  public async remove(id: number, userId) {
    const message = await this.findOne(id);

    if (!message) {
      throw new NotFoundException(`Message with id ${id} not found`);
    }
    if (message.author.id !== userId) {
      throw new ForbiddenException(`Only author can delete message`);
    }

    return this.messagesRepository.softRemove({ id });
  }
}

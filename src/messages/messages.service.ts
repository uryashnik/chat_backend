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
import { FindMessagesQueryDto } from './dto/find-messages-query.dto';
import { MessageTagEntity } from '../common/entities/message-tag.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(MessageEntity)
    readonly messagesRepository: Repository<MessageEntity>,
    @InjectRepository(MessageTagEntity)
    readonly messageTagsRepository: Repository<MessageTagEntity>,
  ) {}

  private getQb() {
    return this.messagesRepository
      .createQueryBuilder('messages')
      .leftJoinAndSelect('messages.author', 'author')
      .leftJoinAndSelect('messages.tag', 'tag');
  }

  private findById(id: number) {
    return this.getQb().where({ id }).getOne();
  }

  create(createMessageDto: CreateMessageDto, userId: number) {
    return this.messagesRepository.save({
      ...createMessageDto,
      author: { id: userId },
    });
  }

  async findAll(query: FindMessagesQueryDto) {
    const { page, limit, dateFrom, dateTo, authorId, tagId } = query;
    const qb = this.getQb();

    if (dateFrom) {
      qb.andWhere('messages.createdAt >= :dateFrom', { dateFrom });
    }
    if (dateTo) {
      qb.andWhere('messages.createdAt <= :dateTo', { dateTo });
    }
    if (authorId) {
      qb.andWhere('messages.author = :authorId', { authorId });
    }
    if (tagId) {
      qb.andWhere('messages.tag = :tagId', { tagId });
    }

    qb.orderBy('messages.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    const [data, total] = await qb.getManyAndCount();

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  public async update(
    id: number,
    updateMessageDto: UpdateMessageDto,
    userId: number,
  ) {
    const message = await this.findById(id);

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
    const message = await this.findById(id);

    if (!message) {
      throw new NotFoundException(`Message with id ${id} not found`);
    }
    if (message.author.id !== userId) {
      throw new ForbiddenException(`Only author can delete message`);
    }

    return this.messagesRepository.softRemove({ id });
  }

  public findOne(id: number) {
    return this.findById(id);
  }

  public getTags() {
    return this.messageTagsRepository.find();
  }
}

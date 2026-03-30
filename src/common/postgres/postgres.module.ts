/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Module({})
export class PostgresModule {
  static register(entities: Function[], migrations: Function[]) {
    return {
      module: PostgresModule,
      imports: [
        TypeOrmModule.forRootAsync({
          useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
            type: 'postgres',
            host: configService.getOrThrow<string>('POSTGRES_HOST'),
            port: configService.getOrThrow<number>('POSTGRES_PORT'),
            username: configService.getOrThrow<string>('POSTGRES_USER'),
            password: configService.getOrThrow<string>('POSTGRES_PASS'),
            database: configService.getOrThrow<string>('POSTGRES_DB_NAME'),
            migrationsTableName: '_migrations',
            migrationsRun: true,
            synchronize: false,
            entities,
            migrations,
            namingStrategy: new SnakeNamingStrategy(),
          }),
          inject: [ConfigService],
        }),
      ],
    };
  }
}

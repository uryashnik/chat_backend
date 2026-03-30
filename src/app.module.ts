import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PostgresModule } from './common/postgres/postgres.module';
import { AuthModule } from './auth/auth.module';
import { migrations } from './common/migrations';
import { entities } from './common/entities';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: [`.env`] }),
    PostgresModule.register(entities, migrations),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

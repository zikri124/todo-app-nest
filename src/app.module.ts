import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import config from './config/config';
import { ProviderModule } from './providers/database/provider.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      cache: true,
      isGlobal: true
    }),
    ProviderModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import config from './config';
import { AppConfigEnum } from './enums';
import { AppConfigurationService } from './config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      envFilePath: [AppConfigEnum.ENV_FILE_PATH],
    })
  ],
  providers: [ConfigService, AppConfigurationService],
  exports: [ConfigService, AppConfigurationService],
})
export class AppConfigurationModule {}

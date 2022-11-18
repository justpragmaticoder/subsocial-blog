import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';
import mysqlConfig from './mysql/config';
import { AppConfigEnum } from '../app';
import { DBConfigurationService } from '../../../database/src/database.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [mysqlConfig],
      envFilePath: [AppConfigEnum.ENV_FILE_PATH],
    })
  ],
  providers: [ConfigService, DBConfigurationService],
  exports: [ConfigService, DBConfigurationService],
})
export class MySqlConfigModule {}

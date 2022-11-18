import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { AppConfigEnum } from '../app';
import { IPFSConfigService } from './ipfs.service';
import ipfsConfig from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [ipfsConfig],
      envFilePath: [AppConfigEnum.ENV_FILE_PATH],
    })
  ],
  providers: [ConfigService, IPFSConfigService],
  exports: [ConfigService, IPFSConfigService],
})
export class IPFSConfigModule {}

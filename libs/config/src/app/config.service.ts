import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppConfigEnvVariablesPathEnum } from './enums';

@Injectable()
export class AppConfigurationService {
  constructor(private readonly configurationService: ConfigService) {}

  get env(): string {
    return this.configurationService.get<string>(AppConfigEnvVariablesPathEnum.APP_ENV)
  }

  get port(): string {
    return this.configurationService.get<string>(AppConfigEnvVariablesPathEnum.APP_PORT)
  }
}

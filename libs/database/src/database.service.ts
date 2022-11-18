import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class DBConfigurationService {
  constructor(private readonly configService: ConfigService) {}

  get mysql(): string {
    return this.configService.get<string>('db.mysql');
  }

  public typeOrmConfig(options: TypeOrmModuleOptions): TypeOrmModuleOptions {
    const databaseConfig = this.configService.get<TypeOrmModuleOptions>(`db.${options.type}`);

    if (!databaseConfig) {
      throw new Error(`There is no config for ${options.type}`);
    }

    const resultConfig = Object.assign(databaseConfig, options);
    const resultExtra = Object.assign(databaseConfig.extra, options.extra);

    return { ...resultConfig, extra: resultExtra } as TypeOrmModuleOptions;
  }
}

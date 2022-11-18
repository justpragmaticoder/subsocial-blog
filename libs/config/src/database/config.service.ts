import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DatabaseConfigEnum } from './enums';

@Injectable()
export class MySqlConfigService {
  constructor(private readonly configService: ConfigService) {}

  get options() {
    return this.configService.get<TypeOrmModuleOptions>(DatabaseConfigEnum.MYSQL_TYPE);
  }
}

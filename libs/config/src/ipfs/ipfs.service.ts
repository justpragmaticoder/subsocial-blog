import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IPFSConfigEnum } from './enums';
import { IIPFSConfigOptions } from './interfaces';

@Injectable()
export class IPFSConfigService {
  constructor(private readonly configService: ConfigService) {}

  get options(): IIPFSConfigOptions {
    return this.configService.get<IIPFSConfigOptions>(IPFSConfigEnum.IPFS_CONFIG);
  }
}

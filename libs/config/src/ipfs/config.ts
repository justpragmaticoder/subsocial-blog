import { registerAs } from '@nestjs/config';
import * as env from 'env-var';
import { IPFSConfigEnum } from './enums';

export default registerAs(IPFSConfigEnum.IPFS_CONFIG, () => ({
  substrateNodeUrl: env.get(IPFSConfigEnum.SUBSTRATE_NODE_URL).required().asString(),
  ipfsNodeUrl: env.get(IPFSConfigEnum.IPFS_NODE_URL).required().asString(),
  ipfsAuthToken: env.get(IPFSConfigEnum.IPFS_AUTH_TOKEN).required().asString(),
}));

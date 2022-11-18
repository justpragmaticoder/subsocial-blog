import { registerAs } from '@nestjs/config';
import * as env from 'env-var';
import { AppConfigEnum } from "./enums";

export default registerAs(AppConfigEnum.APP_CONFIGURATION_TOKEN, () => ({
  env: env.get(AppConfigEnum.APP_ENV).required().asString(),
  port: env.get(AppConfigEnum.APP_PORT).required().asPortNumber(),
}));

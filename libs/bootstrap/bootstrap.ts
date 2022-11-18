import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppConfigEnum, AppConfigurationService} from '../config/src/app';
import { IBootstrapOptions } from './interfaces/bootstrap.interface';

export class Bootstrap {
  public async run(options: IBootstrapOptions): Promise<void> {
    try {
      const app = await NestFactory.create(options.appModule);
      app.enableCors();

      if (options.middlewares) {
        options.middlewares.forEach((middleware) => app.use(middleware))
      }

      const appConfig: AppConfigurationService = app.get(AppConfigEnum.APP_CONFIGURATION_SERVICE);
      await app.listen(appConfig.port, () => {
        Logger.log(`[${this.constructor.name}][${this.run.name}] Application is running on ${appConfig.port} port`)
      });
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  }
}

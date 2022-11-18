import { AppModule } from './app/app.module';
import { Bootstrap } from '../libs/bootstrap/bootstrap';
import { middlewares } from '../libs/bootstrap/middlewares';

new Bootstrap().run({
  appModule: AppModule,
  middlewares,
});

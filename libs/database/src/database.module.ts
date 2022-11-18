import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DBConfigurationService } from './database.service';
import { MySqlConfigModule } from '../../config/src/database';
import { DatabaseTypeEnum } from '../enums';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [MySqlConfigModule],
      inject: [DBConfigurationService],
      useFactory: async (dbConfig: DBConfigurationService) => {
        return dbConfig.typeOrmConfig({
          type: DatabaseTypeEnum.MYSQL,
          autoLoadEntities: true,
          maxQueryExecutionTime: 150,
          extra: {
            connectTimeout: 2500,
          },
        });
      },
    }),
  ]
})
export class DatabaseModule {}

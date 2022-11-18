import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Filter } from '@nestjs-query/core';
import { Repository } from 'typeorm';
import { ICreateOwnerInput, IFindOwnersResponse, IOwner } from './interfaces';
import { OwnerEntity } from './entities/owner.entity';
import { FindOwnersInput } from './inputs/find-owners.input';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OwnerService extends TypeOrmQueryService<OwnerEntity> {
  constructor(@InjectRepository(OwnerEntity) repo: Repository<OwnerEntity>) {
    super(repo);
  }

  async findOwners(query: FindOwnersInput): Promise<IFindOwnersResponse> {
    const filter: Filter<OwnerEntity> = query.filter;
    const { offset = 0, limit = 10 } = query.paging ?? {};

    const [total, posts]: [number, OwnerEntity[]] = await Promise.all([
      this.count(filter),
      this.query({ ...query, ...{ filter } }),
    ]);

    return {
      offset,
      limit,
      totalCount: total,
      node: posts,
    }
  }

  async createOwner(input: ICreateOwnerInput): Promise<IOwner> {
    return this.createOne(input);
  }
}

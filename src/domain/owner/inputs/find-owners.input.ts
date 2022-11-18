import { ArgsType } from '@nestjs/graphql';
import { PagingStrategies, QueryArgsType } from '@nestjs-query/query-graphql';
import { OwnerDto } from '../dto/owner.dto';

@ArgsType()
export class FindOwnersInput extends QueryArgsType(OwnerDto, { pagingStrategy: PagingStrategies.OFFSET }) {}

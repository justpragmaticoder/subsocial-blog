import { Query, Mutation, Resolver, Args } from '@nestjs/graphql';
import { OwnerService } from './owner.service';
import { FindOwnersResponseDto } from './dto/find-posts-response.dto';
import { OwnerDto } from './dto/owner.dto';
import { CreateOwnerInput } from './inputs/create-owner.input';
import { FindOwnersInput } from "./inputs/find-owners.input";

@Resolver()
export class OwnerResolver {
  constructor(
    private readonly ownerService: OwnerService
  ) {}

  @Query(() => FindOwnersResponseDto)
  async findOwners(@Args() query: FindOwnersInput): Promise<FindOwnersResponseDto> {
    return this.ownerService.findOwners(query);
  }

  @Mutation(() => OwnerDto)
  async createOwner(@Args('input') input: CreateOwnerInput): Promise<OwnerDto> {
    return this.ownerService.createOwner(input);
  }
}

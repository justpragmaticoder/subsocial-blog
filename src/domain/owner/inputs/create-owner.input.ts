import { Field, InputType } from "@nestjs/graphql";
import { ICreateOwnerInput } from '../interfaces';

@InputType()
export class CreateOwnerInput implements ICreateOwnerInput {
  @Field()
  readonly ownerId: string;

  @Field({ nullable: true })
  readonly nickname?: string;
}

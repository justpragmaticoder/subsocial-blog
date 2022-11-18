import { Query, Mutation, Resolver, Args } from '@nestjs/graphql';
import { PostService } from './post-service';
import { FindPostsInput } from './inputs/find-posts.input';
import { FindPostsResponseDto } from './dto/find-posts-response.dto';
import { PostDto } from './dto/post.dto';
import { CreatePostInput } from './inputs/create-post.input';

@Resolver()
export class PostResolver {
  constructor(
    private readonly postService: PostService
  ) {}

  @Query(() => FindPostsResponseDto)
  async findPosts(@Args() query: FindPostsInput): Promise<FindPostsResponseDto> {
    return this.postService.findPosts(query);
  }

  @Mutation(() => PostDto)
  async createPost(@Args('input') input: CreatePostInput): Promise<PostDto> {
    return this.postService.createPost(input);
  }
}

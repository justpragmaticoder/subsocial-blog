import { PostService } from '../src/domain/post/post-service';
import { Repository } from 'typeorm';
import { PostEntity } from '../src/domain/post/entities/post.entity';
import { ICreatePostInput } from '../src/domain/post/interfaces';

const inputMock: ICreatePostInput = {
  spaceId: '1',
  ownerId: 'MOGRADjxdhrDTldErsxIDUPwbjfenfwgFUFMqUjGbUnGYKnZ',
  content: {
    body: 'Some test body',
    tags: ['news'],
    image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAIBA',
    title: 'Just yesterday, the Ripple Swell conference wrapped up'
  }
};

const resultMock: PostEntity = {
  id: 1,
  createdAtTime: new Date(1668253664),
  syncedBlock: null,
  syncedContentId: null,
  ownerId: 'MOGRADjxdhrDTldErsxIDUPwbjfenfwgFUFMqUjGbUnGYKnZ',
  spaceId: '1',
  body: 'Some test body',
  tags: ['news'],
  image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAIBA',
  title: 'Just yesterday, the Ripple Swell conference wrapped up'
};

describe('PostService', () => {
  let postService: PostService;

  beforeEach(() => {
    postService = new PostService({} as Repository<PostEntity>);
    jest.spyOn(postService, 'createOne').mockImplementation(() => {
      return new Promise((resolve) => {
        resolve(resultMock);
      });
    });
  });

  describe('createPost', () => {
    it('should return a newly created post', async () => {
      expect(await postService.createPost(inputMock)).toBe(resultMock);
    });
  });
});
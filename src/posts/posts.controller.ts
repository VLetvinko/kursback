import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostEntity} from './post.entity';
import { CreatePost } from '../create-dto';

@Controller('posts')
export class PostsController {

  constructor(
    private readonly postService: PostsService,
  ) { }

  @Get('post')
  getPosts(): Promise<PostEntity[]>{
    return this.postService.getPosts();
  }

  @Get('post/:id')
  getPost(@Param('id') id:string): Promise<PostEntity>{
    return this.postService.getPost(id);
  }

  @Post('post')
  addPost(@Body() createPost: CreatePost): Promise<PostEntity>{
    return this.postService.addPost(createPost);
  }

  @Delete('post/:id')
  remove(@Param('id')id: string): Promise<void>{
    return this.postService.remove(id);
  }

}

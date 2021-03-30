import { Injectable } from '@nestjs/common';
import { PostEntity } from './post.entity';
import { Connection, Repository } from 'typeorm';
import { CreatePost } from '../create-dto';


@Injectable()
export class PostsService {

  private readonly postRepository:Repository<PostEntity>

  constructor(
    public readonly connection: Connection
  ) {
    this.postRepository = this.connection.getRepository(PostEntity);
  }

  async getPosts(): Promise<PostEntity[]>{
    return this.postRepository.find();
  }

  getPost(id:string): Promise<PostEntity>{
    return this.postRepository.findOne(id);
  }

  addPost(createPost:CreatePost): Promise<PostEntity>{
    const newPost = this.postRepository.create(createPost);
    return this.postRepository.save(newPost);
  }

  async remove(id: string): Promise<void>{
    await this.postRepository.delete(id);
  }
}

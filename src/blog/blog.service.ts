import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from './blog.entity';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private blogRepository: Repository<Blog>,
  ) {}

  // 모든 블로그 게시글을 조회
  findAll(): Promise<Blog[]> {
    return this.blogRepository.find();
  }

  // 특정 ID의 블로그 게시글을 조회
  findOne(id: number): Promise<Blog> {
    return this.blogRepository.findOneBy({ id });
  }

  // 새롱누 블로그 게시글을 생성
  create(blog: Blog): Promise<Blog> {
    return this.blogRepository.save(blog);
  }

  // 특정 ID의 블로그 게시글을 업데이트
  async update(id: number, blog: Blog): Promise<Blog> {
    await this.blogRepository.update(id, blog);
    return this.findOne(id);
  }

  // 특정 ID의 블로그 게시글을 삭제
  async remove(id: number): Promise<void> {
    await this.blogRepository.delete(id);
  }
}

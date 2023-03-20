import { Injectable } from '@nestjs/common';
import { CommentsCreateDto } from '../Dto/comments.create.dto';

@Injectable()
export class CommentsService {
  async getAllComments() {
    return `get All comments`;
  }

  async createComment(id: string, comments: CommentsCreateDto) {
    return `${id} + ${comments}`;
  }

  async plusLike(id: string) {
    return id;
  }
}

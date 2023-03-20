import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Comments } from 'src/comments/comments.schema';
import { Cat } from './cats.schema';
import { CatRequestDto } from './dto/cats.request.dto';

@Injectable()
export class CatsRepository {
  constructor(
    @InjectModel(Cat.name) private readonly catModel: Model<Cat>,
    @InjectModel(Comments.name) private readonly commentModel: Model<Comments>,
  ) {}

  async findAll() {
    const result = await this.catModel
      .find()
      .populate({ path: 'comments', model: this.commentModel });
    return result;
  }

  async findByIdAndUpdateImg(id: string, fileName: string) {
    const cat = await this.catModel.findById(id);
    cat.imgUrl = `http://localhost:8000/media/${fileName}`;
    const newCat = await cat.save();
    console.log(newCat);
    return newCat.readOnlyData;
  }

  async findCatByIdWithoutPassword(
    catId: string | Types.ObjectId,
  ): Promise<Cat | null> {
    const cat = await this.catModel.findById(catId).select('email name');
    return cat;
  }

  async findCatByEmail(email: string): Promise<Cat | null> {
    const cat = await this.catModel.findOne({ email });
    return cat;
  }

  async existByEmail(email: string): Promise<any> {
    try {
      const result = await this.catModel.exists({ email });
      return result;
    } catch (error) {
      throw new HttpException('db error', 400);
    }
  }

  async create(cat: CatRequestDto): Promise<Cat> {
    return await this.catModel.create(cat);
  }
}

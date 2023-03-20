import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CatRequestDto } from './dto/cats.request.dto';
import * as bcrypt from 'bcrypt';
import { Catsrepository } from './cats.repository';
import { Cat } from './cats.schema';

@Injectable()
export class CatsService {
  constructor(private readonly catsRepository: Catsrepository) {}

  async getAllCat() {
    const allCat = await this.catsRepository.findAll();
    const readOnlyCats = allCat.map((cat) => cat.readOnlyData);
    return readOnlyCats;
  }

  async uploadImg(cat: Cat, files: Express.Multer.File[]) {
    const fileName = `cats/${files[0].filename}`;
    console.log(fileName);
    const newCat = await this.catsRepository.findByIdAndUpdateImg(
      cat.id,
      fileName,
    );
    console.log(newCat);
    return newCat;
  }

  async signUp(body: CatRequestDto) {
    const { email, name, password } = body;
    const isCatExist = await this.catsRepository.existByEmail(email);

    if (isCatExist) {
      throw new UnauthorizedException('해당하는 고양이는 이미 존재합니다.');
      // throw new HttpException('해당하는 고양이는 이미 존재합니다.', 403);
    }

    const hashedPassedword = await bcrypt.hash(password, 10);

    const cat = await this.catsRepository.create({
      email,
      name,
      password: hashedPassedword,
    });
    // 전달해 주고 싶은 데이터만 전달하기 위해 virtual을 이용한 가상의 readOnlyData를 보내준다.
    return cat.readOnlyData;
  }
}

import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from 'src/auth/auth.module';
import { Comments, CommentsSchema } from 'src/comments/comments.schema';
import { CatsController } from './cats.controller';
import { CatsRepository } from './cats.repository';
import { Cat, CatSchema } from './cats.schema';
import { CatsService } from './cats.service';

@Module({
  imports: [
    MulterModule.register({
      dest: './upload',
    }),
    MongooseModule.forFeature([
      { name: Comments.name, schema: CommentsSchema },
      { name: Cat.name, schema: CatSchema },
    ]),
    forwardRef(() => AuthModule),
  ],
  controllers: [CatsController],
  providers: [CatsService, CatsRepository],
  //프러바이더로 의존성 주입을 받으면 controller에서 주입 받은 service나 repository, model 등을 사용 가능하다.
  //직접 임폴트도 가능하지만 provier로 의존성 주입 받는 것이 더 활용성이 높다.
  exports: [CatsService, CatsRepository],
})
export class CatsModule {}

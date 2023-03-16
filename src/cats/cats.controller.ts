import {
  Controller,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/common/exception/http-exception.filter';
import { SuccessInterceptor } from 'src/common/interceptor/success.interceptor';
import { CatsService, Cat } from './cats.service';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  findAll(): Cat[] {
    throw new HttpException('api broken', 401);
    return this.catsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) param) {
    // 기본적으로 파라미터는 string을 반환 하지만 pipe를 통해 인자의 타입 변경이 가능하다
    // 추가로 parseIntpipe의 경우 number 유효성 검사도 가능하다.
    console.log(param);
    return this.catsService.findOne(param.id);
  }
}

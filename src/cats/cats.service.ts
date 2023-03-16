import { Injectable } from '@nestjs/common';

export interface Cat {
  id: number;
  name: string;
}

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [
    { id: 1, name: 'kim' },
    { id: 2, name: 'bong' },
  ];

  findAll(): Cat[] {
    return this.cats;
  }

  findOne(param: number) {
    return this.cats.filter((arg) => arg.id === param);
  }
}

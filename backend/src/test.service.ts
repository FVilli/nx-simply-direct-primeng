import { Injectable } from '@nestjs/common';
import { BaseService } from '@simply-direct/common';
import { CoreGateway, DirectMethod, PrismaService } from '@simply-direct/nestjs-core';

// TEST 6

@Injectable()
export class TestService extends BaseService {

  constructor(private core:CoreGateway,private readonly prismaService: PrismaService) {
    super()
  }
  
  @DirectMethod()
  getHello(): string {
    return 'Hello World!';
  }

  @DirectMethod()
  getRandoms(): Array<number> {
    const rv:number[] = [];
    for(let i=0;i<10;i++) rv.push(Math.round(Math.random()*100));
    return rv;
  }

  @DirectMethod()
  getRandom(max:number): number {
    return Math.round(Math.random()*max);
  }

  @DirectMethod()
  getServerTime(): [string,number] {
    return ['NOW',Date.now()];
  }

 }

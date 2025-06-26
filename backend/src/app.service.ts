import { Injectable } from '@nestjs/common';
import { BaseService, IAuth } from '@simply-direct/common';
import { Interface0, Interface1 } from '@common/interfaces'
import { Client, Prisma, User } from '@prisma/client';
import { CoreGateway, PrismaService } from '@simply-direct/nestjs-core';
import { enhance } from '@zenstackhq/runtime';



@Injectable()
export class AppService extends BaseService {

  constructor(private core:CoreGateway,private readonly prismaService: PrismaService) {
    super()
  }
  
  getHello(): string {
    return 'Hello World!';
  }

  getRandom0_100(): number[] {
    return [Math.round(Math.random()*100)];
  }

  getRandomInt(max:number): number {
    return Math.round(Math.random()*max);
  }

  getServerTime(): [number,string] {
    return [Date.now(),'NOW'];
  }

  
  method0(payload:Interface0, auth:IAuth):Interface0 {
    return payload;
  }

  async method1(param:Interface1, auth:IAuth):Promise<Interface1[]> {
    return [param];
  }

  async method2(param:Interface1[], auth:IAuth):Promise<Interface1 | null> {
    return param[0];
  }

  method3(param:Interface1, auth:IAuth):Interface1[] {
    return [param];
  }

  async clients(user:User, auth:IAuth):Promise<Client[]> {
    return await this.core.prisma<Client[]>('client','findMany',{})
  }

  async users(active:boolean, auth:IAuth):Promise<User[]> {
    const prisma = enhance(this.prismaService, { user:auth?.user });
    return await prisma.user.findMany({ where:{disabled:!active}});
  }

 }

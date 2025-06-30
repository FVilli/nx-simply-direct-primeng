import { Injectable } from '@nestjs/common';
import { BaseService, clone, IAuth } from '@simply-direct/common';
import { Interface0, Interface1 } from '@common/interfaces'
import { Client, User } from '@prisma/client';
import { CoreGateway, DirectMethod, PrismaService } from '@simply-direct/nestjs-core';
import { enhance } from '@zenstackhq/runtime';

// TEST 6

@Injectable()
export class AppService extends BaseService {

  constructor(private core:CoreGateway,private readonly prismaService: PrismaService) {
    super()
  }
  
  @DirectMethod()
  method0(payload:Interface0, auth:IAuth):Interface0 {
    return payload;
  }

  @DirectMethod()
  async method1(param:Interface1, auth:IAuth):Promise<Array<Interface1>> {
    const p2 = clone(param);
    p2.name += '!';
    p2.eta++;
    return [param,p2];
  }

  @DirectMethod()
  async method2(params:Array<Interface1>, auth:IAuth):Promise<Interface1 | null> {
    return params[0];
  }

  @DirectMethod()
  method3(param:Interface1, auth:IAuth):Interface1[] {
    return [param];
  }

  @DirectMethod()
  async clients(user:Partial<User>, auth:IAuth):Promise<Client[]> {
    if(!user.id) throw new Error("Must provide id");
    const prisma = enhance(this.prismaService, { user:auth?.user });
    return await prisma.client.findMany({where:{user_id:user.id}});
  }

  @DirectMethod()
  async users(active:boolean, auth:IAuth):Promise<User[]> {
    const prisma = enhance(this.prismaService, { user:auth?.user });
    return await prisma.user.findMany({ where:{disabled:!active}, });
  }

  // async test(active:boolean, auth:IAuth) {
  //   const prisma = enhance(this.prismaService, { user:auth?.user });
  //   const rv = await prisma.user.groupBy({ by: 'name' })
  // }

 }

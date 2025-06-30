// =====================================================
//  NON MODIFICARE QUESTO FILE !!
//  QUESTO FILE VIENE GENERATO AUTOMATICAMENTE ...
//  LEGGERE ATTENTAMENTE LE ISTRUZIONI !!! 
// =====================================================

import { inject, Injectable } from "@angular/core";
import { CoreService } from "@simply-direct/ngx-core";
import { Interface0,Interface1 } from '@common/interfaces';

@Injectable()
export class ApiService {

    private readonly core = inject(CoreService);

    AppService = {
        method0: async (payload:Interface0):Promise<Interface0 | null> => { return await this.core.request('AppService.method0',payload); },
        method1: async (param:Interface1):Promise<Interface1[] | null> => { return await this.core.request('AppService.method1',param); },
        method2: async (params:Interface1[]):Promise<Interface1 | null> => { return await this.core.request('AppService.method2',params); },
        method3: async (param:Interface1):Promise<Interface1[] | null> => { return await this.core.request('AppService.method3',param); },
        clients: async (user:Partial<{ name: string; id: number; uid: string | null; owned_by: number | null; created_at: Date; created_by: number | null; updated_at: Date; updated_by: number | null; deleted_at: Date | null; deleted_by: number | null; email: string | null; phash: string | null; role: string | null; disabled: boolean; }>):Promise<{ name: string; id: number; uid: string; owned_by: number; created_at: Date; created_by: number; updated_at: Date; updated_by: number; deleted_at: Date; deleted_by: number; agent: string; token: string; sessions: number; user_id: number; }[] | null> => { return await this.core.request('AppService.clients',user); },
        users: async (active:boolean):Promise<{ name: string; id: number; uid: string; owned_by: number; created_at: Date; created_by: number; updated_at: Date; updated_by: number; deleted_at: Date; deleted_by: number; email: string; phash: string; role: string; disabled: boolean; }[] | null> => { return await this.core.request('AppService.users',active); },
    }
    TestService = {
        getHello: async ():Promise<string | null> => { return await this.core.request('TestService.getHello'); },
        getRandoms: async ():Promise<number[] | null> => { return await this.core.request('TestService.getRandoms'); },
        getRandom: async (max:number):Promise<number | null> => { return await this.core.request('TestService.getRandom',max); },
        getServerTime: async ():Promise<[string, number] | null> => { return await this.core.request('TestService.getServerTime'); },
    }
}
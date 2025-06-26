// =====================================================
//  NON MODIFICARE QUESTO FILE !!
//  QUESTO FILE VIENE GENERATO AUTOMATICAMENTE ...
//  LEGGERE ATTENTAMENTE LE ISTRUZIONI !!! 
// =====================================================
//  Generato il 24/06/2025 17:34.34

import { inject, Injectable } from "@angular/core";
import { CoreService } from "@simply-direct/ngx-core";

@Injectable()
export class ApiService {

    private readonly core = inject(CoreService);
    
    class1 = {
        metodo1: async (param1:string):Promise<number | null> => { return await this.core.request('class1.metodo1',param1); }
    }

    class2 = {
        metodo1: async (abc:number):Promise<string | null> => { return await this.core.request('class2.metodo1',abc); },
        metodo2: async (pippo:string):Promise<number | null> => { return await this.core.request('class2.metodo2',pippo); },
    }
}
import { Component, effect, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ApiService } from '@generated/api.service';
import { DbService } from '@generated/db.service';
import { NG_PROVIDERS } from './imports.modules';
import { CoreService } from '@simply-direct/ngx-core';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule],
    providers: [...NG_PROVIDERS],
    template: `<router-outlet></router-outlet>`
})
export class AppComponent implements OnInit {

    core = inject(CoreService);
    api = inject(ApiService);
    db = inject(DbService);

    constructor() {

        //this.core.log(true);

        // effect(()=>{
        //     const connected = this.core.$connected();
        //     console.log("connected",connected);
        // })

        // effect(()=>{
        //     const auth = this.core.$auth();
        //     console.log("auth",auth);
        // })

        // effect(()=>{
        //     const initialized = this.core.$initialized();
        //     console.log("initialized",initialized);
        // })

        // effect(()=>{
        //     const loggedIn = this.core.$loggedIn();
        //     console.log("loggedIn",loggedIn);
        // })

        // effect(()=>{
        //     const events = this.core.$events();
        //     console.log("events",events);
        // })

        // this.core.events$.subscribe(e=>{
        //     console.log("events$",e);
        // })
    }

    async ngOnInit() {
        
        console.log("getHello",await this.api.TestService.getHello());
        // console.log("getRandoms",await this.api.TestService.getRandoms());
        // console.log("getRandom",await this.api.TestService.getRandom(1000));
        console.log("getServerTime",await this.api.TestService.getServerTime());
        // console.log("method0",await this.api.AppService.method0({name:'fede',content:'hello world !'}));
        console.log("method1",await this.api.AppService.method1({name:'pippo',eta:27}));
        console.log("method2",await this.api.AppService.method2([{name:'pippo',eta:27},{name:'paperino',eta:22},{name:'pluto',eta:12}]));
        console.log("method3",await this.api.AppService.method3({name:'zio paperone',eta:78}));
        // console.log("clients",await this.api.AppService.clients({id:2,name:'admin'}));
        // console.log("users",await this.api.AppService.users(true));
        
        // try {
        //     console.log("clients-with-error");
        //     const rv = await this.api.AppService.clients({name:'admin'});
        //     console.log(rv);
        // } catch(err) {
        //     console.log("err",err);
        // }

        console.log("db:users",await this.db.user.findMany())
        console.log("db:clients",await this.db.client.findMany())
    }


}

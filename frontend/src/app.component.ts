import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ApiService } from './app/@generated/api.service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule],
    template: `<router-outlet></router-outlet>`
})
export class AppComponent implements OnInit {
    
    api = inject(ApiService);

    async ngOnInit() {
        const test1 = await this.api.class2.metodo2('fede');
    }


}

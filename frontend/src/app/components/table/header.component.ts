import { Component, input, output } from '@angular/core';
import { NG_MODULES } from '../../../imports.modules';
import { PRIME_NG_MODULES } from '../../../imports.primeng';


@Component({
    standalone: true,
    selector: 'app-table-header',
    template: `<div class="flex flex-wrap items-center justify-between w-full m-0">
    <h4 class="w-1/2 sm:w-auto mb-2"><span [ngClass]="['pi',icon()]" style="font-size: 1.7rem"></span> {{ title() }}</h4>
    @if(busy()) 
        { <p-message severity="info" icon="pi pi-spin pi-spinner" text="Busy ..." styleClass="w-full text-center sm:w-auto sm:order-none order-last" /> }
    @else {
        <div class="w-full text-center sm:w-auto sm:order-none order-last">
            <p-iconfield>
                <p-inputicon styleClass="pi pi-search" />
                <input class="w-full" pInputText type="text" (input)="onSearch($event)" placeholder="Search..." />
            </p-iconfield>
        </div>
    }
    <div class="w-1/2 text-right sm:w-auto mb-2">
        <ng-content></ng-content>
    </div>
</div>
    `,
    imports: [...NG_MODULES, ...PRIME_NG_MODULES],
})
export class TableHeader {
    readonly icon = input.required<string>()
    readonly title = input.required<string>()
    readonly busy = input(false)
    readonly search = output<string>();
    onSearch(event: Event) {
        this.search.emit((event.target as HTMLInputElement).value);
    }
}
    

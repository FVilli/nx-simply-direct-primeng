import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NG_MODULES } from '../../../../imports.modules';
import { PRIME_NG_MODULES } from '../../../../imports.primeng';
import { CoreService } from '@simply-direct/ngx-core';


@Component({
    selector: 'topbar-widget',
    imports: [...NG_MODULES,...PRIME_NG_MODULES],
    template: `
        <div class="font-medium text-xl" >
            <b>IOT</b> 
            <i class="pi pi-spin pi-microchip mx-2 text-primary" style="font-size: 1.8rem"></i>
            <span>Appliance</span>
        </div>

        <a pButton [text]="true" severity="secondary" [rounded]="true" pRipple class="lg:!hidden" pStyleClass="@next" enterFromClass="hidden" leaveToClass="hidden" [hideOnOutsideClick]="true">
            <i class="pi pi-bars !text-2xl"></i>
        </a>

        <div class="items-center bg-surface-0 dark:bg-surface-900 grow justify-between hidden lg:flex absolute lg:static w-full left-0 top-full px-12 lg:px-0 z-20 rounded-border">
            <ul class="list-none p-0 m-0 flex lg:items-center select-none flex-col lg:flex-row cursor-pointer gap-8">
                <li>
                    <a (click)="router.navigate(['/landing'], { fragment: 'home' })" pRipple class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl">
                        <span>Home</span>
                    </a>
                </li>
                <li>
                    <a (click)="router.navigate(['/landing'], { fragment: 'features' })" pRipple class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl">
                        <span>Features</span>
                    </a>
                </li>
                <li>
                    <a (click)="router.navigate(['/landing'], { fragment: 'highlights' })" pRipple class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl">
                        <span>Highlights</span>
                    </a>
                </li>
                <li>
                    <a (click)="router.navigate(['/landing'], { fragment: 'pricing' })" pRipple class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl">
                        <span>Pricing</span>
                    </a>
                </li>
            </ul>
            <div class="flex border-t lg:border-t-0 border-surface py-4 lg:py-0 mt-4 lg:mt-0 gap-2">
                @if(!core.$auth()) {
                    <button pButton pRipple label="Login" routerLink="/auth/login" [rounded]="true" [text]="true"></button>
                    <button pButton pRipple label="Register" routerLink="/auth/login" [rounded]="true"></button>
                } 
                @else {
                    <p-button [label]="$username() + ' > home'" icon="pi pi-user" rounded severity="info" routerLink="/wa"></p-button>
                }
            </div>
        </div> `
})
export class TopbarWidget {
    readonly core = inject(CoreService);
    $username = computed(() => this.core.$auth()?.user?.name);
    constructor(public router: Router) {}
}

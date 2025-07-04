import { Component, input } from '@angular/core';
import { NG_MODULES } from '../../../imports.modules';
import { PRIME_NG_MODULES } from '../../../imports.primeng';


export interface IItem { created_at?: Date, updated_at?: Date, created_by_user?: string, updated_by_user?: string }

@Component({
    standalone: true,
    selector: 'app-form-entity-details',
    template: `@if(item(); as item) {
                <div class="flex items-center gap-2 w-full mb-1 text-gray-500">
                    <div>Created at</div>
                    <div><b>{{ item.created_at | date:'medium' }}</b></div>
                    @if(item.created_by_user) {<div>by <b>{{ item.created_by_user }}</b></div>}
                </div>

                <div class="flex items-center gap-2 w-full mb-1 text-gray-500">
                    <div>Updated at</div>
                    <div><b>{{ item.updated_at | date:'medium' }}</b></div>
                    @if(item.updated_by_user) { <div>by <b>{{ item.updated_by_user }}</b></div> }
                </div>
                }`,
    imports: [...NG_MODULES, ...PRIME_NG_MODULES],
})
export class FormEntityDetails {
    readonly item = input.required<IItem | null>()
}
    

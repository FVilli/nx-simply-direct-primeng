import { inject } from "@angular/core";
import { patchState, signalStore, type, withMethods, withState } from "@ngrx/signals";
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { User } from "@simply-direct/common";
import { AuditInfo, CoreService, GetHash, setBusy, setError, withCrudEntities } from "@simply-direct/ngx-core";

export type UserWithPassword = User & { password1?: string; password2?: string; };

export interface UsersCrudState {
    readonly busy: boolean;
    readonly editedItem: Partial<UserWithPassword & AuditInfo> | null;
    readonly error: string;
}

export const initialUsersCrudState: UsersCrudState = {
    busy: false,
    editedItem: null,
    error: '',
}

export const UsersCrudStore = signalStore(
    withState(initialUsersCrudState), 
    withCrudEntities<User,'user'>({ entity: type<User>(), collection: 'user' }),
    withMethods(store => { 

        const core = inject(CoreService);
        const _createUser = async (userVM: Partial<UserWithPassword>)=>{
            patchState(store, setBusy(true),setError());
            try {
                const user = await mngPassword(core,userVM);
                await store.createItem(user);
            } catch (err:any) {
                patchState(store, setError(err.message),setBusy(false));
            }
        }

        const _updateUser = async (id:number, userVM: Partial<UserWithPassword>)=>{
            patchState(store, setBusy(true),setError());
            try {
                const user = await mngPassword(core,userVM);
                await store.updateItem(id, user);
            } catch (err:any) {
                patchState(store,setError(err.message),setBusy(false));
            }
            patchState(store, setBusy(false));
        }

        return {
            createUser: async (user: Partial<UserWithPassword>) => { await _createUser(user);},
            updateUser: async (id:number, user: Partial<UserWithPassword>) => { await _updateUser(id,user); },
        }
    }), 
    withDevtools('usersCrud'),
);

// -------------------------------------------------------------
// HELPERS
// -------------------------------------------------------------

async function mngPassword(core: CoreService, item: Partial<UserWithPassword>):Promise<Partial<User>> {
    if(!item.password1) return item;
    const pHash = await GetHash(item.password1);
    item.phash = pHash;
    delete item.password1;
    delete item.password2;
    return item;
}


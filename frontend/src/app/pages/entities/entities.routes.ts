import { Routes } from '@angular/router';
import { UsersCrud } from './users/users.component';

export default [
    { path: 'users', data: { breadcrumb: 'Users' }, component: UsersCrud },
    { path: '**', redirectTo: '/notfound' },
] as Routes;

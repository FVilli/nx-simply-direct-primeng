import { Routes } from '@angular/router';
import { UsersCrud } from './users/users';

export default [
    { path: 'users', data: { breadcrumb: 'Users' }, component: UsersCrud },
    { path: '**', redirectTo: '/notfound' },
] as Routes;

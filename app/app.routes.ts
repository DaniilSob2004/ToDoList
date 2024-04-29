import { Routes } from '@angular/router';

import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home'
    },
    {
        path: 'sign-in',
        component: SignInComponent,
        title: 'Sign In'
    },
    {
        path: 'sign-up',
        component: SignUpComponent,
        title: 'Sign Up'
    }
];

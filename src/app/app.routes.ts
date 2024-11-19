import { Routes } from '@angular/router';
import { ChatComponent } from './pages/chat/chat.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './auth.guard';
export const routes: Routes = [
    // create routes objects
    {
        path:'chat',
        canActivate:[authGuard],
        loadComponent:()=> import('./pages/chat/chat.component').then((com)=>
        com.ChatComponent
        )
    }
    ,
    {
        path:'login',
        loadComponent:()=> import('./pages/login/login.component').then((com)=>
        com.LoginComponent
        )
    },
    {
        path:'',
        loadComponent:()=> import('./pages/login/login.component').then((com)=>
        com.LoginComponent
        )
    }
];

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  // create a get fucntion
  if(inject(AuthService).isLoggedIn===false){
    inject(Router).navigate(['/login'])
    return false;
  }
  else{
    return true
  }
};

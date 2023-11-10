import { Injectable } from '@angular/core';
import { SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
import { GoogleLoginProvider } from "@abacritt/angularx-social-login";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  checked=false;
  user!: SocialUser;
  loggedIn!: boolean;
  originalPath!:string;

  constructor(private authService: SocialAuthService,
    private router:Router) {
    this.init();
  }

  init() {
    // Recupera la información de autenticación del usuario del almacenamiento local
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      this.user = JSON.parse(savedUser);
      this.loggedIn = true;
      this.router.navigate(['']);
    } else {
      this.authService.authState.subscribe((user) => {
        this.user = user;
        this.loggedIn = (user != null);
        if(this.loggedIn){
          // Almacena la información de autenticación del usuario en el almacenamiento local
          localStorage.setItem('user', JSON.stringify(user));
          if(this.originalPath){
            this.router.navigate([this.originalPath]);
            this.originalPath='';
          }else
            this.router.navigate(['']);
        }else{
          this.router.navigate(['/login']);
        }
      });
    }
  }

  isAuth():boolean{
    return this.loggedIn;
  }

  async refreshToken(): Promise<void> {
    return this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }

  async signOut(): Promise<void> {
    // Borra la información de autenticación del usuario del almacenamiento local
    localStorage.removeItem('user');
    return await this.authService.signOut();
  }

  get authServicePublic() {
    return this.authService;
  }  
}

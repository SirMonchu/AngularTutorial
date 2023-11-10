import { EnvironmentInjector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoteComponent } from './components/note/note.component';
import { ButtonComponent } from './components/button/button.component';
import { Error404Component } from './pages/error404/error404.component';
import { NewComponent } from './pages/new/new.component';
import { NotesComponent } from './pages/notes/notes.component';
import { FormNoteComponent } from "./components/form-note/form-note.component";
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment.development';

import {
  GoogleLoginProvider,
} from '@abacritt/angularx-social-login';

@NgModule({
    declarations: [
        AppComponent,
        NoteComponent,
        Error404Component,
        NewComponent,
        NotesComponent,
        NavBarComponent,
    ],
    providers: [
        {
            provide: 'SocialAuthServiceConfig',
            useValue: {
              autoLogin: false,
              providers: [
                {
                  id: GoogleLoginProvider.PROVIDER_ID,
                  provider: new GoogleLoginProvider(
                    '209983205711-fidbvnpq5djmmaa8o8p6n0skggcbmsuc.apps.googleusercontent.com'
                  )
                },
              ],
              onError: (err) => {
                console.error(err);
              }
            } as SocialAuthServiceConfig,
          }
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ButtonComponent,
        FormsModule,
        FormNoteComponent,
        SocialLoginModule,
        HttpClientModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule
    ]
})
export class AppModule { }

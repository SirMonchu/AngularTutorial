import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { guardGuard } from './guards/guard.guard';
import { loginGuard } from './guards/login.guard';
import { NewComponent } from './pages/new/new.component';
import { NoteComponent } from './components/note/note.component';
import { LoginComponent } from './pages/login/login.component';
import { Error404Component } from './pages/error404/error404.component';
import { NotesComponent } from './pages/notes/notes.component';

const routes: Routes = [
  {path:"notes", component:NotesComponent ,
  canActivate:[loginGuard]},
  {path:"newnote", component:NewComponent,
  canActivate:[loginGuard]},
  {path:"about", loadComponent: ()=>import('./pages/about/about.component').then(c=>c.AboutComponent)},
  {path:'', redirectTo:'/notes', pathMatch:'full'},
  {path:'login', component:LoginComponent,
    canActivate:[loginGuard]},
  {path:'**', component:Error404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

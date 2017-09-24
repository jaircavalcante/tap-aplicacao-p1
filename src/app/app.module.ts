import { HomeComponent } from './home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import { FormsModule } from '@angular/forms';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { RouterModule, Routes } from '@angular/router';
import { AlunoComponent } from './aluno/aluno.component';
import { VerAlunoComponent } from './ver-aluno/ver-aluno.component';
import { PdfComponent } from './pdf/pdf.component';

export const config = {
  apiKey: "AIzaSyABfKgtKGWOCqzm-XASGv4za3pDYR3t8UE",
  authDomain: "tap-projeto-av1.firebaseapp.com",
  databaseURL: "https://tap-projeto-av1.firebaseio.com",
  projectId: "tap-projeto-av1",
  storageBucket: "",
  messagingSenderId: "259300387992"
};

const rotas: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'home', component : HomeComponent},
  { path: 'alunos', component : AlunoComponent},
  { path: 'verAlunos', component : VerAlunoComponent},
  {
    path: '',
    redirectTo: 'login',
    pathMatch : 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AlunoComponent,
    VerAlunoComponent,
    PdfComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    RouterModule.forRoot(rotas)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

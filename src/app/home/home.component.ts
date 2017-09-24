import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  authState: any = null;
  usuarioAutenticado : string = "";

  constructor( private autenticacaoFirebase: AngularFireAuth, private db: AngularFireDatabase, private afAuth: AngularFireAuth, private router : Router) { 
    this.autenticacaoFirebase.authState.subscribe((auth) => {
      if(auth){
        this.authState = auth.email;
        this.db.list('/usuarios', { preserveSnapshot: true }).subscribe(snapshots => {
          snapshots.forEach(snapshot => {
            let user = snapshot.val();
            if(this.authState == user.email){
              if(user.perfil == "A"){
                this.usuarioAutenticado = "ADMIN";
              }
            }
          });
        })
      }
    });
  }

  sair(){
    this.authState = null;
    this.afAuth.auth.signOut()
    this.router.navigate(['login']);
  }
}

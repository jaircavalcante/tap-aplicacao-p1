import { Injectable } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { AngularFireDatabase } from "angularfire2/database";

@Injectable()
export class AutenticacaoService {

  authState: any = null;
  
    constructor(private autenticacaoFirebase: AngularFireAuth, private database: AngularFireDatabase) {
      this.autenticacaoFirebase.authState.subscribe((auth) => {
        this.authState = auth
      });
    }
  
    // Returns true if user is logged in
    authenticated(): boolean {
      return this.authState !== null;
    }
  
    // Returns current user data
    currentUser(): any {
      return this.authenticated ? this.authState : null;
    }
  
    // Returns
    currentUserObservable(): any {
      return this.autenticacaoFirebase.authState
    }
  
    // Returns current user UID
    get currentUserId(): string {
      return this.authenticated ? this.authState.uid : '';
    }
  
    emailSignUp(email: string, password: string): any {
      return this.autenticacaoFirebase.auth.createUserWithEmailAndPassword(email, password).then(function (response) {
        return response;
      }).catch(function (err: firebase.FirebaseError) {
        var obj = {error: err.code}
        return obj;
      });
    }
  
    validarAcesso(email : string ,senha : string) : any {
      return this.autenticacaoFirebase.auth.signInWithEmailAndPassword(email,senha).then(function(response){
        if(response){
          return response;
        }
      }).catch(function (err: firebase.FirebaseError) {
        var obj = {error: err.code}
        return obj;
      });
    }

}

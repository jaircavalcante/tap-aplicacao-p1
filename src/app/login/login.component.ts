import { Router } from '@angular/router';
import { AutenticacaoService } from './../autenticacao.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { User } from './../models/user';
import { Component } from "@angular/core";
import { FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from "angularfire2/auth";
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AutenticacaoService]
})
export class LoginComponent {

  usuarios: FirebaseListObservable<any>;
  user: User;
  usuarioCriado: boolean = false;

  //Variaveis
  telaLogin: boolean = true;
  mensagemAlerta: string = "";
  telaCadastroNovoUsuario: boolean = false;
  danger: boolean = false;
  sucesso: boolean = false;

  constructor(private db: AngularFireDatabase, private autenticacaoService: AutenticacaoService, private router : Router) {
    this.usuarios = db.list('/usuarios');
    this.user = new User();
  }

  mudarTela(nome) {
    if (nome == 'cadastro') {
      this.telaLogin = false;
      this.telaCadastroNovoUsuario = true;
    } else {
      this.telaLogin = true;
      this.telaCadastroNovoUsuario = false;
    }
  }

  login(usuario) {
    this.mensagemAlerta = "";
    this.iniciarAlertas();
    this.autenticacaoService.validarAcesso(usuario.email, usuario.senha).then((response) => {
      if (response && response.error) {
        if (response.error == "auth/wrong-password") {
          this.mensagemAlerta = "Senha Inválida.";
        } else if (response.error == "auth/user-not-found") {
          this.mensagemAlerta = "Email inválido.";
        } else {
          this.mensagemAlerta = "Não foi possivel realizar o Login";
        }
        this.danger = true;
      }else{
        this.router.navigate(['home']);
      }
    });
  }

  iniciarAlertas() {
    this.danger = false;
    this.sucesso = false;
  }

  removerMensagemAlerta(tipo) {
    if (tipo == "danger") {
      this.danger = false;
      this.mensagemAlerta = "";
    }
    if (tipo == "sucesso") {
      this.sucesso = false;
      this.mensagemAlerta = "";
    }
  }

  validarUsuarioCriado(criado) {
    if (criado == true) {
      this.telaLogin = true;
      this.telaCadastroNovoUsuario = false;
      this.mensagemAlerta = "Sua Conta foi criada."
      this.sucesso = true;
    } else {
      this.mensagemAlerta = "Não foi possivel criar o usuário"
      this.danger = true;
    }
  }

  criarConta(usuario) {
    this.autenticacaoService.emailSignUp(usuario.email, usuario.senha).then((response) => {
      if (response && response.error) {
        if (response.error == "auth/email-already-in-use") {
          this.mensagemAlerta = "Email informado já está em uso.";
        } else if (response.error == "auth/invalid-email") {
          this.mensagemAlerta = "Email inválido.";
        } else if (response.error == "auth/weak-password") {
          this.mensagemAlerta = "Senha deve ser maior que 6 digitos.";
        } else {
          this.mensagemAlerta = "Ocorreu um erro";
        }
        this.validarUsuarioCriado(false);
      } else {
        delete usuario.senha;

        this.usuarios.push(usuario).then((response) => {
          this.validarUsuarioCriado(true);
        });
      }
    });
  }
}
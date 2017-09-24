import { Router } from '@angular/router';
import { Aluno } from '../models/aluno';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-aluno',
  templateUrl: './aluno.component.html',
  styleUrls: ['./aluno.component.css']
})
export class AlunoComponent {

  model: Aluno;
  alunos: any = [];
  mensagemAlerta: string = "";
  sucesso: boolean = false;
  error: boolean = false;

  constructor(private db: AngularFireDatabase) {
    this.alunos = db.list('/alunos');
    this.novoAluno();
  }

  salvar() {
    this.alunos.push(this.model).then((response) => {
      this.sucesso = true;
      this.mensagemAlerta = "Aluno criado com Sucesso";
    }, (error) => {
      this.error = true;
      this.mensagemAlerta = "Ocorreu um erro ao criar o Aluno";
    });
  }

  novoAluno() {
    this.model = new Aluno('', '', '', '', '');
  }

  removerMensagemAlerta(tipoAlerta) {
    this.mensagemAlerta = "";
    if (tipoAlerta == 'sucesso') {
      this.sucesso = false;
    }else{
      this.error = false;
    }
  }
}

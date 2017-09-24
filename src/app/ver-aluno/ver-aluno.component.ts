import { Aluno } from '../models/aluno';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-ver-aluno',
  templateUrl: './ver-aluno.component.html',
  styleUrls: ['./ver-aluno.component.css']
})
export class VerAlunoComponent {

  alunos: FirebaseListObservable<any>;
  listaAlunos = [];

  constructor(private db: AngularFireDatabase) {
    this.db.list('/alunos', { preserveSnapshot: true })
      .subscribe(snapshots => {
        this.listaAlunos = [];
        snapshots.forEach(snapshot => {
          let item = snapshot.val();
          this.listaAlunos.push(item);
        });
      })
  }
}

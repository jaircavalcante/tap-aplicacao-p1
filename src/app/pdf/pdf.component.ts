import { Component, OnInit, Inject } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

declare var jsPDF: any;

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css'],
  providers: [
    { provide: 'Window',  useValue: window }
  ]
})

export class PdfComponent {

  alunos: FirebaseListObservable<any>;
  listaAlunos = [];

  constructor( @Inject('Window') private window: Window, private db: AngularFireDatabase ) {
    this.db.list('/alunos', { preserveSnapshot: true })
    .subscribe(snapshots => {
      this.listaAlunos = [];
      snapshots.forEach(snapshot => {
        let item = snapshot.val();
        this.listaAlunos.push(item);
      });
    })
  }

  download() {

        var doc = new jsPDF();

        //Cabeçalho
        doc.setFontSize(20)
        doc.text('Relatório - Alunos', 30,30)
        doc.setFontSize(10)
        doc.text('Gerado em:' + new Date().toLocaleDateString(), 30,40 );

        // Informação Cabeçalho
        doc.setFontSize(10)

        var columns = ["ID", "Nome", "Curso","Matricula", "Periodo", "Situação"];
       
        var rows = [];
        for(var i = 0 ; i < this.listaAlunos.length; i++){
          rows.push([i + 1, this.listaAlunos[i].nome, this.listaAlunos[i].curso, this.listaAlunos[i].matricula, this.listaAlunos[i].periodo, this.listaAlunos[i].situacao]);
        }

        doc.autoTable(columns, rows, {
          styles: {
            fillColor: [169,169,169]
          },
          columnStyles: {
            id: {
              fillColor:255
            }
          },
          margin: {
            top: 50
          },
      });

       doc.addPage();

       // Save the PDF
       doc.save('Alunos.pdf');
    }
}
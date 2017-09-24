import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerAlunoComponent } from './ver-aluno.component';

describe('VerAlunoComponent', () => {
  let component: VerAlunoComponent;
  let fixture: ComponentFixture<VerAlunoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerAlunoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerAlunoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteCollaboratorDialogComponent } from './note-collaborator-dialog.component';

describe('NoteCollaboratorDialogComponent', () => {
  let component: NoteCollaboratorDialogComponent;
  let fixture: ComponentFixture<NoteCollaboratorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoteCollaboratorDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoteCollaboratorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { COMMA, ENTER, G } from '@angular/cdk/keycodes';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/app.reducer';
import { NoteEditDialogComponent } from '../note-edit-dialog/note-edit-dialog.component';
import { createOrEditNote, deleteNote } from '../store/notes.actions';
import { bgColors, bgImages, Note } from './note.model';
import { MatChipInputEvent } from '@angular/material/chips';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css'],
})
export class NoteComponent implements OnInit {
  showLabels = false;
  @Input() note!: Note;

  bgColors = bgColors;
  bgImages = bgImages;

  constructor(
    private dialog: MatDialog,
    private store: Store<State>,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {}

  openEditDialog(note: Note) {
    console.log(note);
    
    this.dialog.open(NoteEditDialogComponent, {
      data: { note: note },
      panelClass: 'custom-dialog-container',
    });
  }

  onDeleteNote() {
    this.store.dispatch(deleteNote({ id: this.note.id! }));
  }

  //TODO: Merge Edit and Note Component

  onShowLabels() {
    this.showLabels = true;
  }

  onPinClicked() {
    this.store.dispatch(
      createOrEditNote({
        ...this.note,
        pinned: this.note.pinned ? false : true,
      })
    );
  }

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  // TODO: Move those to NgRx ??

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.store.dispatch(
        createOrEditNote({
          ...this.note,
          labels:
            this.note.labels && this.note.labels.length > 0
              ? [...this.note.labels, value]
              : [value],
        })
      );
    }

    event.chipInput!.clear();
  }
  remove(label: string): void {
    const labels =
      this.note.labels && this.note.labels.length > 0
        ? [...this.note.labels]
        : [];
    const index = labels?.indexOf(label);

    if (index >= 0) {
      labels!.splice(index, 1);
      this.store.dispatch(
        createOrEditNote({
          ...this.note,
          labels: labels,
        })
      );
    }
  }

  // Order of colors as it should be
  originalOrder = (
    a: KeyValue<string, string>,
    b: KeyValue<string, string>
  ): number => {
    return 0;
  };

  changeBackgroundColor(color: string) {
    this.elementRef.nativeElement.children[0].style.backgroundColor =
      bgColors[color];
    this.store.dispatch(createOrEditNote({ ...this.note, background: color }));
  }

  getBackground() {
    if (!this.note.background) {
      return;
    }

    if (this.note.background === 'Default') {
      return;
    }

    if (this.note.background in bgColors) {
      return { backgroundColor: bgColors[this.note.background] };
    }

    if (this.note.background in bgImages) {
      return { backgroundImage: 'url(' + bgImages[this.note.background] + ')' };
    }

    return;
  }
}

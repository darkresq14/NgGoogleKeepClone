import { Pipe, PipeTransform } from '@angular/core';
import { Observable, filter, map } from 'rxjs';
import { Note } from './note/note.model';

@Pipe({
  name: 'notesFilter',
})
export class NotesFilterPipe implements PipeTransform {
  transform(notes: Observable<Note[]>, pinned: boolean): Observable<Note[]> {
    if (!notes) {
      return new Observable<[]>();
    }

    return notes.pipe(
      map((notes) => notes.filter((note) => note.pinned === pinned))
    );
  }
}

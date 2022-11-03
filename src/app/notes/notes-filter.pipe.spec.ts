import { NotesFilterPipe } from './notes-filter.pipe';

describe('NotesPipe', () => {
  it('create an instance', () => {
    const pipe = new NotesFilterPipe();
    expect(pipe).toBeTruthy();
  });
});

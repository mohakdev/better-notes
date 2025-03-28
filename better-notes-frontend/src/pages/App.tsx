import { useState } from 'react';
import { NoteObject } from '../logic/Note';
import ProfilePhoto from '/ProfilePhoto.svg';
import { MockNotes } from '../MockNotes';
import DeleteIcon from '/DeleteIcon.svg';

import '../css/style.css';
import "../css/noteStyle.css";
import NoteWindow from '../components/NoteWindow';

function App() {
  const [notes, setNotes] = useState<NoteObject[]>(MockNotes);
  const [showNoteWindow, setShowNoteWindow] = useState(false);
  const [selectedNote, setSelectedNote] = useState<NoteObject | null>(null);

  function OpenNote (note: NoteObject | null) {
    setSelectedNote(note);
    setShowNoteWindow(true);
  }
  function CloseNote () {
    setSelectedNote(null);
    setShowNoteWindow(false);
  }
  function AddOrModifyNote (title : string, content : string) {
    if (selectedNote) {
      const id : number = selectedNote.id;
      const updatedNote : NoteObject = { id , title, content };
      console.log(updatedNote);
      UpdateNote(updatedNote);
    } 
    else {
      const newNote = {
        id: notes.length + 1,
        title: title || '',
        content: content || '',
      };
      CreateNote(newNote);
    }
    CloseNote();
  }
  //CRUD operations functions
  function CreateNote (note: NoteObject) {
    setNotes([...notes, note]);
  }
  function UpdateNote (note: NoteObject) {
    const updatedNotes = notes.map((n) => (n.id === note.id ? note : n));
    setNotes(updatedNotes);
  }
  function DeleteNote (e : React.MouseEvent<HTMLImageElement, MouseEvent>,note: NoteObject) {
    e.stopPropagation(); // Prevent the click event from propagating to the parent div
    const updatedNotes = notes.filter((n) => n.id !== note.id);
    setNotes(updatedNotes);
  }

  //JSX of home page
  return (
    <>
      <div className="navBar">
        <h1 id='title'>My Notes</h1>
        <img id = 'profilePic' src={ProfilePhoto} alt="Profile Photo" />
      </div>

      <div id='noteContainer'>
        {notes.map((note) => (
          <div className='noteDiv' key={note.id} onClick={() => OpenNote(note) }>
            <h2 className='noteTitle'>{note.title}</h2>
            <p>{note.content.substring(0, 30) + '...'}</p>
            <img className='deleteIcon' src={DeleteIcon} alt="Delete Icon" 
            onClick={(event) => DeleteNote(event, note)}/>
          </div>
        ))}
      </div>
      <NoteWindow onSave={(title : string, content : string) => AddOrModifyNote(title, content)} 
      note={selectedNote} showNoteWindow={showNoteWindow} 
      onCancel={() => CloseNote()}/>
      <div className="footer">
        <button id='addNoteBtn' className = 'mainBtn' onClick={() => OpenNote(null)}>
          Add Note
        </button>
      </div>
    </>
  )
}

export default App;

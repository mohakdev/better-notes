import { useRef } from 'react';
import '../css/noteWindowStyle.css';
import { NoteObject } from "../logic/Note";

interface NoteWindowProps {
    showNoteWindow : boolean
    note: NoteObject | null; // Optional prop to edit an existing note
    onSave: (title : string, content : string) => void; // Callback function to save the note
    onCancel: () => void; // Callback function to cancel the note creation/editing
}

// This component is used to create a new note or edit an existing note
function NoteWindow(props : NoteWindowProps) {
    const titleRef = useRef<HTMLInputElement>(null);
    const contentRef = useRef<HTMLTextAreaElement>(null);

    function SaveNote()
    {
      const title : string = titleRef.current?.value || '';
      const content : string = contentRef.current?.value || '';
      props.onSave(title, content); // Call the save function passed as a prop
      titleRef.current!.value = ''; // Clear the input field after saving
      contentRef.current!.value = ''; // Clear the textarea after saving
    }

    return props.showNoteWindow && (
        <div className='noteWindow'>
          <input type="text" className='noteInput' id='noteTitle' placeholder='Title' 
          defaultValue={props.note?.title} ref={titleRef}/>
          <textarea className='noteInput' id='noteContent' placeholder='Write your note here...' 
          defaultValue={props.note?.content} ref={contentRef}/>
          
          <div className='noteWindowButtons'>
            <button id='saveNoteBtn' className='mainBtn' onClick={() => SaveNote()}>
              Save Note
            </button>
            <button id='cancelNoteBtn' className='mainBtn' onClick={() => props.onCancel()}>  
              Cancel
            </button>
          </div>  
      </div>
    );
}

export default NoteWindow;
import { useEffect, useState } from 'react';
import { NoteObject } from '../logic/Note';
import ProfilePhoto from '/ProfilePhoto.svg';
import DeleteIcon from '/DeleteIcon.svg';

import '../css/style.css';
import "../css/noteStyle.css";
import NoteWindow from '../components/NoteWindow';
import axiosInstance from '../logic/AxiosInstance.tsx';
import { useNavigate } from 'react-router-dom';
function App() {
  const [notes, setNotes] = useState<NoteObject[]>([]);
  const [showNoteWindow, setShowNoteWindow] = useState(false);
  const [selectedNote, setSelectedNote] = useState<NoteObject | null>(null);
  const navigate = useNavigate();
  
  
  //API Integration
  const [userInfo, setUserInfo] = useState(null);
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get('/fetch-user');
      if(response.data && response.data.user) {
        setUserInfo(response.data.user);
        console.log(userInfo);
      }
    }
    catch (error : any) {
      if(error.response.status == 401) {
        logOut();
      }
    }
  }
  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get('/notes/fetch-all');
      if(response.data) 
      {
        console.log(response.data[0]);
        setNotes(response.data);
      }
    }
    catch {
      console.log("An unexpected error occured");
    }
  }
  useEffect(() => {
    getAllNotes();
    getUserInfo();
    return () => {}
  }, []);
  function logOut() {
    localStorage.clear();
    navigate('/login');
  }
  
  //React functions
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
      const _id : string = selectedNote._id;
      const updatedNote : NoteObject = { _id , title, content };
      UpdateNote(updatedNote);
    } 
    else {
      const newNote = {
        _id: (notes.length + 1).toString(),
        title: title || '',
        content: content || '',
      };
      CreateNote(newNote);
    }
    CloseNote();
  }
  //CRUD operations functions
  async function CreateNote (note: NoteObject) {
    try {
      const response = await axiosInstance.post('/notes/add', 
      {
        "title" : note.title,
        "content" : note.content,
      });
      if(response.data) {
        getAllNotes();
      }
    }
    catch (error) {
      console.log("Unexpected error occured");
    }
  }
  async function UpdateNote (note: NoteObject) {
    try {
      const response = await axiosInstance.put('/notes/edit/' + note._id, 
      {
        "title" : note.title,
        "content" : note.content,
      });
      if(response.data) {
        getAllNotes();
      }
    }
    catch (error) {
      console.log("Unexpected error occured");
    }
  }
  async function DeleteNote (e : React.MouseEvent<HTMLImageElement, MouseEvent>,note: NoteObject) {
    e.stopPropagation(); // Prevent the click event from propagating to the parent div
    try {
      const response = await axiosInstance.delete('/notes/delete/' + note._id);
      if(response.data) {
        getAllNotes();
      }
    }
    catch (error) {
      console.log("Unexpected error occured");
    }
  }

  //JSX of home page
  return (
    <>
      <div className="navBar">
        <h1 id='title'>My Notes</h1>
        <img onClick={logOut} id = 'profilePic' src={ProfilePhoto} alt="Profile Photo" />
      </div>

      <div id='noteContainer'>
        {notes.map((note) => (
          <div className='noteDiv' key={note._id} onClick={() => OpenNote(note) }>
            <h2 className='noteTitle'>{note.title}</h2>
            <p>{note.content.substring(0, 30) + '...'}</p>
            <img className='deleteIcon' src={DeleteIcon} alt="Delete Icon" 
            onClick={(event) => DeleteNote(event, note)}/>
          </div>
        ))}
      </div>
      
      <NoteWindow onSave={(title : string, content : string) => AddOrModifyNote(title, content)} 
      note={selectedNote} showNoteWindow={showNoteWindow} onCancel={() => CloseNote()}/>

      <div className="footer">
        <button id='addNoteBtn' className = 'mainBtn' onClick={() => OpenNote(null)}>
          Add Note
        </button>
      </div>
    </>
  )
}

export default App;

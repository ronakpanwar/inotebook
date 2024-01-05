import NoteContext from "./noteContext";
import { useState } from "react";
const NoteState = (props) => {
 const host = '5000';

  const note = []

  const [notes, setNotes] = useState(note);

  const getNote = async () => {
    // todo : api call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",

      }
    });
    const json = await response.json()
   
    setNotes(json)
  }

  // add note 
  const addNote = async (title, discription, tag) => {
    // todo : api call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",

      },
      body: JSON.stringify({title , discription , tag}),
    });
    const note = await response.json()
    setNotes(notes.concat(note))
   



   
  }

  // delete note 
  const deleteNote = async(id) => {
    // todo : api call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",

      }
    });
    const json = await response.json()



    const newNote = notes.filter((note) => { return note.id !== id });
    setNotes(newNote);
  }

  //update notes
  const updateNote = async (id, title, discription, tag) => {
    // api call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",

      },
      body: JSON.stringify({title , discription , tag}),
    });
    const json = response.json()
   
    
    let newNotes = json.parse(json.stringify(notes))

    for (let index = 0; index <newNotes.length; index++) {
      const element = newNotes[index];
      if (element.id === id) {
        newNotes[index].title = title;
        newNotes[index].discription = discription;
        newNotes[index].tag = tag;

        break;
      }

    }
    setNotes(newNotes);

  }



  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, updateNote , getNote }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;

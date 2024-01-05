import React ,{useContext} from 'react';
import noteContext  from '../context/notes/noteContext';

function Notesitem(props) {

    const context = useContext(noteContext);
    const {deleteNote}= context;

    const { note , updateNotes } = props

    return (
        <div className="col-md-3">
            <div class="card my-3" >

                <div class="card-body">
                <div className="d-flex align-items-center ">
                <h5 class="card-title">{note.title}</h5>
                    <i class="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note.id)}}></i>
                    <i class="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNotes(note)}}></i>
                </div>
                  
                    <p class="card-text">{note.discription}</p>

                </div>
            </div>
        </div>
    )
}

export default Notesitem

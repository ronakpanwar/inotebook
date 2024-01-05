import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import Notesitem from './Notesitem';
import AddNote from './AddNote';

function Notes() {
  const context = useContext(noteContext);
  const { notes, getNote ,updateNote } = context;

  useEffect(() => {
    getNote()
  }, [])

  const ref = useRef(null)
  const refClose = useRef(null)
  const [note, setNote] = useState({ id: "", etitle: "", ediscription: "", etag: "" })

  const updateNotes = (currentNote) => {
    ref.current.click();
    setNote({ id: currentNote._id, etitle: currentNote.title, ediscription: currentNote.discription, etag: currentNote.tag })
  }

  const handleClick = (e) => {
    updateNote(note.id, note.etitle, note.ediscription, note.etag)
    refClose.current.click();
  }

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  return (
    <>
      <AddNote />
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="discription" className="form-label">Description</label>
                  <input type="text" className="form-control" id="ediscription" name="ediscription" value={note.ediscription} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                </div>

              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length < 5 || note.ediscription.length < 5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>
     
      <div className='row my-3'>
        <h1>your Notes</h1>
        <div className="container mx-2"> 
                {notes.length===0 && 'No notes to display'}
                </div>
        {notes.map((note) => {
          return <Notesitem key={note._id} updateNotes={updateNotes} note={note} />
        })
        }

      </div>
    </>
  )
}

export default Notes

import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [notes, setNotes] = useState([])
function fetchNotes(){
  axios.get('http://localhost:3000/api/notes')
.then((res)=>{
  setNotes(res.data.notes)
})
}

useEffect(()=>{
 fetchNotes()
},[])
function submitHandler(e){
e.preventDefault()

const {title,description}=e.target.elements
 axios.post("http://localhost:3000/api/notes",{
  title:title.value,
  description:description.value
})
.then(()=>{
  fetchNotes()
})

}
function handleDeleteNote(noteId){
axios.delete("http://localhost:3000/api/notes/"+noteId)
.then(res=>{
  console.log(res.data)
  fetchNotes()
})
}

  return (
    <>
    <form className='note-create-form' onSubmit={submitHandler}>
      <input name='title' type="text"  placeholder='Enter title'/>
      <input name='description't ype="text" placeholder='Enter Description' />
      <button>create note</button>
    </form>
    <div className="notes">
      {notes.map(note => (
        <div className="note" >
          <h1>{note.title}</h1>
          <p>{note.description}</p>
          <button onClick={()=>{
            handleDeleteNote(note._id)
          }}>Delete</button>
        </div>
      ))}
    </div>
    </>
  )
}


export default App
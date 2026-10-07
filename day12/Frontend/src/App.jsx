
import{useState,useEffect } from 'react'
import axios from "axios"



const App = () => {

  const [notes, setnotes] = useState([])

function submitHandler(e){
    e.preventDefault()
const form =e.target
    const {title,description}=e.target.elements

    axios.post("https://backend-jxuw.onrender.com//api/notes",{
      title:title.value,
      description:description.value
    })
    .then(()=>{
      fetchNOtes()
        form.reset()
    })
  }
  function fetchNOtes(){
    axios.get("https://backend-jxuw.onrender.com//api/notes")
    .then((res)=>{
      setnotes(res.data.notes)
    })
  }
  useEffect(()=>{
    fetchNOtes()
  
  },[])
  
  function handleDeleteNote(noteId){
    axios.delete("https://backend-jxuw.onrender.com//api/notes/"+noteId)
    .then(res=>{
      console.log(res.data)
      fetchNOtes()
    })
  }
  function updatehandler(noteId,olddescription){
    const newdescription = prompt("newdescription", olddescription)
    if (!newdescription) return
      
    axios.patch("https://backend-jxuw.onrender.com//api/notes/"+noteId, { description: newdescription })
    .then(res=>{
      fetchNOtes()
    })
  }

  return (


  <>
  <div className="form">
  <form className='note-create-form'onSubmit={submitHandler} >
<input name="title" type="text" placeholder='Enter Title' />
<input name='description' type="text" placeholder='Enter Description' />
<button className='btn'>Create Notes</button>
  </form>
  </div>
  <div className="notes">
    {notes.map(note=>(
      <div className="note">
        <h1>{note.title}</h1>
        <p>{note.description}</p>
        <button onClick={() => updatehandler(note._id, note.description)}>
  Edit
</button>
        <button className='btn' onClick={()=>{
          handleDeleteNote(note._id)
        }}>Delete Notes</button>
      </div>
    
  ))}
  </div>
  </> 
  )
}

export default App
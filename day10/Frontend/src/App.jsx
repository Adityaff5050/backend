import { useState, useEffect } from "react"
import axios from "axios"

const App = () => {
  const [notes, setNotes] = useState([])

  function fetchNotes() {
    axios
      .get("http://localhost:3000/api/notes")
      .then((res) => {
        setNotes(res.data.notes)
      })
      .catch((err) => console.error(err))
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  function handleSubmit(e) {
    e.preventDefault()

    const form = e.target
    const { title, description } = form.elements

    axios
      .post("http://localhost:3000/api/notes", {
        title: title.value,
        description: description.value,
      })
      .then(() => {
        fetchNotes()
        form.reset()
      })
      .catch((err) => console.error(err))
  }

  function handleDelete(noteid) {
    axios
      .delete("http://localhost:3000/api/notes/" + noteid)
      .then(() => {
        fetchNotes()
      })
      .catch((err) => console.error(err))
  }

  function handleUpdate(noteid, oldDescription) {
    const newDescription = prompt("New description:", oldDescription)
    if (!newDescription) return

    axios
      .patch("http://localhost:3000/api/notes/" + noteid, {
        description: newDescription,
      })
      .then(() => {
        fetchNotes()
      })
      .catch((err) => console.error(err))
  }

  return (
    <>
      <form className="note-create-form" onSubmit={handleSubmit}>
        <input name="title" type="text" placeholder="Enter Title" />
        <input name="description" type="text" placeholder="Enter Description" />
        <button>Create Note</button>
      </form>

      <div className="notes">
        {notes.map((note) => (
          <div className="note" key={note._id}>
            <h1>{note.title}</h1>
            <p>{note.description}</p>

            <div className="note-actions">
              <button onClick={() => handleUpdate(note._id, note.description)}>
                Edit Description
              </button>
              <button onClick={() => handleDelete(note._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default App
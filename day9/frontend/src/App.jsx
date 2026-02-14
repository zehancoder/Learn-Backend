import { useEffect, useRef, useState } from "react";
import axios from "axios";
function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [edit, setEdit] = useState(false);
  const editId = useRef(0);
  const getData = () => {
    axios.get("http://localhost:3000/notes").then((res) => {
      setNotes(res.data);
      console.log(res.data);
    });
    setTitle("");
    setDescription("");
  };

  useEffect(() => {
    getData();
  }, []);
  const createNote = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/notes", { title, description })
      .then((res) => {
        getData();
      });
  };
  const deleteNote = (noteId) => {
    console.log(noteId);

    axios.delete("http://localhost:3000/notes/" + noteId).then((res) => {
      getData();
    });
  };
  const editNote = (noteId) => {
    setEdit(true);
    editId.current = noteId
    const editableNote = notes.find((item) => item._id === noteId);
    setTitle(editableNote.title);
    setDescription(editableNote.description);
  };
  const confirmNote = (e) => {
    e.preventDefault();
    setEdit(false)
    axios
      .patch("http://localhost:3000/notes/" + editId.current, { title, description })
      .then((res) => {
        getData();
      });

    setTitle('');
    setDescription('')
  };

  return (
    <>
      <div>
          <div id="inputBox">
            <input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              type="text"
              placeholder="title"
            />
            <input
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              type="text"
              placeholder="description"
            />
           {edit ? <button  onClick={(e) => confirmNote(e)}>Confirm</button> : <button  onClick={(e) => createNote(e)}>Create</button>}
          </div>
        {/* {edit && (
          <form id="editBox" onSubmit={(e) => confirmNote(e)}>
            <input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              type="text"
              placeholder="title"
            />
            <input
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              type="text"
              placeholder="description"
            />
            <button>Confirm</button>
          </form>
        )} */}
        <div className="content">
          {notes.length > 0 &&
            notes.map((note) => {
              return (
                <div className="main-content">
                  <p className="title">{note.title}</p>
                  <p className="desc">{note.description}</p>
                  <div className="buttonBox">
                    <button
                      className=""
                      onClick={() => editNote(note._id)}
                    >
                      Edit
                    </button>
                    <button
                      className=""
                      onClick={() => deleteNote(note._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default App;

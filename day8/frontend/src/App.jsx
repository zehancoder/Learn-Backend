import { useEffect, useState } from "react";
import axios from "axios";
function App() {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3000/notes").then((res) => {
      setNotes(res.data.noteFromdb);
      console.log(res.data.noteFromdb);
    });
  }, []);

  return (
    <>
      <div>
        <div className="content">
          {notes.length > 0 &&
            notes.map((note) => {
              return (
                <div className="main-content">
                  <p className="title">{note.title}</p>
                  <p className="desc">{note.description}</p>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default App;

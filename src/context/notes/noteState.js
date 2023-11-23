import NoteContext from "./noteContext";
import { useState } from "react";
const NoteState = (props)=>{
  const note = [
    {
   "title":"the topis",
   "discription":"add the topics"
  },
  {
    "title":"the topis",
    "discription":"add the topics"
   },

]
  
const [notes , setNotes] = useState(note);


return(
    <NoteContext.Provider value={{notes,setNotes}}>
       {props.children}
    </NoteContext.Provider>
)
}

export default NoteState;

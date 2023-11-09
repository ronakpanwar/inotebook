import React ,{useContext ,useEffect} from 'react'
import noteContext from '../context/notes/noteContext'

function About() {
   const a = useContext(noteContext);
   useEffect(()=>{
    a.update();
   },[])
  return (
    <div>
      this is about {a.state.name} , he is study in  {a.state.class}
    </div>
  )
}

export default About

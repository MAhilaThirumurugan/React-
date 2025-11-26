import React, {  useState,useEffect } from 'react'
import { useParams ,Link,useNavigate} from 'react-router-dom'
function Viewstory() {
    const navigate=useNavigate();
    const {id,tot}= useParams();
    const[story,setStory]=useState(null);
    useEffect(()=>{
        fetch('http://localhost:3001/story/'+id).
        then((data)=>data.json()).
        then(data=>setStory(data)).catch(err=>console.log(err))
    },[id])
    
  
    if ( id > tot || id<=0) {
      navigate("/");
    }
 
  return (
    
        <div>
           {story? (
            <div className='d-flex justify-content-center align-items-center'>
               <Link to={`/story/${Number(id) - 1}/${tot}`}>
               <i class="bi bi-caret-left-fill"></i></Link> 
            <img  className=" story-image"src={story.storyimage} />
            <Link to={`/story/${Number(id) + 1}/${tot}`}><i class="bi bi-caret-right-fill"></i></Link> 
            </div>)
            :
            
            (<div>Loading</div>)}
        </div>
    
  )
}

export default Viewstory




// import React, { useState, useEffect } from "react";
// import { useParams, Link, useNavigate } from "react-router-dom";

// function Viewstory() {
//   const navigate = useNavigate();
//   const { id, tot } = useParams();
//   const [story, setStory] = useState(null);

//   const currentId = Number(id);
//   const total = Number(tot);

//   // Redirect if story ID is out of range
//   useEffect(() => {
//     if ( currentId > total) {
//       navigate("/");
//     }
//   }, [currentId, total, navigate]);

//   // Fetch story
//   useEffect(() => {
//     fetch(`http://localhost:3001/story/${currentId}`)
//       .then((data) => data.json())
//       .then((data) => setStory(data))
//       .catch((err) => console.log(err));
//   }, [currentId]);

//   return (
//     <div>
//       {story ? (
//         <div className="d-flex justify-content-center align-items-center">

//           {/* Previous button (hidden when id = 1) */}
//           {currentId > 1 && (
//             <Link to={`/story/${currentId - 1}/${total}`}>
//               <i className="bi bi-caret-left-fill fs-1"></i>
//             </Link>
//           )}

//           <img className="story-image" src={story.storyimage} />

//           {/* Next button (hidden when id = last story) */}
//           {currentId < total && (
//             <Link to={`/story/${currentId + 1}/${total}`}>
//               <i className="bi bi-caret-right-fill fs-1"></i>
//             </Link>
//           )}

//         </div>
//       ) : (
//         <div>Loading...</div>
//       )}
//     </div>
//   );
// }

// export default Viewstory;

import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
function Story() {
  const navigate=useNavigate();
  let tot=0;
  const[stories,setStories]=useState([])
  useEffect(()=>{
    fetch('http://localhost:3001/story').
    then((data)=>data.json()).
    then((data=>setStories(data))).
    catch((err=>console.log(err)))
  },[])
  return (
    <>
    <div className=' story d-flex  ' >
      <div className='d-none'>
        {tot=stories.length
        }
      </div>
    {stories.length > 0?(
      stories.map((story)=>(
        <div key={story.id} className='mx-1' onClick={()=>{navigate(`/story/${story.id}/${tot}`)}}>
          <div className='gradient-border'>
           <img  className =' story-dp  rounded-circle' src={story.image}/>
           </div>
           <p className='text-truncate' style={{width:"50px"}}>{story.name}</p>
          </div>
      ))
    ):(
      <p> loading</p>
    ) }
    
    </div>
    </>
  )
}

export default Story
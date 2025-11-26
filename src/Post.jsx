import React, { useEffect, useState } from 'react'

function Post() {

    const[posts,setPosts]=useState([])
    useEffect(()=>{
    fetch('http://localhost:3001/posts').
    then((data)=>data.json()).
    then((data=>setPosts(data))).
    catch((err=>console.log(err)))
},[])
return (
    <div className='d-flex justify-content-center'>
      {posts.length > 0 ? (
        <div>
          {posts.map((posts) => (
            <div  className="my-3"key={posts.id}>
              <div className='d-flex'>
                <img   className=' dp rounded-circle' src={posts.image}/>
                <h5>{posts.name}</h5>
              </div>
               <img  className='image'src ={posts.image} />
               <div>
                   <i className="bi bi-heart"></i>
                   <i className="bi bi-chat"></i>
                   <i className="bi bi-send"></i>
                </div>
                <b>{posts.likes} likes</b>
                <p>{posts.caption}</p>
            </div>
          ))}
        </div>
      ) : (
        <div>Loading Posts..</div>
      )}
    </div>
  );
}

export default Post;
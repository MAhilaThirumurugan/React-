import axios from 'axios';
import React, { useState, useEffect } from 'react';

function Suggesion() {
  const [profile, setProfile] = useState(null);
  const [suggesion, setSuggesion] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/profile')
      .then(res => res.json())
      .then(data => setProfile(data));

    fetch('http://localhost:3001/suggesions')
      .then(res => res.json())
      .then(data => setSuggesion(data));
  }, []);

  const handlefollower = async (userId, name, image) => {
    // Prevent following yourself
    if (profile && profile.userId === userId) {
      alert("You cannot follow yourself");
      return;
    }

    axios.post('http://localhost:3001/followers', {
      userId,
      name,
      image
    })
    .then(() => alert("Followed"))
    .catch(e => console.log(e));
  };

  return (
    <div className='suggesion w-75 m-4'>

      {/* PROFILE SECTION */}
      {profile ? (
        <div className='d-flex'>
          <img className='dp rounded-circle' src={profile.image} alt="" />
          <h5 className='ms-2'>{profile.name}</h5>
          <small className='ms-auto text-primary'>switch</small>
        </div>
      ) : (
        <div>Loading...</div>
      )}

      {/* TITLE */}
      <div className='d-flex mt-3'>
        <p>Suggested for you</p>
        <b className='ms-auto'>See all</b>
      </div>

      {/* SUGGESTIONS LIST */}
      {suggesion.length > 0 ? (
        suggesion.map(item => (
          <div className='my-3' key={item.id || item.userId}>
            <div className='d-flex'>
              <img className='dp rounded-circle' src={item.image} alt="" />
              <h5 className='ms-2'>{item.name}</h5>

              <button
                onClick={() =>
                  handlefollower(item.userId, item.name, item.image)
                }
                className='btn btn-primary btn-sm ms-auto'
              >
                Follow
              </button>
            </div>
          </div>
        ))
      ) : (
        <div>Loading Posts..</div>
      )}
    </div>
  );
}

export default Suggesion;

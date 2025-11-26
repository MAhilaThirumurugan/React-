import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Profile() {
  const [profile, setProfile] = useState(null);
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/profile')
      .then(res => setProfile(res.data))
      .catch(err => console.log(err));

    axios.get('http://localhost:3001/followers')
      .then(res => setFollowers(res.data))
      .catch(err => console.log(err));
  }, []);

  function handleonchange(e) {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  }

  const handleupdate = async () => {
    try {
      await axios.put("http://localhost:3001/profile", profile);
      alert("Profile Updated");
    } catch (err) {
      console.log(err);
    }
  };

  const handleunfollow = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/followers/${id}`);
      setFollowers(prev => prev.filter(f => f.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='m-5'>

      {/* PROFILE */}
      {profile ? (
        <div>
          <img src={profile.image} className='rounded-circle profile' alt="profile" />
          <h5>{profile.name}</h5>

          <input
            type="text"
            value={profile.name}
            name="name"
            className='form-control my-4 w-50'
            onChange={handleonchange}
          />

          <input
            type="text"
            value={profile.image}
            name="image"
            className='form-control my-4 w-50'
            onChange={handleonchange}
          />

          <button onClick={handleupdate} className='btn btn-primary my-4'>
            Update
          </button>
        </div>
      ) : <div>Loading...</div>}

      {/* FOLLOWERS */}
      {followers.length ? (
        followers.map(f => (
          <div
            key={f.id}
            className="d-flex justify-content-between align-items-center border rounded p-2 mb-2"
            style={{ maxWidth: "350px" }}
          >
            <span className="fw-semibold">{f.name}</span>

            <button
              onClick={() => handleunfollow(f.id)}
              className="btn btn-danger btn-sm"
            >
              Unfollow
            </button>
          </div>
        ))
      ) : (
        <div>Loading followers...</div>
      )}

    </div>
  );
}

export default Profile;

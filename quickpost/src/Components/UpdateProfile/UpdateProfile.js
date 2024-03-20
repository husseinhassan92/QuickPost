import React, { useState, useEffect } from 'react';
import axios from 'axios';




function UpdateProfile() {
  const [profileData, setProfileData] = useState({
    first_name: '',
    last_name: '',
    birth_date: '',
    image: null,
  });
  const imageUrl = `http://127.0.0.1:8000/api/profile/${profileData.image}`;

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `JWT ${localStorage.getItem('access')}`,
          },
        };

        const response = await axios.get('http://127.0.0.1:8000/api/profile/', config);
        setProfileData(response.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, []);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleImageChange = event => {
    const imageFile = event.target.files[0];
    setProfileData({ ...profileData, image: imageFile });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('first_name', profileData.first_name);
      formData.append('last_name', profileData.last_name);
      formData.append('birth_date', profileData.birth_date);
      formData.append('image', profileData.image);

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `JWT ${localStorage.getItem('access')}`,
          Accept: 'application/json',
        },
      };

      const response = await axios.put('http://127.0.0.1:8000/api/profile/15/', formData, config);
      console.log('Profile updated successfully:', response.data);
      // Update state with the new data received from the server
      setProfileData(response.data);
    } catch (error) {
      console.error('Error updating profile:', error);
      // Handle error, show error message, etc.
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Input fields for updating profile data */}
        <label>
          First Name:
          <input
            type="text"
            name="first_name"
            value={profileData.first_name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            name="last_name"
            value={profileData.last_name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Birth Date:
          <input
            type="date"
            name="birth_date"
            value={profileData.birth_date}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Profile Image:
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </label>
        <button type="submit">Update Profile</button>
      </form>
      {/* Display the profile data */}
      <div>
        <h2>Profile</h2>
        <p>First Name: {profileData.first_name}</p>
        <p>Last Name: {profileData.last_name}</p>
        <p>Birth Date: {profileData.birth_date}</p>
        <img src={profileData.image} alt="Profile Image" />
      </div>
    </div>
  );
}

export default UpdateProfile;

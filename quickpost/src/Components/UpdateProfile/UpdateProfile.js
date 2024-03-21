import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, FormGroup, FormLabel, FormControl, Button, Row, Col, Card } from 'react-bootstrap';

function UpdateProfile() {
  const [profileData, setProfileData] = useState({
    first_name: '',
    last_name: '',
    birth_date: '',
    image: null,
  });
  const [errors, setErrors] = useState({
    first_name: '',
    last_name: '',
    birth_date: '',
  });
  const history = useHistory();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `JWT ${localStorage.getItem('access')}`,
          },
        };

        const response = await axios.get('http://127.0.0.1:8000/api/profile/4/', config);
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
    setErrors({ ...errors, [name]: '' });
  };

  const handleImageChange = event => {
    const imageFile = event.target.files[0];
    setProfileData({ ...profileData, image: imageFile });
  };
  
  const handleImageClick = () => {
    history.push('/navbar', { image: profileData.image });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const validationErrors = {};
      if (profileData.first_name.trim().length < 3) {
        validationErrors.first_name = 'First name must be at least 3 characters long.';
      }
      if (profileData.last_name.trim().length < 3) {
        validationErrors.last_name = 'Last name must be at least 3 characters long.';
      }
      const currentDate = new Date();
      const selectedDate = new Date(profileData.birth_date);
      if (selectedDate >= currentDate) {
        validationErrors.birth_date = 'Birth date must be before today.';
      }

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

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

      const response = await axios.put('http://127.0.0.1:8000/api/profile/4/', formData, config);
      console.log('Profile updated successfully:', response.data);
      setProfileData(response.data);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className='container'>
    <div className='row'>
      <div>
        <Card className="profile-preview">
          
            <div className="rounded-top text-white d-flex flex-row justify-content space-between" style={{ backgroundColor: '#000', height: '230px' }}>
            <div className="d-flex" style={{ width: '350px' }}>
              <Card.Title>Profile</Card.Title>
            <Card.Text style={{ width: '200px' , marginTop: '30px'}}>
              <p>First Name: {profileData.first_name}</p>
              <p>Last Name: {profileData.last_name}</p>
              <p>Birth Date: {profileData.birth_date}</p>
            </Card.Text>
                <img src={profileData.image} alt="Profile" onClick={handleImageClick} className="img-fluid img-thumbnail mt-4 mb-2 ms-5" style={{ width: '150px', zIndex: 1 }} />
              </div>
            </div>
          <Card.Footer className="text-muted">
            {/* Footer content */}
          </Card.Footer>
        </Card>
      </div>
      <div className='mt-5'>
        <Form onSubmit={handleSubmit} className='mt-5'>
          <FormGroup>
            <FormLabel>First Name:</FormLabel>
            <FormControl
              type="text"
              name="first_name"
              value={profileData.first_name}
              onChange={handleInputChange}
            />
            {errors.first_name && <span className="text-danger">{errors.first_name}</span>}
          </FormGroup>
          <FormGroup>
            <FormLabel>Last Name:</FormLabel>
            <FormControl
              type="text"
              name="last_name"
              value={profileData.last_name}
              onChange={handleInputChange}
            />
            {errors.last_name && <span className="text-danger">{errors.last_name}</span>}
          </FormGroup>
          <FormGroup>
            <FormLabel>Birth Date:</FormLabel>
            <FormControl
              type="date"
              name="birth_date"
              value={profileData.birth_date}
              onChange={handleInputChange}
            />
            {errors.birth_date && <span className="text-danger">{errors.birth_date}</span>}
          </FormGroup>
          <FormGroup>
            <FormLabel>Profile Image:</FormLabel>
            <FormControl
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </FormGroup>
          <Button type="submit" variant="primary">Update Profile</Button>
        </Form>
      </div>
    </div>
  </div>
);
};
export default UpdateProfile;

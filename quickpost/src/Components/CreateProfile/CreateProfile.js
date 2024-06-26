import React, { useState } from 'react';
import axios from 'axios';
import { Link, Redirect, useHistory } from "react-router-dom/cjs/react-router-dom.min";
//import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
//import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { loadUserProfileById } from "../../Store/Actions/AuthAction";
import './CreateProfile.css'
import WhatsApp from '../../images/WhatsApp.jpeg'
import Navbar from '../Navbar/Navbar';

const CreateProfile = ({ isAuthenticated, user, loadUserProfileById, userProfile }) => {
    //console.log(user.id)
    //loadUserProfileById(1);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        birth_date: '',
        image: null,
        //user_account: user.id,
    });
    const [errors, setErrors] = useState({});
    const history = useHistory();
    if (user) { loadUserProfileById(user.id); }
    if (userProfile) {
        return <Redirect to='/home' />
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const validateForm = () => {
        let errors = {};
        let isValid = true;
        // if (!user) {
        //     console.error('Error: User object is null');
        //     return;
        // }

        if (formData.first_name.trim().length < 3) {
            errors.first_name = 'First name must be at least 3 characters';
            isValid = false;
        } else if (!/^[a-zA-Z]+$/.test(formData.first_name.trim())) {
            errors.first_name = 'First name must contain only letters';
            isValid = false;
        }

        if (formData.last_name.trim().length < 3) {
            errors.last_name = 'Last name must be at least 3 characters';
            isValid = false;
        } else if (!/^[a-zA-Z]+$/.test(formData.last_name.trim())) {
            errors.last_name = 'Last name must contain only letters';
            isValid = false;
        }

        if (!formData.birth_date) {
            errors.birth_date = 'Birth date is required';
            isValid = false;
        } else {
            const birthDate = new Date(formData.birth_date);
            const currentDate = new Date();
            if (birthDate >= currentDate) {
                errors.birth_date = 'Birth date must be in the past';
                isValid = false;
            }
        }

        setErrors(errors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }
        // if (!user) {
        //     console.error('Error: User object is nulll');
        //     return;
        // }
        //const token = localStorage.getItem('token'); // Assuming your token is stored in local storage

        // Construct form data
        let Data = new FormData();
        Data.append('first_name', formData.first_name);
        Data.append('last_name', formData.last_name);
        Data.append('birth_date', formData.birth_date);
        Data.append('image', formData.image);
        Data.append('user_account', user.id);
        if (user) { console.log(user) }

        try {
            // Send POST request to the server
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `JWT ${localStorage.getItem("access")}`,
                },
            };
            const response = await axios.post('http://127.0.0.1:8000/api/profile/', Data, config);

            // Redirect or show success message based on server response
            console.log('Profile created successfully:', response.data);
            // Clear form data after successful submission
            setFormData({
                first_name: '',
                last_name: '',
                birth_date: '',
                image: null
            });
            setErrors({});
            // Redirect or show success message
            history.push('/home');
        } catch (error) {
            // Handle errors (e.g., display error message to the user)
            console.error('Error creating profile:', error);
        }

    };
    // const handleImageChange = (e) => {
    //     const file = e.target.files[0];
    //     const reader = new FileReader();
    
    //     reader.onload = (e) => {
    //         const imagePreview = document.getElementById('imagePreview');
    //         if (imagePreview) {
    //             imagePreview.setAttribute('src', e.target.result);
    //         }
    //     };
    
    //     reader.readAsDataURL(file);
    
    //     setFormData({ ...formData, image: file });
    // };
    

    return (
        <>
                            <Navbar />

       
        <div className="container mt-5   p-3">
        
            <div className="row justify-content-center">
                <div className="col-6 mx-auto">
                    <div className="card p-4 form-shadow">
                        <h2 className="mb-4 main-title text-center">Create Profile</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3 d-flex align-items-center">
                                <label htmlFor="imageInput" className="form-label me-2">Profile Picture</label>
                                <label htmlFor="imageInput" className="image-upload position-relative">
                                    <img src={formData.image ? URL.createObjectURL(formData.image) : WhatsApp} alt="User Icon" className="user-icon" />
                                    <input id="imageInput" type="file" accept="image/*" onChange={handleImageChange} className="position-absolute top-0 start-0 translate-middle form_input" style={{ opacity: 0, cursor: 'pointer' }} />
                                </label>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="firstNameInput" className="form-label">First Name</label>
                                <input id="firstNameInput" type="text" className={`form-control form_input ${errors.first_name ? 'is-invalid' : ''}`} name="first_name" value={formData.first_name} onChange={handleChange} placeholder="First Name" />
                                {errors.first_name && <div className="invalid-feedback">{errors.first_name}</div>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="lastNameInput" className="form-label">Last Name</label>
                                <input id="lastNameInput" type="text" className={`form-control form_input ${errors.last_name ? 'is-invalid' : ''}`} name="last_name" value={formData.last_name} onChange={handleChange} placeholder="Last Name" />
                                {errors.last_name && <div className="invalid-feedback">{errors.last_name}</div>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="birthDateInput" className="form-label">Birth Date</label>
                                <input id="birthDateInput" type="date" className={`form-control form_input ${errors.birth_date ? 'is-invalid' : ''}`} name="birth_date" value={formData.birth_date} onChange={handleChange} />
                                {errors.birth_date && <div className="invalid-feedback">{errors.birth_date}</div>}
                            </div>
                            <div className='w-50 mx-auto'>
                                <button type="submit" className="btn-2 mt-4 w-100">Create Profile</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </> );
}
const mapStateToProps = state => ({
    isAuthenticated: state.AuthRecducer.isAuthenticated,
    user: state.AuthRecducer.user,
    userProfile: state.AuthRecducer.userProfile,
});
export default connect(mapStateToProps, { loadUserProfileById })(CreateProfile);

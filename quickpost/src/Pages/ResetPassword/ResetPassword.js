import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { reset_password } from '../../Store/Actions/AuthAction';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const ResetPassword = ({ reset_password }) => {
    const [requestSent, setRequestSent] = useState(false);
    const [formData, setFormData] = useState({
        email: ''
    });

    const { email } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        reset_password(email);
        setRequestSent(true);
    };

    if (requestSent) {
        return <Redirect to='/' />
    }
    return (
        <div className='container mt-5'>
            <div className='row '>
                <div className='form-reset w-50 py-5 mx-auto'>

                    <form className="card text-center mx-auto " style={{ width: "500px", height:"550px"}} onSubmit={e => onSubmit(e)}>
                        <div className="card-header h5 text-white bg-primary">Password Reset</div>
                        <div className="card-body px-5">
                            <p className="card-text py-4">
                                Enter your email address and we'll send you an email with instructions to reset your password.
                            </p>
                            <div className='form-group form-outline'>
                                <input
                                    className='form-control my-3'
                                    type='email'
                                    placeholder='Enter Your Email'
                                    name='email'
                                    value={email}
                                    onChange={e => onChange(e)}
                                    required
                                />
                            </div>
                            <button className='btn btn-primary my-3' type='submit'>Reset Password</button>
                            {/* <div className="d-flex justify-content-between mt-5">
                                <Link to="/Login">
                                    Login
                                </Link>
                                <Link to="/Sginup">
                                    SginUp
                                </Link>
                            </div> */}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default connect(null, { reset_password })(ResetPassword);
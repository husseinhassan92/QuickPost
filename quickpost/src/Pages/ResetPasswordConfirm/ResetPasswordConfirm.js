import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { reset_password_confirm } from '../../Store/Actions/AuthAction';

const ResetPasswordConfirm = ({ match, reset_password_confirm }) => {
    const [requestSent, setRequestSent] = useState(false);
    const [formData, setFormData] = useState({
        new_password: '',
        re_new_password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [passwordMatchError, setPasswordMatchError] = useState('');

    const { new_password, re_new_password } = formData;

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setPasswordMatchError('');
    };

    const onSubmit = e => {
        e.preventDefault();

        if (new_password !== re_new_password) {
            setPasswordMatchError("Passwords do not match");
            return;
        }

        const uid = match.params.uid;
        const token = match.params.token;

        reset_password_confirm(uid, token, new_password, re_new_password);
        setRequestSent(true);
    };

    if (requestSent) {
        return <Redirect to='/Login' />
    }

    return (
        <div className='container mt-5 text-white'>
            <div className='row '>
                <div className='form-reset w-50 py-3 mx-auto'>
                    <form className="card text-center mx-auto " style={{ width: "350px" }} onSubmit={onSubmit}>
                        <div className="card-header h5 text-white bg-primary">Change Password</div>
                        <div className="card-body px-5">
                            <div className='form-group form-outline my-4'>
                                <input
                                    className='form-control'
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder='New Password'
                                    name='new_password'
                                    value={new_password}
                                    onChange={onChange}
                                    minLength='6'
                                    required
                                />
                            </div>

                            <div className='form-group form-outline my-4'>
                                <input
                                    className='form-control'
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder='Confirm New Password'
                                    name='re_new_password'
                                    value={re_new_password}
                                    onChange={onChange}
                                    minLength='6'
                                    required
                                />
                                {passwordMatchError && <div className="text-danger">{passwordMatchError}</div>}
                            </div>
                            <button
                                className='btn btn-secondary w-100 my-2 '
                                type='button'
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? 'Hide' : 'Show'} Password
                            </button>
                            <button className='btn btn-primary w-100 ' type='submit'>Change Password</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default connect(null, { reset_password_confirm })(ResetPasswordConfirm);

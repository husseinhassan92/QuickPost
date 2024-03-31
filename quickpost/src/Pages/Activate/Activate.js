import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { verify } from '../../Store/Actions/AuthAction';
import verify_img from '../../images/verify.png'

const Activate = ({ verify, match }) => {
    const [verified, setVerified] = useState(false);

    const verify_account = e => {
        const uid = match.params.uid;
        const token = match.params.token;

        verify(uid, token);
        setVerified(true);
    };

    if (verified) {
        return <Redirect to='/Login' />
    }

    return (
        <div className='container'>
            <div className='row  mt-5 w-75 mx-auto p-2'>
                <div className='text-center p-2 ' >
                    <h1 className='main-title' >Verify your Account</h1>
                    <div>
                        <img src={verify_img} alt='Verify your Account' style={{width:"300px"}}className='rounded-circle m-2'/>
                        <p className='w-75 mx-auto my-3 fs-5'>We're excited to have you get started. First, you need to confirm your account. Just press the button below.</p>
                    </div>
                    <button
                        onClick={verify_account}
                        type='button'
                        className='btn-2 mb-3 p-2 px-5'
                    >
                        Verify
                    </button>
                </div>
            </div>
        </div>
    );
};

export default connect(null, { verify })(Activate);
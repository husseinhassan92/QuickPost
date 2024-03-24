import React from 'react'


function WhoToFollow({ path, imgname, useraccount, bio }) {
    return (
        <div className="container">
            <div className="row">
                <div className='parent_sideleft'>
                    <div className='suggested_users'>
                        <div className="rounded-img">
                            <img src={path} alt={imgname} className='rounded-circle' style={{ width: '50px', height: '50px' }} />
                        </div>
                        <div className="who-to-follow">
                            <p className='fw-bold text-white'>{useraccount}</p>
                            <span>{bio}</span>
                        </div>
                    <div className='btn btn-primary follow_btn'>Follow</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WhoToFollow;
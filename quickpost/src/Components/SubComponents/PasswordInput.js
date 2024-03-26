import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function PasswordInput() {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div>
            <input 
                type={showPassword ? "text" : "password"} 
                value={password} 
                onChange={handlePasswordChange} 
            />
            <button onClick={toggleShowPassword}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
        </div>
    );
}

export default PasswordInput;

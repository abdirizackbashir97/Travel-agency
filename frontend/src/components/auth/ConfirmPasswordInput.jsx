import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const ConfirmPasswordInput = ({
  value,
  onChange,
  passwordValue,
  placeholder = 'Confirm your password',
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isValid = value === passwordValue && value.length > 0;
  const isInvalid = value.length > 0 && value !== passwordValue;

  return (
    <div>
      <label className="block text-sm font-medium text-gray-900 mb-1">
        Confirm Password
      </label>
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition pr-12 placeholder-gray-400 ${
            isValid ? 'border-green-500' : isInvalid ? 'border-red-500' : 'border-gray-300'
          }`}
          style={{ color: '#1a202c' }}
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
        >
          {showPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
        </button>
      </div>
      {isInvalid && <p className="text-sm text-red-500 mt-1">Passwords do not match</p>}
      {isValid && <p className="text-sm text-green-500 mt-1">Passwords match</p>}
    </div>
  );
};

export default ConfirmPasswordInput;

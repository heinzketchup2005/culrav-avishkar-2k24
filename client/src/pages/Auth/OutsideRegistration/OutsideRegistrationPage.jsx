import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QR from './QR'; 
import { setUserDetails, setToken } from '../../../store/userActions'; 

const OutsideRegistration = () => {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.user.details);
  const [showQR, setShowQR] = useState(false);

  const handleChange = (e) => {
      const { name, value } = e.target;
      dispatch(setUserDetails({ ...userDetails, [name]: value }));
      console.log('Redux State (onChange):', { ...userDetails, [name]: value });
  };

  const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Redux State (onSubmit):', userDetails);

      const allFieldsFilled = Object.values(userDetails).every((field) => field.trim() !== '');
      if (allFieldsFilled) {
          const token = 'sample-token-from-server';
          dispatch(setToken(token));
          setShowQR(true);
      } else {
          alert('Please fill in all fields before submitting.');
      }
  };

  return (
      <div className="min-h-screen flex justify-center items-center bg-gray-950 p-5">
          <div
              className="p-10 md:p-16 rounded-lg shadow-xl space-y-5 w-full max-w-md lg:max-w-lg"
              style={{ backgroundColor: '#2D2D2D' }}
          >
              <h1 className="text-3xl font-extrabold text-white text-center">
                  Outside Participation for <br /> CULRAV-AVISHKAR
              </h1>

              <p className="text-white text-center">
                  Already got registered?{' '}
                  <a href="/login" className="text-[#F54E25] underline">
                      Log in
                  </a>
              </p>

              {!showQR ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                      <input
                          type="text"
                          name="fullName"
                          placeholder="Full Name"
                          value={userDetails.fullName}
                          onChange={handleChange}
                          className="w-full p-3 text-white rounded"
                          style={{ backgroundColor: '#3D3D3D' }}
                      />
                      <input
                          type="email"
                          name="email"
                          placeholder="Email ID"
                          value={userDetails.email}
                          onChange={handleChange}
                          className="w-full p-3 text-white rounded"
                          style={{ backgroundColor: '#3D3D3D' }}
                      />
                      <input
                          type="tel"
                          name="phone"
                          placeholder="Enter your phone no"
                          value={userDetails.phone}
                          onChange={handleChange}
                          className="w-full p-3 text-white rounded"
                          style={{ backgroundColor: '#3D3D3D' }}
                      />
                      <input
                          type="text"
                          name="collegeName"
                          placeholder="Enter College Name"
                          value={userDetails.collegeName}
                          onChange={handleChange}
                          className="w-full p-3 text-white rounded"
                          style={{ backgroundColor: '#3D3D3D' }}
                      />
                      <input
                          type="url"
                          name="idCardUrl"
                          placeholder="Enter College ID Card Img URL"
                          value={userDetails.idCardUrl}
                          onChange={handleChange}
                          className="w-full p-3 text-white rounded"
                          style={{ backgroundColor: '#3D3D3D' }}
                      />
                      <button
                          type="submit"
                          className="w-full p-4 text-white rounded transition"
                          style={{ backgroundColor: '#F54E25' }}
                      >
                          Register
                      </button>
                  </form>
              ) : (
                  <QR />
              )}
          </div>
      </div>
  );
};

export default OutsideRegistration;
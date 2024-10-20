import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QR from '../../pages/Auth/OutsideRegistration/qr'; 
import { setUserDetails, setToken } from '../../store/userActions'; 

const OutsideRegistration = () => {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.user.details); 
  const [showQR, setShowQR] = useState(false); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setUserDetails({ ...userDetails, [name]: value })); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', userDetails);

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
    <div style={styles.pageContainer}>
      <div style={styles.outerBox}>
        <h1 style={styles.heading}>
          Outside Participation for <br /> CULRAV-AVISHKAR
        </h1>

        <p style={styles.subText}>
          Already got registered?{' '}
          <a href="/login" style={styles.loginLink}>
            Log in
          </a>
        </p>

        {!showQR ? (
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={userDetails.fullName}
              onChange={handleChange}
              style={styles.input}
            />

            <input
              type="email"
              name="email"
              placeholder="Email ID"
              value={userDetails.email}
              onChange={handleChange}
              style={styles.input}
            />

            <input
              type="tel"
              name="phone"
              placeholder="Enter your phone no"
              value={userDetails.phone}
              onChange={handleChange}
              style={styles.input}
            />

            <input
              type="text"
              name="collegeName"
              placeholder="Enter College Name"
              value={userDetails.collegeName}
              onChange={handleChange}
              style={styles.input}
            />

            <input
              type="url"
              name="idCardUrl"
              placeholder="Enter College ID Card Img URL"
              value={userDetails.idCardUrl}
              onChange={handleChange}
              style={styles.input}
            />

            <button type="submit" style={styles.registerButton}>
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

const styles = {
  pageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#1A1A1A',
  },
  outerBox: {
    display: 'inline-flex',
    padding: '40px 80px',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
    backgroundColor: '#2D2D2D',
    borderRadius: '8px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    color: 'var(--Floral-White, #FFFAF0)',
    textAlign: 'center',
    fontFamily: 'Bionix',
    fontSize: '34px',
    fontWeight: 1000,
    marginBottom: '10px',
  },
  subText: {
    color: 'var(--Floral-White, #FFFAF0)',
    textAlign: 'center',
    fontFamily: '"SF Pro Text"',
    fontSize: '16px',
    fontWeight: 400,
    marginBottom: '20px',
  },
  loginLink: {
    color: 'var(--Orange, #F54E25)',
    fontFamily: '"SF Pro Text"',
    fontSize: '16px',
    textDecoration: 'underline',
  },
  input: {
    width: '100%',
    margin: '10px 0',
    padding: '10px',
    fontSize: '16px',
    color: '#FFFAF0',
    backgroundColor: '#3D3D3D',
    border: 'none',
    borderRadius: '4px',
  },
  registerButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: '15px 19px',
    backgroundColor: 'var(--Orange, #F54E25)',
    color: '#FFFAF0',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
};


export default OutsideRegistration;
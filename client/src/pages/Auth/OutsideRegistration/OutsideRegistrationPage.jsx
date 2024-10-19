import React, { useState } from 'react';

const OutsideRegistrationPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    collegeName: '',
    idCardUrl: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
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

        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            style={styles.input}
          />
          <input
            type="tel"
            name="phone"
            placeholder="Enter your phone no"
            value={formData.phone}
            onChange={handleChange}
            style={styles.input}
          />
          <input
            type="text"
            name="collegeName"
            placeholder="Enter College Name"
            value={formData.collegeName}
            onChange={handleChange}
            style={styles.input}
          />
          <input
            type="url"
            name="idCardUrl"
            placeholder="Enter College ID Card Img URL"
            value={formData.idCardUrl}
            onChange={handleChange}
            style={styles.input}
          />

          <button
            type="submit"
            style={styles.registerButton}
            onMouseEnter={(e) =>
              (e.target.style.backgroundColor = 'rgba(245, 78, 37, 0.8)')
            }
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = 'var(--Orange, #F54E25)')
            }
            onMouseDown={(e) =>
              (e.target.style.transform = 'scale(0.98)')
            }
            onMouseUp={(e) =>
              (e.target.style.transform = 'scale(1)')
            }
          >
            Register
          </button>
        </form>
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

export default OutsideRegistrationPage;

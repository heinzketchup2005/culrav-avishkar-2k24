import React, { useState } from 'react';
import axios from 'axios';

const QR = () => {
  const [paymentScreenshot, setPaymentScreenshot] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState('');

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPaymentScreenshot(file);
    }
  };

  const uploadToCloudinary = async () => {
    if (!paymentScreenshot) {
      alert('Please upload a screenshot first.');
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append('file', paymentScreenshot);
    formData.append('upload_preset', process.env.REACT_APP_UPLOAD_PRESET); 
    formData.append('cloud_name', process.env.REACT_APP_CLOUD_NAME); 

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}`, 
        formData
      );
      setUploadedUrl(response.data.secure_url);
      alert('Payment screenshot uploaded successfully!');
    } catch (error) {
      console.error('Cloudinary upload failed:', error);
      alert('Failed to upload screenshot. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = () => {
    if (!uploadedUrl) {
      alert('Please upload a payment screenshot before submitting.');
      return;
    }
    console.log('Form submitted with payment URL:', uploadedUrl);
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.outerBox}>
        <div style={styles.qrContainer}>
          <div style={styles.qrPlaceholder}>
            <p style={styles.placeholderText}>QR Code Placeholder</p>
          </div>
        </div>

        <input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          style={styles.uploadInput}
        />

        <button
          onClick={uploadToCloudinary}
          style={styles.uploadButton}
          disabled={uploading}
        >
          {uploading ? 'Uploading...' : 'Upload Payment Screenshot'}
        </button>

        <button onClick={handleSubmit} style={styles.submitButton}>
          Submit
        </button>
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
    display: 'flex',
    width: '433px',
    padding: '40px',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '72px',
    background: 'var(--Jet, #2D2D2D)',
    borderRadius: '8px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  },
  qrContainer: {
    height: '343px',
    flex: '1 0 0',
    width: '100%',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  qrPlaceholder: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#FFFFFF', 
    borderRadius: '8px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
  },
  placeholderText: {
    color: '#000',
    fontSize: '16px',
    fontWeight: 'bold',
  },
  uploadInput: {
    display: 'flex',
    padding: '10px 19px',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    alignSelf: 'stretch',
    background: 'var(--Mine-Shaft-900, #3D3D3D)',
    color: '#FFFAF0',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  uploadButton: {
    display: 'flex',
    padding: '15px 19px',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    alignSelf: 'stretch',
    background: 'var(--Orange, #F54E25)',
    color: '#FFFAF0',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginTop: '10px',
  },
  submitButton: {
    display: 'flex',
    padding: '15px 19px',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    alignSelf: 'stretch',
    background: 'var(--Orange, #F54E25)',
    color: '#FFFAF0',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
};

export default QR;

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
      const response = await axios.post(process.env.REACT_APP_API_URL, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log('Cloudinary Response:', response.data);
      setUploadedUrl(response.data.secure_url);
      alert('Payment screenshot uploaded successfully!');
    } catch (error) {
      console.error('Cloudinary upload failed:', error.response?.data || error.message);
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
    <div className="min-h-screen flex justify-center items-center bg-gray-900 p-4">
      <div
        className="p-8 rounded-lg shadow-xl w-full max-w-xs sm:max-w-sm lg:max-w-lg xl:max-w-xl space-y-6"
        style={{ backgroundColor: 'var(--Jet, #2D2D2D)' }}
      >
        <div
          className="w-full h-64 rounded-lg"
          style={{ backgroundColor: '#D9D9D9' }}
        ></div>

        <input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="w-full p-3 rounded"
          style={{ backgroundColor: 'var(--Mine-Shaft-900, #3D3D3D)', color: 'white' }}
        />

        <button
          onClick={uploadToCloudinary}
          disabled={uploading}
          className="w-full p-4 rounded transition"
          style={{
            backgroundColor: uploading ? '#3D3D3D' : 'var(--Orange, #F54E25)',
            color: 'white',
          }}
        >
          {uploading ? 'Uploading...' : 'Upload payment Screenshot'}
        </button>

        <button
          onClick={handleSubmit}
          className="w-full p-4 rounded transition hover:bg-opacity-90"
          style={{ backgroundColor: 'var(--Orange, #F54E25)', color: 'white' }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default QR;

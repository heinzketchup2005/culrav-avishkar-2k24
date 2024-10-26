import ContentBox from "../../../assets/userDashBoard/ContentBox.png";


const Profile = () => {
  return (
    <div
      className="md:w-[74vw] custom1000:w-[80vw] custom1840:w-[83vw] w-full absolute top-[92px] flex justify-center items-center h-full md:h-auto"
      style={{
        height: 'calc(100vh - 92px)',
        backgroundImage: `url(${ContentBox})`,
        backgroundSize: 'cover', 
        backgroundRepeat: 'no-repeat', 
      }}
    >
      <div className="px-9 rounded-md py-7 bg-scheduleLargeText w-[90%] max-w-[640px]">
        <div className="w-full h-[40px] flex mb-4">
          <div className="w-[20%] h-full flex">
            <h1 className="text-white flex items-center justify-center">Name</h1>
          </div>
          <div className="w-[80%] rounded-lg h-full bg-lightMineshaft flex items-center px-6">
            <h1 className="text-mineShaft flex items-center justify-center">Ayush Tiwari</h1>
          </div>
        </div>

        <div className="w-full h-[40px] flex mb-4">
          <div className="w-[20%] h-full flex">
            <h1 className="text-white flex items-center justify-center">User ID</h1>
          </div>
          <div className="w-[80%] rounded-lg h-full bg-lightMineshaft flex items-center px-6">
            <h1 className="text-mineShaft flex items-center justify-center">user_12345</h1>
          </div>
        </div>

        <div className="w-full h-[40px] flex mb-4">
          <div className="w-[20%] h-full flex">
            <h1 className="text-white flex items-center justify-center">Email</h1>
          </div>
          <div className="w-[80%] rounded-lg h-full bg-lightMineshaft flex items-center px-6">
            <h1 className="text-mineShaft flex items-center justify-center">ayush@example.com</h1>
          </div>
        </div>

        <div className="w-full h-[40px] flex mb-4">
          <div className="w-[20%] h-full flex">
            <h1 className="text-white flex items-center justify-center">Phone</h1>
          </div>
          <div className="w-[80%] rounded-lg h-full bg-lightMineshaft flex items-center px-6">
            <h1 className="text-mineShaft flex items-center justify-center">+91 9876543210</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

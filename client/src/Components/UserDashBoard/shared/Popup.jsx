import { useState, useEffect, useRef } from "react";
import Profile from "../Profile/Profile";
import UploadResume from "../UploadResume/UploadResume";
import CreateTeam from "../CreateTeam/CreateTeam";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signoutSuccess } from "@/redux/auth/authSlice";
import Team from "../Team/index"
import Invitations from "../Invitation";

const Popup = () => {
    const [isOpen, setIsOpen] = useState(false); 
    const [activeItem, setActiveItem] = useState("Profile");
    const popupRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const toggle = () => {
        setIsOpen(!isOpen); 
    };

    const handleNavigation = (item) => {
        setActiveItem(item); 
    };

    const handleLogout = () => {
        dispatch(signoutSuccess());
        navigate("/login");
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setIsOpen(false); 
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    const renderPageContent = () => {
        switch (activeItem) {
            case "Profile":
                return <Profile />;
            case "Upload Resume":
                return <UploadResume />;
            case "My Teams":
                return <Team />
            case "Create Team":
                return <CreateTeam />;
            case "View Invitation":
                return <Invitations />;
            default:
                return null;
        }
    };

    return (
        <div className="relative md:hidden ">
            <div ref={popupRef} className="relative ">
                <div
                    className={`md:hidden w-[100vw] fixed transition-all flex flex-col gap-8 justify-center items-center font-Sfpro text-[18px] duration-1000 h-[460px] bg-scheduleLargeText border-0 top-[0] z-[20] rounded-b-[46px] ${isOpen ? "transform translate-y-[90px]" : "transform translate-y-[-330px]"}`}
                >
                    <ul className="flex flex-col gap-5 justify-center items-center text-mineShaft">
                        <li className={`hover:text-customOrange cursor-pointer ${activeItem === "Profile" ? "text-customOrange" : ""}`} onClick={() => handleNavigation("Profile")}>Profile</li>
                        <li className={`hover:text-customOrange cursor-pointer ${activeItem === "Upload Resume" ? "text-customOrange" : ""}`} onClick={() => handleNavigation("Upload Resume")}>Upload Resume</li>
                        <li className={`hover:text-customOrange cursor-pointer ${activeItem === "My Teams" ? "text-customOrange" : ""}`} onClick={() => handleNavigation("My Teams")}>My Teams</li>
                        <li className={`hover:text-customOrange cursor-pointer ${activeItem === "Create Team" ? "text-customOrange" : ""}`} onClick={() => handleNavigation("Create Team")}>Create Team</li>
                        <li className={`hover:text-customOrange cursor-pointer ${activeItem === "View Invitation" ? "text-customOrange" : ""}`} onClick={() => handleNavigation("View Invitation")}>View Invitation</li>
                    </ul>

                    <button
                        onClick={handleLogout}
                        className="w-[160px] h-[40px] bg-register border-0 rounded-sm text-white"
                    >
                        Logout
                    </button>

                    <div className="absolute bottom-0 right-0 w-full flex justify-center">
                        <button onClick={toggle} className="text-white rounded-full p-2">
                            {isOpen ? <FiChevronUp size={24} /> : <FiChevronDown size={24} />}
                        </button>
                    </div>            
                </div>
            </div>

            {activeItem && (
                <div className="absolute w-full bg-white flex justify-center items-center z-[10]">
                    {renderPageContent()}
                </div>
            )}
        </div>
    );
};

export default Popup;
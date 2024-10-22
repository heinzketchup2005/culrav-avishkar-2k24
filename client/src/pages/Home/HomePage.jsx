import Gallery from "@/Components/Home/Gallery";
import HeroSection from "@/Components/Home/HeroSection";
import Schedule from "@/Components/Home/Schedule";
import ProfileTape from "@/Components/Home/ProfileTape";

function Home() {
  return (
    <div>
      <HeroSection />
      <Schedule />
      <Gallery />
      <ProfileTape />
    </div>
  );
}
export default Home;

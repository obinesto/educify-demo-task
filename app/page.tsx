import NavSectionOne from "./components/NavSectionOne";
import NavSectionTwo from "./components/NavSectionTwo";
import SideBar from "./components/SideBar";
import Recommendations from "./components/Recommendations";

export default function Home() {
  return (
    <div className="bg-gray-200">
      <NavSectionOne />
      <div className="flex">
        <SideBar />
        <div className="flex flex-col w-full">
          <NavSectionTwo />
          <Recommendations />
        </div>
      </div>
    </div>
  );
}

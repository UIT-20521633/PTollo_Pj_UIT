
import Cards1 from "../assets/img/Landingpage img/background.jpg"
import NavBar from "../components/NavBar/NavBar";
import Slogan from "../components/Slogon/Slogan";

function Landingpage() {
  return (
    <div className="font-sora h-screen bg-cover bg-center bg-no-repeat  from-purple-900 to-purple-700 text-white" style={{ backgroundImage: `url(${Cards1})` }}>
      <NavBar/>
      <Slogan/>
    </div>
  );
}

export default Landingpage;

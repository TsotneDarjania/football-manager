import Bound from "../../global/bound";
import { CgMenuGridR } from "react-icons/cg";
import { MatterJSScene } from "./components/matterJS";
import ClientComponents from "./components/clientComponents";
import AppProvider from "@/app/context/appContext";

export default async function HomePage() {
  return (
    <div className="w-screen h-screen overflow-hidden">
      <MatterJSScene />

      <Bound className="flex justify-center flex-col items-center">
        <AppProvider>
          <ClientComponents />
        </AppProvider>

        {/* <h2 className="custom-font-3 text-[#4a7050] w-[60vw] text-center text-xl mt-2">
          This platform is for those who love football and find joy in the game{" "}
          <br></br>
          <br></br>I started this project as a simple football match simulator,
          but now I am expanding it to not only be a simulator but also a game.
          It will be similar to Football Manager, where you can create or choose
          an existing team and strive to make it the best. You Will have the
          opportunity to participate in competitions not only against the
          computer but also against real people online. <br></br> <br></br>{" "}
          Additionally, this simulator has the potential to become an online
          casino game. It will YouTubers who want to record videos like this{" "} */}
        {/* <span
            onClick={() => {
              window.open("https://www.youtube.com/watch?v=x5cI6hHuxnI");
            }}
            className=" text-[#323438] font-bold text-xl cursor-pointer"
          >
            Link
          </span> */}
        {/* . One last thing: as a JavaScript developer, I am proud to announce
          that any developer with a passion for creating something different and
          truly fun is welcome to contribute to this project and improve it.
          Contributors are very welcome here. You can explore the{" "} */}
        {/* <span
            onClick={() => {
              window.open("https://github.com/TsotneDarjania/football-manager");
            }}
            className=" text-[#323438] font-bold text-xl cursor-pointer"
          >
            Repository
          </span>{" "} */}
        {/* </h2> */}
      </Bound>
    </div>
  );
}

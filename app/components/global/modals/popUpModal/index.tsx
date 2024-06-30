import { AppContext } from "@/app/context/appContext";
import clsx from "clsx";
import { useContext } from "react";
import AuthenticationComponent from "./components/autnentication";

export function PopUpModal() {
  const appContext = useContext(AppContext);

  return (
    <div>
      {/* Overlay */}
      <div
        className="fixed left-0 top-0 w-screen h-screen bg-black opacity-45"
        onClick={() => {
          appContext.setModalState({
            type: "info",
            isOpen: false,
            title: "",
            message: "",
          });
        }}
      ></div>

      <div
        className={clsx(
          "fixed opacity-100 p-2 flex flex-col items-start left-0 right-0 mx-auto my-auto top-0 bottom-0 w-[50vw] h-[70vh]  overflow-y-scroll border-[2px]",
          appContext.modalState.type === "info" &&
            "bg-[#3cffa4] border-[#0d5738]",
          appContext.modalState.type === "warning" &&
            "bg-[#ff3c3c] border-[#570d0d]",
          appContext.modalState.type === "authentication" &&
            "bg-[#3cffa4] border-[#0d5738]"
        )}
      >
        <h1 className="text-center w-full text-[#2c6863] text-4xl custom-font-4 ">
          {appContext.modalState.title}
        </h1>

        {appContext.modalState.message === "authentication" && (
          <AuthenticationComponent />
        )}

        {appContext.modalState.message != "about" &&
          appContext.modalState.message != "authentication" && (
            <p className="w-full text-[#317570] text-xl text-center custom-font-4 ">
              {appContext.modalState.message}
            </p>
          )}

        {appContext.modalState.message === "about" && (
          <p className="w-full text-[#317570] text-xl custom-font-4 ">
            This platform is for those who love football and find joy in the
            game <br></br>
            <br></br>I started this project as a simple football match
            simulator, but now I am expanding it to not only be a simulator but
            also a game. It will be similar to Football Manager, where you can
            create or choose an existing team and strive to make it the best.
            You Will have the opportunity to participate in competitions not
            only against the computer but also against real people online.{" "}
            <br></br> <br></br> Additionally, this simulator has the potential
            to become an online casino game. It will YouTubers who want to
            record videos like this{" "}
            <span
              onClick={() => {
                window.open("https://www.youtube.com/@Marb1eArena/videos");
              }}
              className=" text-[#323438] font-bold text-xl cursor-pointer"
            >
              Link
            </span>
            <br></br> <br></br>One last thing: as a JavaScript developer, I am
            proud to announce that any developer with a passion for creating
            something different and truly fun is welcome to contribute to this
            project and improve it. Contributors are very welcome here. You can
            explore the{" "}
            <span
              onClick={() => {
                window.open(
                  "https://github.com/TsotneDarjania/football-manager"
                );
              }}
              className=" text-[#323438] font-bold text-xl cursor-pointer"
            >
              Repository
            </span>{" "}
          </p>
        )}
      </div>
    </div>
  );
}

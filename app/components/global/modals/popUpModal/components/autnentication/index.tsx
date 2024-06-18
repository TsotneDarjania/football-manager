import { useState } from "react";
import { MdClose } from "react-icons/md";

export default function AuthenticationComponent() {
  const [openRegistration, setOpenRegistration] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);

  return (
    <div className="absolute top-0 left-0 flex flex-col mt-2 w-full items-center justify-center h-full">
      {!openRegistration && !openLogin && (
        <>
          <button
            onClick={() => {
              setOpenRegistration(true);
            }}
            className=" px-2 py-1 hover:bg-[#fff6ea] transition-all duration-200 custom-font-4 bg-[#eb8704] text-[#050504] text-xl mt-2 border-[#7a3b28] border-[5px]"
          >
            {" "}
            Registration{" "}
          </button>
          <button
            onClick={() => {
              setOpenLogin(true);
            }}
            className=" px-2 py-1 hover:bg-[#fff6ea] transition-all duration-200 custom-font-4 bg-[#eb8704] text-[#050504] text-xl mt-2 border-[#7a3b28] border-[5px]"
          >
            {" "}
            Login{" "}
          </button>
        </>
      )}

      {/* Registration */}
      {openRegistration && (
        <div className="w-full flex justify-center items-center flex-col">
          <MdClose
            onClick={() => {
              setOpenRegistration(false);
            }}
            className="absolute top-0 right-2 text-[50px] cursor-pointer text-[#f76826]"
          />

          <input
            placeholder="UserName"
            className="p-2 outline-none bg-transparent border-b-[5px] border-[#e98c40] text-[#e98c40] text-xl custom-font-4"
            maxLength={20}
            type="text"
          />
          <input
            placeholder="Email"
            className="p-2 outline-none bg-transparent border-b-[5px] border-[#e98c40] text-[#e98c40] text-xl custom-font-4"
            maxLength={40}
            type="text"
          />
          <button className=" px-2 py-1 mt-[18px] bg-[#f18900] custom-font-4 text-2xl text-[#4d3019]">
            {" "}
            Registration
          </button>
        </div>
      )}

      {/* Login */}
      {openLogin && (
        <div className="w-full flex justify-center items-center flex-col">
          <MdClose
            onClick={() => {
              setOpenLogin(false);
            }}
            className="absolute top-0 right-2 text-[50px] cursor-pointer text-[#f76826]"
          />

          <input
            placeholder="UserName"
            className="p-2 outline-none bg-transparent border-b-[5px] border-[#e98c40] text-[#e98c40] text-xl custom-font-4"
            maxLength={20}
            type="text"
          />
          <input
            placeholder="Email"
            className="p-2 outline-none bg-transparent border-b-[5px] border-[#e98c40] text-[#e98c40] text-xl custom-font-4"
            maxLength={40}
            type="text"
          />
          <button className=" px-2 py-1 mt-[18px] bg-[#f18900] custom-font-4 text-2xl text-[#4d3019]">
            {" "}
            Login
          </button>
        </div>
      )}
    </div>
  );
}

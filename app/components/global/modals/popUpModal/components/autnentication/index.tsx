import { useContext, useState } from "react";
import { MdClose } from "react-icons/md";

import validator from "email-validator";
import { Registration, logIn } from "@/app/core/authenticate";
import { AppContext } from "@/app/context/appContext";

export default function AuthenticationComponent() {
  const [openRegistration, setOpenRegistration] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);

  const appContext = useContext(AppContext);

  const [warningText, setWarningText] = useState("");

  const [formData, setFormTada] = useState({
    loginEmail: "",
    regUsername: "",
    regEmail: "",
  });

  return (
    <div className="absolute top-0 left-0 flex flex-col mt-2 w-full items-center justify-center h-full">
      {!openRegistration && !openLogin && (
        <>
          <button
            onClick={() => {
              setOpenRegistration(true);
            }}
            className="w-[280px] h-[50px] hover:bg-[#1e221c] transition-all duration-200 custom-font-4 bg-[#145327] text-[#2ac03e] text-xl mt-2 border-[#387a11] border-[2px]"
          >
            {" "}
            Registration{" "}
          </button>
          <button
            onClick={() => {
              setOpenLogin(true);
            }}
            className="w-[280px] h-[50px] hover:bg-[#1e221c] transition-all duration-200 custom-font-4 bg-[#145327] text-[#2ac03e] text-xl mt-2 border-[#387a11] border-[2px]"
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
              setWarningText("");
              setOpenRegistration(false);
            }}
            className="absolute top-0 right-2 text-[50px] cursor-pointer text-[#165f0c]"
          />

          <input
            placeholder="UserName"
            className="p-2 outline-none bg-transparent border-b-[5px] border-[#3c3d3b] text-[#50704d] text-xl custom-font-4"
            maxLength={20}
            type="text"
            onChange={(element) => {
              setWarningText("");
              setFormTada({ ...formData, regUsername: element.target.value });
            }}
          />
          <input
            placeholder="Email"
            className="p-2 outline-none bg-transparent border-b-[5px]  border-[#3c3d3b] text-[#50704d] text-xl custom-font-4"
            maxLength={40}
            type="text"
            onChange={(element) => {
              setWarningText("");
              setFormTada({ ...formData, regEmail: element.target.value });
            }}
          />
          <button
            onClick={() => {
              if (formData.regUsername === "") {
                setWarningText("Username is required");
                return;
              }

              if (!validator.validate(formData.regEmail)) {
                setWarningText("Email is not valid");
                return;
              }

              appContext.setOpenLodaingModal(true);

              Registration({
                email: formData.regEmail,
                userName: formData.regUsername,
              }).then(
                (res) => {
                  console.log(res);
                  appContext.setOpenLodaingModal(false);
                  if (res === "already taken") {
                    setWarningText("Email is already taken");
                  }
                  if (res === "success") {
                    window.location.reload();
                  }
                },
                (err) => {
                  console.log(err);
                  appContext.setOpenLodaingModal(false);
                }
              );
            }}
            className=" px-2 py-1 mt-[18px] bg-[#084402] custom-font-4 text-2xl text-[#60ad2c]"
          >
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
            placeholder="Email"
            className="p-2 outline-none bg-transparent border-b-[5px] border-[#3c3d3b] text-[#50704d] text-xl custom-font-4"
            maxLength={40}
            type="text"
            onChange={(element) => {
              setWarningText("");
              setFormTada({ ...formData, loginEmail: element.target.value });
            }}
          />
          <button
            onClick={() => {
              if (!validator.validate(formData.loginEmail)) {
                setWarningText("Email is not valid");
                return;
              }

              appContext.setOpenLodaingModal(true);

              logIn(formData.loginEmail).then(
                (res) => {
                  appContext.setOpenLodaingModal(false);

                  if (res === null) {
                    setWarningText("Email not found");
                    return;
                  }

                  if (res === "success") {
                    window.location.reload();
                  }
                },
                (err) => {
                  console.log(err);
                }
              );
            }}
            className="px-2 py-1 mt-[18px] bg-[#084402] custom-font-4 text-2xl text-[#60ad2c]"
          >
            {" "}
            Login
          </button>
        </div>
      )}

      <p className="absolute bottom-[20px] custom-font-4 text-xl font-bold text-[#eb312b]">
        {warningText}
      </p>
    </div>
  );
}

import { TeamData } from "@/app/config/initialTeamsData";
import { AppContext } from "@/app/context/appContext";
import { insertNewTeam } from "@/app/core/user";
import { File } from "buffer";
import { useContext, useState } from "react";

export default function AddNewTeam({
  team,
  operationIs,
}: {
  team?: TeamData;
  operationIs: "addNew" | "update";
}) {
  const teamColor = team?.teamColor.replace("0x", "#") || "#000000";
  const secondaryColor =
    team?.teamSecondaryColor.replace("0x", "#") || "#000000";

  const appContext = useContext(AppContext);

  const [formData, setFormData] = useState({
    teamName: team?.name || "",
    teamLogo: File,
    strength: team?.strength || "",
    formation: team?.formation || "",
    color: teamColor, // Pre-process color values
    secondaryColor: secondaryColor,
    goalSoundEffect: undefined,
    coachName: team?.coach?.name || "",
    coach: {
      name: team?.coach?.name || "",
    },
    coachImages: {
      default: undefined,
      happy: undefined,
      sad: undefined,
    },
    selectedForMenu: team?.selectedForMenu,
  });

  const validateImageDimensions = (file: any) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        if (img.width === 60 && img.height === 60) {
          resolve(true);
        } else {
          resolve(false);
        }
      };
      img.onerror = () => {
        reject(false);
      };
    });
  };

  const handleFileChange = async (event: any) => {
    const file = event.target.files[0];
    if (!file) return;

    const isValid = await validateImageDimensions(file);
    if (!isValid) {
      alert("Team logo must be 60x60 pixels.");
      return;
    }

    setFormData({
      ...formData,
      teamLogo: file,
    });
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex flex-col lg:flex-row items-center  gap-2">
        <h3>Team Name :</h3>
        <input
          maxLength={25}
          defaultValue={team?.name || ""}
          type="text"
          placeholder="Enter Team Name"
          className="border-2 border-gray-400 p-1"
          onChange={(event) => {
            setFormData({
              ...formData,
              teamName: event.target.value,
            });
          }}
        />
        <div className="flex flex-col lg:flex-row gap-2">
          <h3>Team Logo :</h3>
          <input onChange={handleFileChange} type="file" />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row items-center gap-2">
        <h3>Team Strength :</h3>
        <input
          onChange={(event) => {
            setFormData({
              ...formData,
              strength: event.target.value,
            });
          }}
          className="border-2 border-gray-400 p-1"
          type="number"
          defaultValue={team?.strength || ""}
          name="numberInput"
          min="800"
          max="2130"
        />
        <p> * from 800 to 2130 </p>
      </div>
      <div className="flex  flex-col lg:flex-row items-center gap-2">
        <h3>Default Formation :</h3>
        <select
          onChange={(event) => {
            setFormData({
              ...formData,
              formation: event.target.value,
            });
          }}
          defaultValue={team?.formation}
          id="selectOption"
          name="selectOption"
        >
          <option value="4-4-2">4-4-2</option>
          <option value="5-4-1">5-4-1</option>
          <option value="5-3-2">5-3-2</option>
          <option value="3-3-4">3-3-4</option>
          <option value="4-3-3">4-3-3</option>
          <option value="3-4-3">3-4-3</option>
          <option value="3-5-2">3-5-2</option>
        </select>
      </div>
      <div className="flex  flex-col lg:flex-row items-center gap-2">
        <h3>Team Color :</h3>
        <input
          onChange={(event) => {
            setFormData({
              ...formData,
              color: event.target.value,
            });
          }}
          defaultValue={teamColor}
          type="color"
          name="colorInput"
        />
      </div>
      <div className="flex  flex-col lg:flex-row items-center gap-2">
        <h3>Team Secondary Color :</h3>
        <input
          onChange={(event) => {
            setFormData({
              ...formData,
              secondaryColor: event.target.value,
            });
          }}
          defaultValue={secondaryColor}
          type="color"
          name="colorInput"
        />
      </div>
      <div className="flex  flex-col lg:flex-row items-center gap-2">
        <h3>Goal Sound Effect :</h3>
        <input type="file" />
      </div>
      <div className="flex  flex-col lg:flex-row items-center gap-2">
        <h3>Coach Name :</h3>
        <input
          type="text"
          onChange={(event) => {
            setFormData({
              ...formData,
              coachName: event.target.value,
            });
          }}
          defaultValue={team?.coach.name || ""}
          maxLength={20}
          placeholder="Enter Coach Name"
          className="border-2 border-gray-400 p-1"
        />
      </div>
      <div className="flex flex-col lg:flex-row items-center gap-2">
        <h3>Coach Default Image :</h3>
        <input type="file" />
      </div>
      <div className="flex flex-col lg:flex-row items-center gap-2">
        <h3>Coach Happy Image :</h3>
        <input type="file" />
      </div>
      <div className="flex flex-col lg:flex-row items-center gap-2">
        <h3>Coach Sad Image :</h3>
        <input type="file" />
      </div>
      <div className="flex flex-col lg:flex-row items-center gap-2">
        <h3>Selected For Menu :</h3>
        <select
          onChange={(event) => {
            setFormData({
              ...formData,
              selectedForMenu: event.target.value === "true",
            });
          }}
          defaultValue={team?.selectedForMenu ? "true" : "false"}
          id="selectOption"
          name="selectOption"
        >
          <option value="true"> yes </option>
          <option value="false"> no </option>
        </select>
      </div>
      <button
        onClick={() => {
          if (formData.teamName === "")
            return alert("Please enter a team name");
          if (formData.teamLogo == File && operationIs === "addNew")
            return alert("Please select a team logo");
          if (formData.strength === "")
            return alert("Please enter a team strength");
          if (formData.formation === "")
            return alert("Please enter a team formation");
          if (formData.coachName === "")
            return alert("Please enter a coach name");

          if (
            Number(formData.strength) < 800 ||
            Number(formData.strength) > 2130
          ) {
            return alert("Team Strength must be between 1500 and 2500");
          }

          let updateMode: "withNewTeamLogo" | "withoutNewTeamLogo" =
            "withNewTeamLogo";

          if (formData.teamLogo == File) {
            updateMode = "withoutNewTeamLogo";
          }

          insertNewTeam(
            updateMode,
            appContext.userTeams,
            appContext.userData.username,
            //@ts-ignore
            formData
          ).then(
            (res) => {
              alert("Team Updated Successfully");

              window.location.reload();
            },
            (err) => {
              console.log(err);
            }
          );
        }}
        className="border-2 w-fit px-2 py-1 bg-zinc-500 custom-font-2 text-xl text-white"
      >
        {" "}
        Save
      </button>
    </div>
  );
}

export function getUserData() {
  function getCookie(name: string): string | undefined {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
  }

  const userCookie = getCookie("user");

  // Interface for user object
  type User = {
    email: string;
    userName: string;
  };

  if (userCookie) {
    try {
      const user: User = JSON.parse(decodeURIComponent(userCookie));
      const email = user.email;
      const userName = user.userName;

      return {
        isLogin: true,
        email,
        username: userName,
      };
    } catch (error) {
      console.error("Error parsing user cookie:", error);
    }
  } else {
    console.log("User cookie not found");
  }

  return null;
}

// export async function signUp(username: string, password: string) {

//   if (res.error) {
//     responseObject.status = "error";
//     responseObject.message = res.error.message;

//     return responseObject;
//   }

//   if (res.data!.length > 0) {
//     responseObject.status = "error";
//     responseObject.message =
//       "Username is already taken, please choose another one";

//     return responseObject;
//   }

//   if (res.data!.length === 0) {
//     const { error } = await supabase
//       .from("Users")
//       .insert({ username, password });

//     if (error) {
//       responseObject.status = "error";
//       responseObject.message = "Something went wrong, please try again";

//       return responseObject;
//     }

//     if (!error) {
//       // create initial data for user
//       const createdUserDataResponse = await createUserInitialData(username);
//       if (createdUserDataResponse!.status !== "ok") {
//         responseObject.status = "error";
//         responseObject.message = createdUserDataResponse!.message;
//         return responseObject;
//       }

//       sessionStorage.setItem("username", username);
//       sessionStorage.setItem("password", password);

//       responseObject.status = "ok";
//       responseObject.message = "User created successfully";
//       return responseObject;
//     }
//   }

//   responseObject.status = "error";
//   responseObject.message = "Something went wrong, please try again";

//   return responseObject;
// }

// export async function supabaseGetUser(email: string) {
//   const response = await supabase
//     .from("Users")
//     .select("email, password")
//     .eq("email", email);
//   return response;
// }

// export function logOut() {
//   sessionStorage.removeItem("username");
//   sessionStorage.removeItem("password");

//   window.location.reload();
// }

// export async function insertNewTeam(
//   updateMode: "withNewTeamLogo" | "withoutNewTeamLogo",
//   teams: TeamsData,
//   username: string,
//   teamData: {
//     teamName: string;
//     teamLogo: File;
//     strength: string | number;
//     formation: string;
//     color: string;
//     secondaryColor: string;
//     goalSoundEffect: undefined;
//     coachName: string;
//     coach: {
//       name: string;
//     };
//     coachImages: {
//       default: undefined;
//       happy: undefined;
//       sad: undefined;
//     };
//     selectedForMenu: boolean;
//   }
// ) {
//   const teamLogoUrlString = `https://hlbtjfccobphbehsryid.supabase.co/storage/v1/object/public/teamLogos/${generateCorrectFormatOfUsername(
//     username
//   )}/${teamData.teamName}.png`;

//   const previousTeamLogoUrlString = teams[teamData.teamName]?.logoKey;

//   const newTeams = {
//     ...teams,
//     [teamData.teamName]: {
//       name: teamData.teamName,
//       logoKey:
//         updateMode === "withoutNewTeamLogo"
//           ? previousTeamLogoUrlString
//           : teamLogoUrlString,
//       formation: teamData.formation,
//       formationProperties: {
//         defence: "normal",
//         midfield: "normal",
//         attack: "normal",
//       },
//       techniqueProperties: {
//         goalKeeperMotionSpeed: 0,
//         goalKeeperPassSpeed: 0,
//         passSpeeed: 0,
//         passAccuracy: 0,
//         shootSpeed: 0,
//         shootAccuracy: 0,
//         longPassChance: 0,
//         shortPassChance: 0,
//         passDelay: 20,
//       },
//       teamColor: teamData.color,
//       teamSecondaryColor: teamData.secondaryColor,
//       strength: teamData.strength,
//       goalSoundKey: "not_yet",
//       coach: {
//         name: teamData.coachName,
//         image: "none",
//         happyImage: "none",
//         sadImage: "none",
//       },
//       selectedForMenu: teamData.selectedForMenu,
//     },
//   };

//   const updateQuery = await supabase
//     .from("Teams")
//     .update({ teams: newTeams })
//     .eq("owner", username);

//   if (updateQuery.error) {
//     console.log(updateQuery.error.message);
//     return updateQuery.error;
//   } else {
//     console.log("Team Updated successfully");
//   }

//   if (updateMode === "withoutNewTeamLogo") return;

//   // Upload Team Logo
//   const { data, error } = await supabase.storage
//     .from("teamLogos")
//     .upload(
//       `${generateCorrectFormatOfUsername(username)}/${teamData.teamName}.png`,
//       teamData.teamLogo,
//       {
//         // cacheControl: "3600",
//         upsert: true,
//       }
//     );

//   if (error) {
//     console.log(error.message);
//     return error;
//   }

//   return data;
// }

// export async function deleteTeam(
//   teams: TeamsData,
//   username: string,
//   teamName: string
// ) {
//   const newTeams = { ...teams };
//   delete newTeams[teamName];

//   const updateQuery = await supabase
//     .from("Teams")
//     .update({ teams: newTeams })
//     .eq("owner", username);

//   if (updateQuery.error) {
//     console.log(updateQuery.error.message);
//     return updateQuery.error;
//   }

//   return newTeams;
// }

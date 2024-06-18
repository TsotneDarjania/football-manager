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
      </Bound>
    </div>
  );
}

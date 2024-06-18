import { Roboto } from "next/font/google";
import HomePage from "./components/pages/homePage";
import AppProvider from "./context/appContext";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <main className={roboto.className}>
      <HomePage />
    </main>
  );
}

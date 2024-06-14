import CtaButton from "@/app/components/buttons/ctaButton";
import TextAnimation from "@/app/components/tatukaComponents/textAnimation/TextAnimation";
import { AppContext } from "@/app/context/appContext";
import Image from "next/image";
import { useContext } from "react";

export function SimulatorComponent() {
  const appContext = useContext(AppContext);

  return (
    <>
      <div>
        <div className="w-[50vw] hidden sm:block absolute right-0 top-[0px]">
          <CtaButton
            className="custom-font-4 ml-[21vw] mt-[12vh] text-2xl"
            onClick={() => {
              window.location.href = "/simulator";
            }}
            label="Open Simulator"
          />
          {/* Image 1 */}
          <div
            className={
              "w-[36vw] min-h-[260px] grayscale-[100%] relative ml-[10vw] mt-[63vh] shadow"
            }
          >
            <Image
              fill
              src="/website/images/pageAssets/image-3.png"
              sizes="100vw"
              alt="youtube-icon"
            />
          </div>

          {/* Image 2 */}
          <div
            className={
              "w-[36vw] min-h-[260px] grayscale-[100%] relative ml-[10vw] mt-[48vh] shadow "
            }
          >
            <Image
              fill
              src="/website/images/pageAssets/image-4.png"
              sizes="100vw"
              alt="youtube-icon"
            />
          </div>
        </div>

        {/* Text */}
        <div className="ml-2 text-xl w-[90vw] sm:w-[50vw] mt-[80px] text-[#68c0bc] custom-font-4">
          <p>
            As the title says, it is a simulator. More specifically, it is a
            simulator for football matches. Once authorized, you can choose your
            desired teams, set parameters, and then watch the match unfold.
            <br></br>
            <br></br>
            also you can set a lot of options like, with extra times or not, how
            many shopuld be match time, define modes like experimental and
            classic and so on..
            <br></br>
            <br></br>
            trust my experience, if you like footbbal (no soccer), it is realy
            interesting and funny for watch.
            <div className="pt-4 pb-4">
              <CtaButton
                className="custom-font-4 sm:hidden mt-[12vh] text-2xl"
                onClick={() => {
                  window.location.href = "/simulator";
                }}
                label="Open Simulator"
              />
            </div>
          </p>
          <h2 className="text-[#cdf7f4] custom-font-4 font-bold text-2xl mt-[50px] underline">
            Teams
          </h2>
          <p>
            as e default you have 10 teams, which you can choose for match, but
            also you have possibilities to add new team, set what you want to be
            logo, name, parameteres and custtomize how you want.
            <br></br>
            <br></br>
            what you can set as a parameters
            <br></br>
            <br></br>
          </p>
          <p>
            This is the main concept that makes the simulator more interesting.
            You can set parameters such as:
            <span className="flex justify-center text-start">
              <br></br>
              1.Pass speed
              <br></br>
              2.Pass accuracy
              <br></br>
              3.Shoot speed
              <br></br>
              4.Shoot accuracy
              <br></br>
              5.Players motion speed
              <br></br>
              6.Goalkeepers motion speed
              <br></br>
              7.Pass delay
              <br></br>
              8.Formation of footballers
              <br></br>
            </span>
            <br></br>
            Additionally, you can set only the strength parameter, and all other
            parameters will be calculated automatically according to strength.
          </p>
          <h2 className="text-[#cdf7f4] custom-font-4 font-bold text-2xl mt-[50px] underline">
            A Short History and Future Prospects
          </h2>
          <p>
            It was initially envisioned as a one-time project solely for
            recording videos, not as a full-fledged game or anything of the
            sort. After the first demo version was ready, the idea emerged that
            it had the potential to become a manager game. In this game, your
            mission would be to manage your team and make it the best in the
            world, with the main emphasis not on visuals but on strategy and
            tactics. However, the simulator aspect also proved to be quite
            intriguing. It became a realistic simulator where you could try to
            predict real match scores based on FIFA team ratings.
            <br></br>
            <br></br>
            soon I will be adding more features, shaping it to be more suitable
            for content creators on social media platforms
            <br></br>
            <br></br>
            thanks for reading, and please stay tuned for more updates!
            <br></br>
            <br></br>
          </p>
        </div>
      </div>
    </>
  );
}

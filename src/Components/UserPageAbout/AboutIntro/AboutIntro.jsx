import { MdOutlineWavingHand } from "react-icons/md";
import { TiPinOutline } from "react-icons/ti";
import { ModuleType1 } from "../ComponentsForAbout/ModuleType1/ModuleType1";

export const AboutIntro = () => {
  let bio = undefined;
  return (
    <div>
      <ModuleType1 title={"Bio"} icon={<MdOutlineWavingHand size={23} />} name={"About you"} data={bio}/>
      <ModuleType1 title={"Pinned Details"} icon={<TiPinOutline size={25} />} name={"Pinned details"}/>
    </div>
  )
}

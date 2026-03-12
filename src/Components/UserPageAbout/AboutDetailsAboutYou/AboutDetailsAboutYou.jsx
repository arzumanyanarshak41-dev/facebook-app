import { ModuleType1 } from "../ComponentsForAbout/ModuleType1/ModuleType1"
import { CiCirclePlus } from "react-icons/ci";

export const AboutDetailsAboutYou = () => {
  return (
    <div>
      <ModuleType1 title={"About you"} icon={<CiCirclePlus size={25} strokeWidth="0.5"/> } name={"Write some details about yourself"}/>
      <ModuleType1 title={"Favorite quotes"} icon={<CiCirclePlus size={25} strokeWidth="0.5"/>} name={"Add"}/>
    </div>
  )
}

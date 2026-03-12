import { ModuleType1 } from "../ComponentsForAbout/ModuleType1/ModuleType1"
import { MdOutlineOnlinePrediction } from "react-icons/md";
import { BsAlphabetUppercase } from "react-icons/bs";

export const AboutNames = () => {
  return (
    <div>
      <ModuleType1 title={"Name pronuniation"} icon={<MdOutlineOnlinePrediction size={23} />} name={"Name pronuniation"}/>
      <ModuleType1 title={"Other names"} icon={<BsAlphabetUppercase size={23} />} name={"Add other names"}/>
    </div>
  )
}

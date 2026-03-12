import { ModuleType1 } from "../ComponentsForAbout/ModuleType1/ModuleType1";
import { MdOutlineInterests } from "react-icons/md";

export const AboutHobbies = () => {
  return (
    <div>
      <ModuleType1 title={"Hobbies"} icon={<MdOutlineInterests size={23} />} name={"Hobbies"}/>
    </div>
  )
}

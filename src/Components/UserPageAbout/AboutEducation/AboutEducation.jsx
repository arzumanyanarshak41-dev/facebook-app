import { ModuleType1 } from "../ComponentsForAbout/ModuleType1/ModuleType1";
import { MdOutlineSchool } from "react-icons/md";
import { LuSchool } from "react-icons/lu";

export const AboutEducation = () => {
  return (
    <div>
      <ModuleType1 title={"College"} icon={<MdOutlineSchool size={25} />} name={"College"}/>
      <ModuleType1 title={"High school"} icon={<LuSchool size={25} />} name={"High school"}/>
    </div>
  )
}

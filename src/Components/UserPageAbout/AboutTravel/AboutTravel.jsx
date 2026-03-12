import { ModuleType1 } from "../ComponentsForAbout/ModuleType1/ModuleType1";
import { IoLocationOutline } from "react-icons/io5";

export const AboutTravel = () => {
  return (
    <div>
      <ModuleType1 title={"Travel"} icon={<IoLocationOutline size={23} />} name={"Places"}/>      
    </div>
  )
}

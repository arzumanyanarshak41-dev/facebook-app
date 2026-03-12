import { ModuleType1 } from "../ComponentsForAbout/ModuleType1/ModuleType1";
import { MdOutlineHomeWork } from "react-icons/md";

export const AboutWork = () => {
  return (
    <div>
      <ModuleType1 title={"Work"} icon={<MdOutlineHomeWork size={23} />} name={"Work experience"}/>
    </div>
  )
}

import { ModuleType1 } from "../ComponentsForAbout/ModuleType1/ModuleType1"
import { PiLink } from "react-icons/pi";
import { FiPhone } from "react-icons/fi";
import { TbMail } from "react-icons/tb";

export const AboutContactInfo = () => {
  return (
    <div>
      <ModuleType1 title={"Social media"} icon={<PiLink size={23} strokeWidth="3"/>} name={"Social media"}/>
      <ModuleType1 title={"Phone"} icon={<FiPhone size={23} />} name={"Phone number"}/>
      <ModuleType1 title={"Email"} icon={<TbMail size={23} />} name={"Email"}/>
    </div>
  )
}

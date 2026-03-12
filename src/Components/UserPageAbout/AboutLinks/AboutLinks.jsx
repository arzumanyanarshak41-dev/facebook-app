import { ModuleType1 } from "../ComponentsForAbout/ModuleType1/ModuleType1"
import { PiLink } from "react-icons/pi";

export const AboutLinks = () => {
  return (
    <div>
      <ModuleType1 title={"Links"} icon={<PiLink size={23} strokeWidth="3"/>} name={"Websites, blogs, portfolios"}/>
    </div>
  )
}

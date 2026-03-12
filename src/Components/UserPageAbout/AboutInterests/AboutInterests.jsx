import { ModuleType1 } from "../ComponentsForAbout/ModuleType1/ModuleType1"
import { LuMusic4 } from "react-icons/lu";
import { LuTvMinimal } from "react-icons/lu";
import { LuVideo } from "react-icons/lu";
import { LuGamepad2 } from "react-icons/lu";
import { TbShirtSport } from "react-icons/tb";

export const AboutInterests = () => {
  return (
    <div>
      <ModuleType1 title={"Music"} icon={<LuMusic4 size={23} />} name={"Music"}/>
      <ModuleType1 title={"TV shows"} icon={<LuTvMinimal size={23} />} name={"TV shows"}/>
      <ModuleType1 title={"Movies"} icon={<LuVideo size={23} />} name={"Movies"}/>
      <ModuleType1 title={"Games"} icon={<LuGamepad2 size={23} />} name={"Games"}/>
      <ModuleType1 title={"Sports teams and athletes"} icon={<TbShirtSport size={23} />} name={"Sports teams and athletes"}/>
    </div>
  )
}

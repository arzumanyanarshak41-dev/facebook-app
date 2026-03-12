import { ModuleType1 } from "../ComponentsForAbout/ModuleType1/ModuleType1";
import { IoLocationOutline } from "react-icons/io5";
import { IoHomeOutline } from "react-icons/io5";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { RiHeartsLine } from "react-icons/ri";
import { GiBranchArrow } from "react-icons/gi";
import { BsGenderAmbiguous } from "react-icons/bs";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { BiMessageRoundedCheck } from "react-icons/bi";

export const AboutPersonalDetails = () => {
  return (
    <div>
      <ModuleType1 title={"Location"} icon={<IoLocationOutline size={23} />} name={"Current city or town"}/>
      <ModuleType1 title={"Hometown"} icon={<IoHomeOutline size={23} />} name={"Hometown"}/>
      <ModuleType1 title={"Birthday"} icon={<LiaBirthdayCakeSolid size={23} />} name={"Birthday"}/>
      <ModuleType1 title={"Status"} icon={<RiHeartsLine size={23} />} name={"Relationship status"}/>
      <ModuleType1 title={"Family members"} icon={<GiBranchArrow size={23} />} name={"Family"}/>
      <ModuleType1 title={"Gender"} icon={<BsGenderAmbiguous size={23} />} name={"Gender"}/>
      <ModuleType1 title={"Pronouns"} icon={<BiMessageRoundedDetail size={23} />} name={"System pronouns"}/>
      <ModuleType1 title={"Languages"} icon={<BiMessageRoundedCheck size={23} />} name={"Languages"}/>
    </div>
  )
}

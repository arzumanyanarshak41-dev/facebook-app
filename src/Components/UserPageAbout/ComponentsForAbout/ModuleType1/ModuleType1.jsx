import { useState } from "react";
import style from "./moduleType1.module.css"
import { HiOutlinePencil } from "react-icons/hi";

export const ModuleType1 = ({title, icon, name, data}) => {

  const [editMode, setEditMode] = useState(false); 

  return (
    <div className={style.ModuleType1}>
      {
        !editMode ?  
        <div>
          <div className={style.moduleTitle}>{title}</div>
          <div className={style.module}>
            <div className={`${data ? style.iconAndNameHandlerWithoutHover : style.iconAndNameHandler}`} onClick={!data ? () => setEditMode(!editMode) : undefined}>
                {icon}
                <div className={`${data ? style.moduleNameWithData : style.moduleName}`}>{data ? data : name}</div>
            </div>
            {
              data ? 
              <button type="button" className={style.editButton} onClick={() => setEditMode(!editMode)}>
                <HiOutlinePencil size={23} color="rgba(0, 0, 0, 0.4)"/>
              </button> : <></>
            }
          </div>
        </div>
        :
        <div>
          <div className={style.moduleTitle}>{title}</div>
          <form className={style.module}>
            <div className={style.inputHolder}>
              <input type="text" placeholder=" " defaultValue={data}/>
              <div className={style.inputText}>{name}</div>
            </div>
            <hr className={style.divider} />
            <div className={style.buttonsHolder}>
              <button type="button" onClick={() => setEditMode(!editMode)}>Cancel</button>
              <button type="submit">Save</button>
            </div>
          </form>
        </div>
      }
    </div>
  )
}

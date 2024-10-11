import React from 'react';
import { Tooltip } from 'react-tooltip'
import { BsInfoSquare } from "react-icons/bs";
import styles from "./TooltipComp.module.scss"
export interface ITooltipCompProps {
    hoverMsg:string;
}

export default function TooltipComp (props:ITooltipCompProps) {
  return (
   <>
        <a
            data-tooltip-id="my-tooltip"
            data-tooltip-content={props.hoverMsg}
            data-tooltip-place="top"
        >
        <BsInfoSquare className={styles.infoIcon}/>
        </a>

        <Tooltip id="my-tooltip" className={styles.customTooltip} />
   </>
  );
}

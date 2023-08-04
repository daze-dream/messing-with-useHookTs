import { Paper } from "@mui/material";
import { Dispatch, SetStateAction, useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";
export interface UseBooleanOutput {
  value: boolean;
  setValue: Dispatch<SetStateAction<boolean>>;
  setTrue: () => void;
  setFalse: () => void;
  toggle: () => void;
}

type ClickOutsideProps = {
  drawerBoolean: UseBooleanOutput;
};

function ClickOutside({ drawerBoolean }: ClickOutsideProps): JSX.Element {
  const ref = useRef(null);
  const handleClickOutside = () => {
    console.log("sheesh");
    drawerBoolean.setFalse();
  };
  useOnClickOutside(ref, handleClickOutside);
  return <Paper ref={ref}>SIKE</Paper>;
}

export default ClickOutside;

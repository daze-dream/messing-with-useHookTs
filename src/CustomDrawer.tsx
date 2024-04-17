import { Drawer } from "@mui/material";
import { useEffect, useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";

function CustomDrawer({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: Function;
}) {
  const otherRef = useRef(null);

  useEffect(() => {
    console.log('is this open', isOpen);
  }, [isOpen])

  const handleClickOutside = (e: any) => {
    console.log(`sheeshzz ${e.target.id}`, e);
    if (e.target.id !== "drawer-toggle") {
      onClose();
    }
  };
  useOnClickOutside(otherRef, handleClickOutside);
  return (
    <div id={'drawer'} >
      <Drawer

        ref={otherRef}
        open={isOpen}
        PaperProps={{
          style: {
            zIndex: 1202,
            height: "100%",
            width: "70%",
          },
        }}
        onClose={() => onClose()}
        variant="persistent"
        anchor="right"
      >
        <div>STUFF TO SEE</div>
      </Drawer>
    </div>
  );
}

export default CustomDrawer;

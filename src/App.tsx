import { useBoolean, useOnClickOutside } from "usehooks-ts";
import "./App.css";
import {
  CourseSequence,
  TableWithDynamicRowSpan,
} from "./TableWithDynamicRowSpan";
import { Button, Drawer } from "@mui/material";
import { useRef, useState } from "react";
import ComplexForm from "./tryingReducers";

function App() {
  const ref = useRef(null);
  const [hoveredItem, setHoveredItem] = useState<string>(
    "Hover over something"
  );
  const mockData: CourseSequence[] = [
    {
      sequence: 1,
      courseId: "Synthetic Goblins",
      credits: "1",
      sharedPathways: 1,
    },
    {
      sequence: 2,
      courseId: "How to Burn Villages 101",
      credits: "2",
      sharedPathways: 1,
    },
    {
      sequence: 2,
      courseId: "Raiding and Looting 101",
      credits: "1",
      sharedPathways: 1,
    },
    {
      sequence: 3,
      courseId: "Standardized Equipment Studies",
      credits: "1",
      sharedPathways: 1,
    },
    {
      sequence: 4,
      courseId: "Rudimentary Mathematics",
      credits: "1",
      sharedPathways: 1,
    },
  ];
  const handleClickOutside = (e: any) => {
    console.log(`sheesh ${e.target.id}`, e);
    if (e.target.id === "page") {
      drawerBoolean.setFalse();
    }
  };
  useOnClickOutside(ref, handleClickOutside);
  const drawerBoolean = useBoolean(false);

  return (
    <>
      <div
        id="page"
        style={{
          height: "100vh",
          width: "100%",
        }}
      >
        <TableWithDynamicRowSpan
          courseData={mockData}
          hoverFunc={setHoveredItem}
        />
        <Drawer
          ref={ref}
          open={drawerBoolean.value}
          PaperProps={{
            style: {
              height: "100%",
              width: "70%",
            },
          }}
          onClose={drawerBoolean.setFalse}
          variant="persistent"
          anchor="right"
        >
          <div>SHEEESH</div>
        </Drawer>
        <Button onClick={drawerBoolean.toggle}>
          {drawerBoolean.value ? "close" : "open"}
        </Button>
        <div>{hoveredItem}</div>
      </div>
      <div></div>
      <ComplexForm></ComplexForm>
    </>
  );
}

export default App;

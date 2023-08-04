import { TableRow, TableCell } from "@mui/material";
import { CourseSequence } from "./TableWithDynamicRowSpan";
import { useRef } from "react";
import { useHover } from "usehooks-ts";

type TableRowWithHoverProps = {
  course: CourseSequence;
  hasSequenceBeenMade: boolean;
  courseRowSpan: number;
  hoverFunc: Function;
};

function TableRowWithHover({
  course,
  hasSequenceBeenMade,
  courseRowSpan,
  hoverFunc,
}: TableRowWithHoverProps): JSX.Element {
  const hoverRef = useRef(null);
  const isHover = useHover(hoverRef);
  if (isHover) {
    hoverFunc(course.courseId);
  }
//   useEffect(() => {
//     if (isHover) {
//       hoverFunc(course.courseId);
//     }
//   }, [isHover]);
  return (
    <TableRow
      ref={hoverRef}
      style={{
        width: "100%",
      }}
    >
      {!hasSequenceBeenMade && (
        <TableCell rowSpan={courseRowSpan}>{course.sequence}</TableCell>
      )}
      <TableCell>{course.courseId}</TableCell>
      <TableCell>{course.credits}</TableCell>
      <TableCell>{course.sharedPathways}</TableCell>
    </TableRow>
  );
}

export default TableRowWithHover;

import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TableContainer,
  TableHead,
} from "@mui/material";
import TableRowWithHover from "./TableRowWithHover";
import { CourseSequence } from "./data/CourseSequence";
import { useState } from "react";

export type CourseTableProps = {
  courseData: CourseSequence[];
};

export function TableWithDynamicRowSpan(props: CourseTableProps) {
  const [hoveredItem, setHoveredItem] = useState<string>(
    "Hover over something"
  );
  const { courseData } = props;
  const sequenceAndSpanSize = new Map<number, number>();
  courseData.forEach((course) => {
    const found = sequenceAndSpanSize.get(course.sequence);
    if (found !== undefined) {
      sequenceAndSpanSize.set(course.sequence, found + 1);
    } else {
      sequenceAndSpanSize.set(course.sequence, 1);
    }
  });
  const rowElements: JSX.Element[] = [];
  const multiCourseSequencesAdded = new Set<number>();

  courseData.forEach((course) => {
    let hasSequenceBeenMade: boolean = false;
    const courseRowSpan = sequenceAndSpanSize.get(course.sequence);
    if (courseRowSpan !== undefined) {
      if (courseRowSpan > 1) {
        hasSequenceBeenMade = multiCourseSequencesAdded.has(course.sequence);
        if (!hasSequenceBeenMade) {
          multiCourseSequencesAdded.add(course.sequence);
        }
      }
      const elementToAdd = (
        <TableRowWithHover
          hasSequenceBeenMade={hasSequenceBeenMade}
          course={course}
          courseRowSpan={courseRowSpan}
          hoverFunc={setHoveredItem}
        />
      );
      rowElements.push(elementToAdd);
    }
  });
  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Sequence</TableCell>
              <TableCell>CourseId</TableCell>
              <TableCell>Credits</TableCell>
              <TableCell>Shared Pathways</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{...rowElements}</TableBody>
        </Table>
      </TableContainer>
      <div>{hoveredItem}</div>
    </div>
  );
}

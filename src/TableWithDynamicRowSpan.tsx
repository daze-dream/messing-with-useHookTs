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

export type CourseSequence = {
  sequence: number;
  courseId: string;
  credits: string;
  sharedPathways: number;
};

export type CourseTableProps = {
  courseData: CourseSequence[];
  hoverFunc: Function;
};

export function TableWithDynamicRowSpan(props: CourseTableProps) {
  const { courseData, hoverFunc } = props;
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
          hoverFunc={hoverFunc}
        />
      );
      rowElements.push(elementToAdd);
    }
  });
  return (
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
  );
}

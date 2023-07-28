
import { Table, TableBody, TableRow, TableCell, Paper, TableContainer, TableHead } from "@mui/material";

export type CourseSequence = {
    sequence: number;
    courseId: string;
    credits: string;
    sharedPathways: number
}

export type CourseTableProps = {
    courseData: CourseSequence[]
}

export function CourseTable(props: CourseTableProps) {
    const { courseData } = props
    const sequenceAndSpanSize = new Map<number, number>();
    courseData.forEach((course) => {
        const found = sequenceAndSpanSize.get(course.sequence);
        if (found !== undefined) {
            sequenceAndSpanSize.set(course.sequence, found + 1);
        }
        else {
            sequenceAndSpanSize.set(course.sequence, 1);

        }
    })
    const rowElements: JSX.Element[] = [];
    const multiCourseSequencesAdded = new Set<number>();

    courseData.forEach((course) => {
        let hasSequenceBeenMade: boolean = false
        const courseRowSpan = sequenceAndSpanSize.get(course.sequence);
        if (courseRowSpan !== undefined) {
            if (courseRowSpan > 1) {
                hasSequenceBeenMade = multiCourseSequencesAdded.has(course.sequence);
                if(!hasSequenceBeenMade) {
                    multiCourseSequencesAdded.add(course.sequence);
                }
            }
            const elementToAdd = (<TableRow>
                {!hasSequenceBeenMade && <TableCell rowSpan={courseRowSpan}>{course.sequence}</TableCell>}
                <TableCell>{course.courseId}</TableCell>
                <TableCell>{course.credits}</TableCell>
                <TableCell>{course.sharedPathways}</TableCell>
            </TableRow>)
            rowElements.push(elementToAdd)
        }
    })
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
                <TableBody>
                    {...rowElements}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

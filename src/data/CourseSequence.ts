export type CourseSequence = {
  sequence: number;
  courseId: string;
  credits: string;
  sharedPathways: number;
};

export const mockData: CourseSequence[] = [
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

import { createBrowserRouter } from "react-router-dom";
import { TableWithDynamicRowSpan } from "./TableWithDynamicRowSpan";
import { mockData } from "./data/CourseSequence";
import ClippedDrawer from "./temp";
import { ComplexForm } from "./tryingReducers";

const router = createBrowserRouter([
  {
    path: "/basic_forms",
    element: <ComplexForm />,
  },
  {
    path: "/",
    element: <div> Having fun?</div>,
  },
  { path: "/clipped_drawer", element: <ClippedDrawer></ClippedDrawer> },
  {
    path: "/table_crap",
    element: <TableWithDynamicRowSpan courseData={mockData} />,
  },
]);

export default router;

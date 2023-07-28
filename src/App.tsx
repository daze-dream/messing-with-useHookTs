import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { CourseSequence, CourseTable } from './CourseTable'



function App() {
  const [count, setCount] = useState(0);
  
  const mockData: CourseSequence[] = [
    {
      sequence: 1,
      courseId: '1',
      credits: '1',
      sharedPathways: 1
    },
    {
      sequence: 2,
      courseId: '2',
      credits: '2',
      sharedPathways: 1
    },
    {
      sequence: 2,
      courseId: '3',
      credits: '1',
      sharedPathways: 1
    },
    {
      sequence: 2,
      courseId: '6',
      credits: '1',
      sharedPathways: 1
    },
    {
      sequence: 3,
      courseId: '4',
      credits: '1',
      sharedPathways: 1
    },
  ]

  return (
    <>    <div>
      <CourseTable courseData={mockData}/>
    </div></>

  )
  
}

export default App

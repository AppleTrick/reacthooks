'use client';

import { useReducer, useState } from 'react';
import Student from './Student';
import { count } from 'console';

interface StudentProps {
  id: number;
  name: string;
  isHere: boolean;
}
interface State {
  count: number;
  students: StudentProps[];
}

interface AddStudentAction {
  type: 'add-student';
  payload: { name: string };
}

interface DeleteStudentAction {
  type: 'delete-student';
  payload: { id: number };
}

interface MarkStudent {
  type: 'mark-student';
  payload: { id: number };
}

type Action = AddStudentAction | DeleteStudentAction | MarkStudent;

const initialstate: State = {
  count: 0,
  students: [],
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'add-student':
      const name = action.payload.name;
      const newStudent = {
        id: Date.now(),
        name,
        isHere: true,
      };
      return {
        count: state.count + 1,
        students: [...state.students, newStudent],
      };
    case 'delete-student':
      return {
        count: state.count - 1,
        students: state.students.filter((student) => student.id !== action.payload.id),
      };
    case 'mark-student':
      return {
        count: state.count,
        students: state.students.map((student) => {
          if (student.id === action.payload.id) {
            return { ...student, isHere: !student.isHere };
          }
          return student;
        }),
      };

    default:
      return state;
  }
};

const UseReducerEx1 = () => {
  const [name, setName] = useState('');
  const [studentInfo, dispatch] = useReducer(reducer, initialstate);

  return (
    <>
      <h1>useReducer 출석부 예제</h1>
      <p>총 학생수 : {studentInfo.count}</p>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={() => dispatch({ type: 'add-student', payload: { name: name } })}>추가</button>
      {studentInfo.students.map((student: StudentProps) => {
        return <Student key={student.id} name={student.name} dispatch={dispatch} id={student.id} isHere={student.isHere} />;
      })}
    </>
  );
};

export default UseReducerEx1;

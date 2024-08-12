'use client';

import { Dispatch } from 'react';

interface Action {
  type: 'delete-student' | 'mark-student';
  payload: { id: number };
}

interface StudentProps {
  name: string;
  dispatch: Dispatch<Action>;
  id: number;
  isHere: boolean;
}

const Student: React.FC<StudentProps> = ({ name, dispatch, id, isHere }) => {
  return (
    <div>
      <span
        style={{ textDecoration: isHere ? 'line-through' : 'none', color: isHere ? 'gray' : 'black' }}
        onClick={() =>
          dispatch({
            type: 'mark-student',
            payload: { id },
          })
        }
      >
        {name}
      </span>
      <button
        onClick={() =>
          dispatch({
            type: 'delete-student',
            payload: { id: id },
          })
        }
      >
        삭제
      </button>
    </div>
  );
};

export default Student;

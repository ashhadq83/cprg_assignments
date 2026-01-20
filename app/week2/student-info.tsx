import React from 'react';
import Link from 'next/link';

type Student = {
  name: string;
  github: string;
};

const StudentInfo: React.FC = () => {
  const student: Student = {
    name: 'Ashhad',
    github: 'https://github.com/ashhadq83/cprg_assignments',
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Inter, sans-serif' }}>
      <h1>{student.name}</h1>
      <p>
        GitHub:{" "}
        <Link href={student.github}>
          <span style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>
            github link
          </span>
        </Link>
      </p>
    </div>
  );
};

export default StudentInfo;
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333',
});

const GRADE_VALIDATION = [
  {
    id: 1,
    gradeType: 'Exercicios',
    minValue: 0,
    maxValue: 10,
  },
  {
    id: 2,
    gradeType: 'Trabalho Prático',
    minValue: 0,
    maxValue: 40,
  },
  {
    id: 3,
    gradeType: 'Desafio',
    minValue: 0,
    maxValue: 50,
  },
];

async function getAllGrades() {
  const res = await api.get('/grades');
  const grades = res.data.map((grade) => {
    const { student, subject, type } = grade;
    return {
      ...grade,
      studentLowerCase: student.toLowerCase(),
      subjectLowerCase: subject.toLowerCase(),
      typeLowerCase: type.toLowerCase(),
      isDeleted: false,
    };
  });
  let allStudents = new Set();
  grades.forEach((grade) => allStudents.add(grade.student));
  return grades;
}

export { api, getAllGrades };

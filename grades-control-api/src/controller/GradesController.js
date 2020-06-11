import { readFile, writeFile } from './FileController.js';

const GradeController = {
  index: (req, res) => {
    try {
      const { grades } = readFile();
      return res.status(200).json(grades);
    } catch (error) {
      logger.erro(erro);
      return res
        .status(500)
        .json({ erro: 'Error on process request! Await and access again' });
    }
  },

  findById: (req, res) => {
    try {
      const { grades } = readFile();
      const { id } = req.params;
      const grade = grades.find((grade) => grade.id === Number(id));
      if (!grade) {
        return res.status(404).json();
      }
      return res.json(grade);
    } catch (error) {
      logger.erro(erro);
      return res
        .status(500)
        .json({ erro: 'Error on process request! Await and access again' });
    }
  },

  create: (req, res) => {
    try {
      const data = readFile();
      const { student, subject, type, value } = req.body;
      const object = {
        id: data.nextId,
        student,
        subject,
        type,
        value,
        timestamp: new Date(),
      };
      data.grades.push(object);
      data.nextId = ++data.nextId;
      writeFile(data);
      return res.status(201).json(object);
    } catch (error) {
      logger.erro(erro);
      return res
        .status(500)
        .json({ erro: 'Error on process request! Await and access again' });
    }
  },

  update: (req, res) => {
    try {
      const { id } = req.params;
      const { nextId, grades } = readFile();
      const { student, subject, type, value } = req.body;
      const object = {
        student,
        subject,
        type,
        value,
      };
      const index = grades.findIndex((grade) => grade.id === Number(id));
      if (index < 0) {
        return res.status(404).json();
      }
      grades[index] = {
        id: grades[index].id,
        timestamp: grades[index].timestamp,
        ...object,
      };
      writeFile({ nextId, grades });
      return res.status(201).json(object);
    } catch (error) {
      logger.erro(erro);
      return res
        .status(500)
        .json({ erro: 'Error on process request! Await and access again' });
    }
  },

  delete: (req, res) => {
    try {
      const { id } = req.params;
      const { nextId, grades } = readFile();

      const index = grades.findIndex((grade) => grade.id === Number(id));
      if (index < 0) {
        return res.status(404).json();
      }
      grades.splice(index, 1);
      writeFile({ nextId, grades });
      return res.status(204).json();
    } catch (error) {
      logger.erro(erro);
      return res
        .status(500)
        .json({ erro: 'Error on process request! Await and access again' });
    }
  },

  findGradesByStudantsAndSubject: (req, res) => {
    try {
      const { subject, student } = req.query;
      const { grades } = readFile();
      var a = [];
      const resutlsGrade = grades.filter(
        (grade) => grade.student === student && grade.subject === subject
      );
      const sum = resutlsGrade.reduce(
        (total, grade) => (total += grade.value),
        0
      );
      return res.status(200).json({ gradesSum: sum });
    } catch (error) {
      logger.erro(erro);
      return res
        .status(500)
        .json({ erro: 'Error on process request! Await and access again' });
    }
  },
  findMeduinGradesByStudantsAndSubject: (req, res) => {
    try {
      const { subject, type } = req.query;
      const { grades } = readFile();
      var a = [];
      const resutlsGrade = grades.filter(
        (grade) => grade.type === type && grade.subject === subject
      );
      const sum = resutlsGrade.reduce(
        (total, grade) => (total += grade.value),
        0
      );
      const medium = sum / resutlsGrade.length;
      return res.status(200).json({ gradesMedium: medium });
    } catch (error) {
      logger.erro(erro);
      return res
        .status(500)
        .json({ erro: 'Error on process request! Await and access again' });
    }
  },
  findTreeBestGradesByStudantsAndSubject: (req, res) => {
    try {
      const { subject, type } = req.query;
      const { grades } = readFile();
      var a = [];
      const resutlsGrade = grades
        .filter((grade) => grade.type === type && grade.subject === subject)
        .sort((a, b) => b.value - a.value);

      console.log(resutlsGrade);
      return res.status(200).json({ ...resutlsGrade.slice(0, 3) });
    } catch (error) {
      logger.erro(erro);
      return res
        .status(500)
        .json({ erro: 'Error on process request! Await and access again' });
    }
  },
};

export default GradeController;

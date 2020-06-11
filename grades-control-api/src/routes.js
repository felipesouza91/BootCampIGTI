import express from 'express';
import GradeController from './controller/GradesController.js';

const router = express.Router();

router.get('/sum', GradeController.findGradesByStudantsAndSubject);
router.get('/medium', GradeController.findMeduinGradesByStudantsAndSubject);
router.get(
  '/best-grades',
  GradeController.findTreeBestGradesByStudantsAndSubject
);

router.get('/', GradeController.index);
router.get('/:id', GradeController.findById);
router.post('/', GradeController.create);
router.put('/:id', GradeController.update);
router.delete('/:id', GradeController.delete);

export default router;

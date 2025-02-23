import { body, validationResult } from 'express-validator';

const validateInput = [
    body('nombre').notEmpty(),
    body('email').isEmail(),
    body('contraseña').isLength({ min: 6 }),
    body('tarea').notEmpty(),
    body('completada').isBoolean(),
    body('creada').isISO8601(),
    body('dia').isISO8601(),
    body('duracion').isNumeric(),
    body('id').isNumeric(),
    body('hora_de_realizacion').isISO8601(),
    body('veces_hechas').isNumeric(),
    body('veces_no_hechas').isNumeric(),
    body('nota').notEmpty(),
    body('objetivo').notEmpty(),
    body('subtareas').isArray(),
    async (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
  ];

  export default  validateInput
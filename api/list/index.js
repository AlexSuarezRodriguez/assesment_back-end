const { Router } = require('express');
const { isAuthenticated } = require('../../auth/auth.service');

const {
  handlerGetAllList,
  handlerGetlistById,
  handlerCreateList,
  handlerUpdateList,
  handlerDeleteList,
} = require('./list.controller');

const router = Router();

router.get('/', isAuthenticated(), handlerGetAllList);
router.get('/:id', isAuthenticated(), handlerGetlistById);
router.post('/', isAuthenticated(), handlerCreateList);
router.patch('/:id', isAuthenticated(), handlerUpdateList);
router.delete('/:id', isAuthenticated(), handlerDeleteList);

module.exports = router;

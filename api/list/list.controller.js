const {
  getAllList,
  getlistById,
  createList,
  updateList,
  deleteList,
} = require('./list.service');

async function handlerGetAllList(request, response) {
  try {
    const list = await getAllList();
    response.status(200).json(list);
  } catch (error) {
    response.status(404).json({ message: 'error' });
  }
}

async function handlerGetlistById(request, response) {
  const { id } = request.params;
  try {
    const list = await getlistById(id);
    response.status(200).json(list);
  } catch (error) {
    response.status(404).json({ message: 'error' });
  }
}

async function handlerCreateList(request, response) {
  const newList = request.body;
  try {
    const list = await createList(newList);
    response.status(201).json(list);
  } catch (error) {
    response.status(404).json({ message: 'error' });
  }
}
async function handlerUpdateList(request, response) {
  const { id } = request.params;
  const { body } = request;
  try {
    const updatedList = await updateList(id, body);
    response.status(201).json(updatedList);
  } catch (error) {
    response.status(500).json({ message: 'error' });
  }
}
async function handlerDeleteList(request, response) {
  const { id } = request.params;

  try {
    const deletedList = await deleteList(id);
    response.status(200).json(deletedList);
  } catch (error) {
    response.status(404).json({ message: 'error' });
  }
}

module.exports = {
  handlerGetAllList,
  handlerGetlistById,
  handlerCreateList,
  handlerUpdateList,
  handlerDeleteList,
};

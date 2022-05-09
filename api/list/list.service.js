const ListModel = require('./list.model');

async function getAllList() {
  const lists = await ListModel.find();
  return lists;
}

async function getlistById(id) {
  const list = await ListModel.findById(id);
  return list;
}

async function createList(list) {
  const newList = await ListModel.create(list);
  return newList;
}

async function updateList(id, list) {
  const updatedList = await ListModel.findByIdAndUpdate(id, { $push: { item: list } });
  return updatedList;
}

async function deleteList(id) {
  const list = await ListModel.findByIdAndDelete(id);
  return list;
}

module.exports = {
  getAllList,
  getlistById,
  createList,
  updateList,
  deleteList,
};

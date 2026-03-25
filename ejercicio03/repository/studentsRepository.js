let students = [
  {
    id: 1,
    name: "Ana",
    grade: 18,
    age: 20,
    email: "ana@mail.com",
    phone: "999111222",
    status: "Activo"
  },
  {
    id: 2,
    name: "Luis",
    grade: 14,
    age: 22,
    email: "luis@mail.com",
    phone: "999333444",
    status: "Inactivo"
  }
];

let nextId = 3;

// GET ALL
const getAll = () => students;

// GET BY ID
const getById = (id) => students.find(s => s.id === id);

// CREATE
const create = (data) => {
  const newStudent = {
    id: nextId++,
    name: data.name,
    grade: data.grade || 0,
    age: data.age || 0,
    email: data.email,
    phone: data.phone,
    status: data.status || "Activo"
  };

  students.push(newStudent);
  return newStudent;
};

// UPDATE
const update = (id, data) => {
  const index = students.findIndex(s => s.id === id);
  if (index === -1) return null;

  students[index] = { ...students[index], ...data };
  return students[index];
};

// DELETE
const remove = (id) => {
  const index = students.findIndex(s => s.id === id);
  if (index === -1) return null;

  const deleted = students[index];
  students.splice(index, 1);
  return deleted;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};
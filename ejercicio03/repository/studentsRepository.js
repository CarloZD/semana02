let students = [
  {
    id: 1,
    name: "Ana",
    grade: 18,
    age: 20,
    email: "ana@mail.com",
    phone: "999111222",
    enrollmentNumber: "2025001",
    course: "Diseño y Desarrollo de Software C24",
    year: 3,
    subjects: ["Algoritmos", "Bases de Datos", "Redes"],
    gpa: 3.8,
    status: "Activo",
    admissionDate: "2022-03-01"
  },
  {
    id: 2,
    name: "Luis",
    grade: 14,
    age: 22,
    email: "luis@mail.com",
    phone: "999333444",
    enrollmentNumber: "2025002",
    course: "Ingeniería de Sistemas",
    year: 2,
    subjects: ["Matemáticas", "Física"],
    gpa: 3.2,
    status: "Inactivo",
    admissionDate: "2023-03-01"
  }
];

let nextId = 3;

const getAll = () => students;

const getById = (id) => students.find(s => s.id === id);

const create = (data) => {
  const newStudent = {
    id: nextId++,
    name: data.name,
    grade: data.grade || 0,
    age: data.age || 0,
    email: data.email,
    phone: data.phone,
    enrollmentNumber: data.enrollmentNumber || "",
    course: data.course || "",
    year: data.year || 1,
    subjects: data.subjects || [],
    gpa: data.gpa || 0,
    status: data.status || "Activo",
    admissionDate: data.admissionDate || ""
  };

  students.push(newStudent);
  return newStudent;
};

const update = (id, data) => {
  const index = students.findIndex(s => s.id === id);
  if (index === -1) return null;

  students[index] = { ...students[index], ...data };
  return students[index];
};

const remove = (id) => {
  const index = students.findIndex(s => s.id === id);
  if (index === -1) return null;

  const deleted = students[index];
  students.splice(index, 1);
  return deleted;
};

module.exports = { getAll, getById, create, update, remove };
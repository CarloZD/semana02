const http = require("http");
const repo = require("./repository/studentsRepository");

const PORT = 4000;

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  const { method, url } = req;

  // -------- GET ALL --------
  if (url === "/students" && method === "GET") {
    res.statusCode = 200;
    res.end(JSON.stringify(repo.getAll()));
  }

  // -------- GET BY ID --------
  else if (url.startsWith("/students/") && method === "GET") {
    const id = parseInt(url.split("/")[2]);
    const student = repo.getById(id);

    if (student) {
      res.statusCode = 200;
      res.end(JSON.stringify(student));
    } else {
      res.statusCode = 404;
      res.end(JSON.stringify({ error: "Estudiante no encontrado" }));
    }
  }

  // -------- CREATE --------
    else if (url === "/students" && method === "POST") {
      let body = "";

      req.on("data", chunk => (body += chunk));

      req.on("end", () => {
        const data = JSON.parse(body);

        // VALIDACIÓN — campos obligatorios
        if (!data.name || !data.email || !data.phone || !data.course) {
          res.statusCode = 400;
          return res.end(JSON.stringify({
            error: "Nombre, email, teléfono y carrera son obligatorios"
          }));
        }

        const newStudent = repo.create(data);
        res.statusCode = 201;
        res.end(JSON.stringify(newStudent));
      });
    }

  // -------- UPDATE --------
  else if (url.startsWith("/students/") && method === "PUT") {
    const id = parseInt(url.split("/")[2]);
    let body = "";

    req.on("data", chunk => (body += chunk));

    req.on("end", () => {
      const updated = repo.update(id, JSON.parse(body));

      if (updated) {
        res.statusCode = 200;
        res.end(JSON.stringify(updated));
      } else {
        res.statusCode = 404;
        res.end(JSON.stringify({ error: "Estudiante no encontrado" }));
      }
    });
  }

  // -------- DELETE --------
  else if (url.startsWith("/students/") && method === "DELETE") {
    const id = parseInt(url.split("/")[2]);
    const deleted = repo.remove(id);

    if (deleted) {
      res.statusCode = 200;
      res.end(JSON.stringify(deleted));
    } else {
      res.statusCode = 404;
      res.end(JSON.stringify({ error: "Estudiante no encontrado" }));
    }
  }

  // -------- FILTRO POR STATUS --------
  else if (url === "/ListByStatus" && method === "POST") {
    let body = "";

    req.on("data", chunk => (body += chunk));

    req.on("end", () => {
      const { status } = JSON.parse(body);

      const result = repo.getAll().filter(s => s.status === status);

      res.statusCode = 200;
      res.end(JSON.stringify(result));
    });
  }

  // -------- FILTRO POR NOTA --------
  else if (url === "/ListByGrade" && method === "POST") {
    let body = "";

    req.on("data", chunk => (body += chunk));

    req.on("end", () => {
      const { minGrade } = JSON.parse(body);

      const result = repo.getAll().filter(s => s.grade >= minGrade);

      res.statusCode = 200;
      res.end(JSON.stringify(result));
    });
  }

  // -------- 404 --------
  else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: "Ruta no encontrada" }));
  }
});

server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
const express = require("express");
const Products = require("./api/products");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Memoria
let products = Products;

app.get("/api/productos/listar", (req, res) => {
  console.log(products.get());
  if (products.get().length === 0) {
    res.json({ error: "No hay productos cargados" });
  }

  res.json(products.get());
});

app.get("/api/productos/listar/:id", (req, res) => {
  if (
    products.get().length === 0 ||
    !products.get().some((p) => p.id === req.params.id)
  ) {
    res.json({ error: "Producto no encontrado" });
  }

  res.json(products.getById(req.params.id));
});

app.post("/api/productos/guardar", (req, res) => {
  const object = req.body;
  //TODO: Puede que quiera que sea de tipo number
  //Pero con esto me ahorro de validar si es numero despues :p

  object.id = String(products.get().length + 1);
  products.save(object);

  res.json(object);
});

const puerto = 8080;

const server = app.listen(puerto, () => {
  console.log(`servidor escuchando en http://localhost:${puerto}`);
});

server.on("error", (error) => {
  console.log("error en el servidor:", error);
});

const fs = require("fs");

//Ejercicio 2
//punto 1
const obtenerTodosProductos = async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/products");

    if (response.ok) {
      const data = await response.json();
      //  console.log(data);
      return data;
    } else {
      console.error(
        `Error al obtener los personajes: ${response.status} - ${response.statusText}`
      );
    }
  } catch (error) {
    console.error(`Error de red o de servidor: ${error.message}`);
  }
};

//punto 2

const obtenerProductosLimitados = async (limit) => {
  try {
    const response = await fetch(
      `https://fakestoreapi.com/products?limit=${limit}`
    );

    if (response.ok) {
      const data = await response.json();
      //  console.log(data);
      return data;
    } else {
      console.error(
        `Error al obtener los personajes: ${response.status} - ${response.statusText}`
      );
    }
  } catch (error) {
    console.error(`Error de red o de servidor: ${error.message}`);
  }
};

//punto 3.a Se crea la funcion para almacenar los productos en archivo JSON

const guardarJson = async () => {
  try {
    const todosProductos = await obtenerTodosProductos();
    const productosJson = JSON.stringify(todosProductos, null, 2);

    fs.writeFileSync("./productos.json", productosJson, "utf-8");

    console.log("Se ha guardado el archivo (punto 3.a)");
  } catch (error) {
    console.error(`Error de red o de servidor: ${error.message}`);
  }
};

const nuevoProducto = {
  id: 21,
  title: "Nuevo producto - Este es el producto nuevo agregado ",
  price: 109.95,
  description:
    "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
  category: "men's clothing",
  image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  rating: {
    rate: 3.9,
    count: 120,
  },
};

const agregarNuevoProducto = (nuevoProducto) => {
  const leerJson = fs.readFileSync("./productos.json", "utf-8");
  const productos = JSON.parse(leerJson);

  productos.push(nuevoProducto);

  fs.writeFileSync("./productos.json", JSON.stringify(productos, null, 2));
  console.log("Se ha agregado el nuevo producto");
};

//ejercicio 4

const obtenerProductoById = (id) => {
  try {
    const leerProductos = fs.readFileSync("./productos.json", "utf-8");
    const productos = JSON.parse(leerProductos);

    const encontrarProducto = productos.find((producto) => producto.id === id);
    return encontrarProducto;
  } catch (error) {
    console.error("Error al leer el archivo local: " + error.message);
  }
};

//Ejercicio 5

const eliminarProducto = (id) => {
  try {
    const productoAEliminar = obtenerProductoById(id);
    const leerJson = fs.readFileSync("./productos.json", "utf-8");
    const productos = JSON.parse(leerJson);
    const nuevoArray = productos.filter(
      (producto) => producto.id !== productoAEliminar.id
    );

    fs.writeFileSync("./productos.json", JSON.stringify(nuevoArray, null, 2));

    return `Se ha eliminado el producto con el ID: ${id}`;
  } catch (error) {
    console.error("Error al leer el archivo local: " + error.message);
  }
};

(async () => {
  console.log(await obtenerTodosProductos());
  await obtenerProductosLimitados(10);
  await guardarJson();
  agregarNuevoProducto(nuevoProducto);
  console.log(obtenerProductoById(21));
  console.log(eliminarProducto(18));
})();

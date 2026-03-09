const express = require("express");
const app = express();

const PORT = 3000;

app.use(express.json());

let productos = [
    { id: 1, nombre: "Laptop", precio: 15000 },
    { id: 2, nombre: "Mouse", precio: 500 }
];

app.get("/productos", (req, res) => {
    res.status(200).json(productos);
});

app.post("/productos", (req, res) => {
    const {nombre, precio} = req.body;

    if(!nombre || typeof(nombre) !== "string")
        return res.status(400).json({error: "El nombre es invalido"});
    
    if(!precio || precio <= 0)
        return res.status(400).json({error: "El precio es invalido"});

    const nuevoProducto = {
        id: productos.length + 1,
        nombre,
        precio
    };

    productos.push(nuevoProducto);
    res.status(200).json(nuevoProducto);
})

app.put("/productos/:id", (req, res) => {
    const idBuscar = parseInt(req.params.id);
    const {nombre, precio} = req.body;

    const indice = productos.findIndex(p => p.id === idBuscar);

    if(indice === -1){
        return res.status(404).json({error: "No se encontró el producto"});
    }

    if(!nombre || typeof(nombre) !== "string")
        return res.status(400).json({error: "El nombre es invalido"});
    
    if(!precio || precio <= 0)
        return res.status(400).json({error: "El precio es invalido"});

    productos[indice] = {
        id: idBuscar,
        nombre,
        precio
    }
    return res.status(200).json(productos[indice])
});

app.delete("/productos/:id", (req, res) => {
    const idBuscar = parseInt(req.params.id);
    const indice = productos.findIndex(p => p.id === idBuscar);

    if(indice === -1)
        return res.status(404).json({error: "No se encontró el producto"});

    productos.splice(indice, 1);
    return res.status(200).json({estado: "Se borro con exito"});
});


app.listen(PORT, () => {
    console.log('Servidor activo en http://localhost:' + PORT)
})
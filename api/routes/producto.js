
const express = require('express');
const router = express.Router();
const Producto = require('../../models/Producto'); 
const Proveedor = require('../../models/Proveedor'); 


router.get('/', async (req, res) => {
  try {
    const productos = await Producto.findAll();
    res.json(productos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un error en el servidor.' });
  }
});
router.get('/producto/:id', async (req, res) => {
  const productoId = req.params.id;

  try {
    const producto = await Producto.findByPk(productoId);
    
    if (!producto) {
      res.status(404).json({ message: 'Producto no encontrado.' });
    } else {
      res.json(producto);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un error en el servidor.' });
  }
});

router.put('/actualizarStock/:id', async (req, res) => {
  const productoId = req.params.id;
  const cantidadVendida = parseFloat(req.body.cantidadVendida); // Convertir a número

  if (isNaN(cantidadVendida)) {
    res.status(400).json({ message: 'Cantidad vendida no es un número válido.' });
    return;
  }

  try {
    
    const producto = await Producto.findByPk(productoId);

    if (producto) {
      
      producto.stock += cantidadVendida;

      
      await producto.save();

      res.status(200).json({ message: 'Stock de productos actualizado con éxito' });
    } else {
      res.status(404).json({ message: 'Producto no encontrado.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un error en el servidor al actualizar el stock de productos.' });
  }
});




router.put('/editarProducto/:id', async (req, res) => {
    const productoId = req.params.id;
    const {
      nombreProducto,
      tipoProducto,
      descripcion,
      precio,
      stock,
      fechaVencimiento,
    } = req.body;
  
    try {
      const result = await Producto.update(
        {
          nombreProducto,
          tipoProducto,
          descripcion,
          precio,
          stock,
          fechaVencimiento,
        },
        { where: { id: productoId } }
      );
  
      if (result[0] === 1) {
        res.status(200).json({ message: 'Registro de producto actualizado exitosamente.' });
      } else {
        res.status(404).json({ message: 'Registro de producto no encontrado.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Hubo un error en el servidor.' });
    }
  });
  

router.post('/productosInsertar', async (req, res) => {
  const {
    nombreProducto,
    tipoProducto,
    descripcion,
    precio,
    stock,
    fechaVencimiento,
    proveedorID
  } = req.body;

  try {
    
    await Producto.create({
      nombreProducto,
      tipoProducto,
      descripcion,
      precio,
      stock,
      fechaVencimiento,
      proveedorID
    });

    res.status(201).json({ message: 'Producto insertado exitosamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un error en el servidor al insertar el producto.' });
  }
});
  
router.delete('/eliminarProducto/:id', async (req, res) => {
    const productoId = req.params.id;
  
    try {
      const result = await Producto.destroy({ where: { id: productoId } });
  
      if (result === 1) {
        res.status(200).json({ message: 'Registro de producto eliminado exitosamente.' });
      } else {
        res.status(404).json({ message: 'Registro de producto no encontrado.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Hubo un error en el servidor.' });
    }
  });

module.exports = router;

const express = require('express');
const router = express.Router();
const Compras = require('../../models/Compras'); 


router.get('/', async (req, res) => {
    try {
      const compras = await Compras.findAll();
      res.json(compras);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Hubo un error .' });
    }
  });


router.post('/insertarCompras', async (req, res) => {
  try {
    
    const { nombreProducto, cantidad_vendida, precio_unitario, total, IDProveedor, IDProducto, fecha } = req.body;

    
    const nuevaCompra = await Compras.create({
      nombreProducto,
      cantidad_vendida,
      precio_unitario,
      total,
      IDProveedor,
      IDProducto,
      fecha
    });

    res.status(201).json({ message: 'Compra registrada con éxito', compra: nuevaCompra });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un error al registrar la compra' });
  }
});




router.put('/editarCompra/:id', async (req, res) => {
  try {
    
    const compraId = req.params.id;

    
    const { nombreProducto, cantidad_vendida, precio_unitario, total, IDProveedor, IDProducto, fecha } = req.body;

    
    const compraExistente = await Compras.findByPk(compraId);

    if (!compraExistente) {
      return res.status(404).json({ error: 'Compra no encontrada' });
    }

    
    await compraExistente.update({
      nombreProducto,
      cantidad_vendida,
      precio_unitario,
      total,
      IDProveedor,
      IDProducto,
      fecha
    });

    res.status(200).json({ message: 'Compra actualizada con éxito', compra: compraExistente });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un error al actualizar la compra' });
  }
});



router.put('/editarPrecioUnitario/:id', async (req, res) => {
  const compraId = req.params.id;
  const { precio_unitario } = req.body;

  try {
    const result = await Compras.update(
      { precio_unitario },
      { where: { id: compraId } }
    );

    if (result[0] === 1) {
      res.status(200).json({ mensaje: 'Precio_unitario actualizado exitosamente' });
    } else {
      res.status(404).json({ mensaje: 'Compra no encontrada o ningún cambio realizado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Hubo un error en el servidor al actualizar el precio_unitario' });
  }
});


router.delete('/eliminarCompra/:id', async (req, res) => {
  const compraId = req.params.id;

  try {
    
    const result = await Compras.destroy({ where: { id: compraId } });

    if (result === 1) {
      res.status(200).json({ mensaje: 'Compra eliminada exitosamente' });
    } else {
      res.status(404).json({ mensaje: 'Compra no encontrada o ningún cambio realizado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Hubo un error en el servidor al eliminar la compra' });
  }
});



module.exports = router;

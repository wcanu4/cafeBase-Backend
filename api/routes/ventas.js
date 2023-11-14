const express = require('express');
const router = express.Router();
const Ventas = require('../../models/Ventas'); 

router.post('/insertarVenta', async (req, res) => {
  const { nit, nombre, code, product, sale_price, vender, total } = req.body;
  
  try {
    const nuevaVenta = await Ventas.create({
      nit,
      nombre,
      code,
      product,
      sale_price,
      vender,
      total,
      fecha: new Date(), 
    });
    
    res.status(201).json({ message: 'Venta registrada exitosamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un error en el servidor al registrar la venta.' });
  }
});

router.get('/', async (req, res) => {
  try {
    
    const ventas = await Ventas.findAll();

    if (ventas.length === 0) {
      return res.status(404).json({ message: 'No se encontraron ventas' });
    }

    res.status(200).json({ message: 'Datos de ventas obtenidos con éxito', ventas });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un error al obtener los datos de ventas' });
  }
});


router.put('/editarVenta/:id', async (req, res) => {
  const ventaId = req.params.id;
  const { nit, nombre, code, product, sale_price, vender, total } = req.body;

  try {
    
    const venta = await Ventas.findByPk(ventaId);

    if (!venta) {
      return res.status(404).json({ message: 'Venta no encontrada' });
    }

    
    venta.nit = nit;
    venta.nombre = nombre;
    venta.code = code;
    venta.product = product;
    venta.sale_price = sale_price;
    venta.vender = vender;
    venta.total = total;

    // Guarda los cambios en la base de datos
    await venta.save();

    res.status(200).json({ message: 'Venta actualizada exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un error en el servidor al actualizar la venta' });
  }
});

// Ruta para eliminar una venta por su ID
router.delete('/eliminarVenta/:id', async (req, res) => {
  const ventaId = req.params.id;

  try {
    // Busca la venta por su ID
    const venta = await Ventas.findByPk(ventaId);

    if (!venta) {
      return res.status(404).json({ message: 'Venta no encontrada' });
    }

    // Elimina la venta de la base de datos
    await venta.destroy();

    res.status(200).json({ message: 'Venta eliminada exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un error en el servidor al eliminar la venta' });
  }
});

// Exporta el router como en tu código actual


module.exports = router;

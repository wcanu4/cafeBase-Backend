const express = require('express');
const router = express.Router();
const Product = require('../../models/Product'); 


router.get('/', async (req, res) => {
  try {
    const product = await Product.findAll();
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un error en el servidor.' });
  }
});


router.get('/product/:id', async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findOne({ where: { id: productId } });

    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: 'Producto no encontrado.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un error en el servidor.' });
  }
});



router.post('/productInsertar', async (req, res) => {
  const { code, product, presentation, cost_price, sale_price, existence} = req.body;

  try {
    
    await Product.create({
      code,
      product,
      presentation,
      cost_price,
      sale_price,
      existence,
      
    });

    res.status(201).json({ message: 'Producto insertado exitosamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un error en el servidor.' });
  }
});



router.delete('/productEliminar/:id', async (req, res) => {
  const productId = req.params.id;

  try {
    const result = await Product.destroy({ where: { id: productId } });

    if (result === 1) {
      res.status(200).json({ message: 'Producto eliminado exitosamente.' });
    } else {
      res.status(404).json({ message: 'Producto no encontrado.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un error en el servidor.' });
  }
});



router.put('/editarProduct/:id', async (req, res) => {
  const productId = req.params.id;
  const { code, product, presentation, cost_price, sale_price, existence } = req.body;

  try {
    const result = await Product.update(
      {
        code,
        product,
        presentation,
        cost_price,
        existence,
      },
      { where: { id: productId } }
    );

    if (result[0] === 1) {
      res.status(200).json({ message: 'Barraco actualizado exitosamente.' });
    } else {
      res.status(404).json({ message: 'Barraco no encontrado.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un error en el servidor.' });
  }
});


router.post('/insertarVenta', async (req, res) => {
  const { codigoCamada, cantidadVendida, precioUnitario, total, idCliente, idCamada } = req.body;

  try {
    
    await Venta.create({
      codigo_camada: codigoCamada,
      cantidad_vendida: cantidadVendida,
      precio_unitario: precioUnitario,
      total: total,
      IDCliente: idCliente,
      IDCamada: idCamada,
      fecha: new Date() 
    });

    res.status(201).json({ message: 'Venta insertada exitosamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un error en el servidor.' });
  }
});


router.post('/actualizarCantidad/:id', async (req, res) => {
  const productId = req.params.id;
  const { cantidadVendida } = req.body;

  try {
    const product = await Product.findOne({ where: { id: productId } });

    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado.' });
    }

    
    const updatedExistence = parseInt(product.existence) - cantidadVendida;
    if (updatedExistence < 0) {
      return res.status(400).json({ message: 'No hay suficiente existencia para actualizar.' });
    }

    
    await Product.update(
      { existence: updatedExistence },
      { where: { id: productId } }
    );

    res.status(200).json({ message: 'Cantidad actualizada exitosamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un error en el servidor.' });
  }
});



module.exports = router;

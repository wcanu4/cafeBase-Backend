const express = require('express');
const router = express.Router();
const Cafe = require('../../models/Cafe'); 




router.get('/', async (req, res) => {
  try {
    const cafe = await Cafe.findAll();
    res.json(cafe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un error en el servidor.' });
  }
});



router.get('/cafe/:id', async (req, res) => {
  const cafeId = req.params.id;

  try {
    const cafe = await Cafe.findOne({ where: { id: cafeId } });
    if (cafe) {
      res.status(200).json(cafe);
    } else {
      res.status(404).json({ message: 'Cafe no encontrado.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un error en el servidor.' });
  }
});



router.post('/cafeInsertar', async (req, res) => {
  const { 
    libra, 
    precio, 
    cosecha
  } = req.body;

  try {
    
    await Cafe.create({
      libra,
      precio,
      cosecha,      
    });

    res.status(201).json({ message: 'Producto insertado exitosamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un error en el servidor.' });
  }
});



router.delete('/cafeEliminar/:id', async (req, res) => {
  const cafeId = req.params.id;

  try {
    const result = await Cafe.destroy({ where: { id: cafeId } });

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



router.put('/editarCafe/:id', async (req, res) => {
  const cafeId = req.params.id;
  const { libra, precio, cosecha } = req.body;

  try {
    const result = await Cafe.update(
      {
        libra,
        precio,
        cosecha, 
      },
      { where: { id: cafeId } }
    );

    if (result[0] === 1) {
      res.status(200).json({ message: 'Cafe actualizado exitosamente.' });
    } else {
      res.status(404).json({ message: ' no encontrado.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un error en el servidor.' });
  }
});


module.exports = router;

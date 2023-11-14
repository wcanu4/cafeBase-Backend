const express = require('express');
const router = express.Router();

// Importa el modelo Sequelize
const Store = require('../../models/Store');

/**-------------------------------------Obtener todos los productos------------------------------------- */
router.get('/', async (req, res) => {
  try {
    const stores = await Store.findAll();
    res.json(stores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un error en el servidor.' });
  }
});

/**-------------------------------------Insertar producto------------------------------------- */
router.post('/storeInsertar', async (req, res) => {
  const { departure, coat, amount, available, used, harvest, date } = req.body;
  try {
    const newStore = await Store.create({
      departure,
      coat,
      amount,
      available,
      used,
      harvest,
      date,
    });
    res.status(201).json({ message: 'Producto insertado exitosamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un error en el servidor.' });
  }
});

/**-------------------------------------Eliminar producto------------------------------------- */
router.delete('/storeEliminacion/:id', async (req, res) => {
  const storeId = req.params.id;
  try {
    const deletedStore = await Store.destroy({
      where: { id: storeId },
    });
    if (deletedStore === 1) {
      res.status(200).json({ message: 'Producto eliminado exitosamente.' });
    } else {
      res.status(404).json({ message: 'Producto no encontrado.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un error en el servidor.' });
  }
});

/**-------------------------------------Editar producto------------------------------------- */
router.put('/storeEditar/:id', async (req, res) => {
  const storeId = req.params.id;
  const { departure, coat, amount, available, used, harvest, date } = req.body;
  try {
    const updatedStore = await Store.update(
      {
        departure,
        coat,
        amount,
        available,
        used,
        harvest,
        date,
      },
      {
        where: { id: storeId },
      }
    );
    if (updatedStore[0] === 1) {
      res.status(200).json({ message: 'Producto actualizado exitosamente.' });
    } else {
      res.status(404).json({ message: 'Producto no encontrado.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un error en el servidor.' });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Cliente = require('../../models/Cliente'); 




router.get('/', async (req, res) => {
  try {
    const cliente = await Cliente.findAll();
    res.json(cliente);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un error en el servidor.' });
  }
});


router.get('/cliente/:id', async (req, res) => {
    const clienteId = req.params.id;
  
    try {
      const cliente = await Cliente.findByPk(clienteId); 
      if (!cliente) {
        res.status(404).json({ message: 'Cliente no encontrado.' });
      } else {
        res.json(cliente);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Hubo un error en el servidor.' });
    }
  });


  
router.post('/clienteInsertar', async (req, res) => {
  const {
    nit,
    nombre,
    telefono,
    correo,
    direccion
  } = req.body;

  try {
  
    await Cliente.create({
      nit,
      nombre,
      telefono,
      correo,
      direccion
    });

    res.status(201).json({ message: 'Cliente insertado exitosamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un error en el servidor.' });
  }
});


router.put('/clienteEditar/:id', async (req, res) => {
  const clienteId = req.params.id;

  try {
    const [rowsUpdated] = await Cliente.update(req.body, {
      where: { id: clienteId },
    });

    if (rowsUpdated === 1) {
      res.status(200).json({ message: 'Cliente actualizado exitosamente.' });
    } else {
      res.status(404).json({ message: 'Cliente no encontrado.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un error en el servidor.' });
  }
});


router.delete('/clienteEliminar/:id', async (req, res) => {
  const clienteId = req.params.id;

  try {
    
    const rowsDeleted = await Cliente.destroy({ where: { id: clienteId } });

    if (rowsDeleted === 1) {
      res.status(200).json({ message: 'Cliente eliminado exitosamente.' });
    } else {
      res.status(404).json({ message: 'Cliente no encontrado.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un error en el servidor.' });
  }
});

module.exports = router;

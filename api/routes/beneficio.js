const express = require('express');
const router = express.Router();


const Beneficio = require('../../models/Beneficio');

/**-------------------------------------Obtener todos los productos------------------------------------- */
router.get('/', async (req, res) => {
  try {
    const beneficios = await Beneficio.findAll();
    res.json(beneficios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un error en el servidor.' });
  }
});

/**-------------------------------------Insertar producto------------------------------------- */
router.post('/beneficioInsertar', async (req, res) => {
  const { 
    partida,
    quintales,
    despulpado,
    fermentacion,
    lavado,
    secado,
    pergamino,
    fecha_final,
    d1,
    d2,
    f1,
    f2,
    l1,
    l2,
    s1,
    s2,

     } = req.body;
  try {
    const newBeneficio = await Beneficio.create({
      partida,
      quintales,
      despulpado,
      fermentacion,
      lavado,
      secado,
      pergamino,
      fecha_final,
      d1,
      d2,
      f1,
      f2,
      l1,
      l2,
      s1,
      s2,
    });
    res.status(201).json({ message: 'Productos insertado exitosamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un error en el servidor.' });
  }
});

/**-------------------------------------Eliminar producto------------------------------------- */
router.delete('/beneficioEliminar/:id', async (req, res) => {
  const beneficioId = req.params.id;
  try {
    const deletedBeneficio = await Beneficio.destroy({
      where: { id: beneficioId },
    });
    if (deletedBeneficio === 1) {
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
router.put('/beneficioEditar/:id', async (req, res) => {
  const beneficioId = req.params.id;
  const { 
    partida,
    quintales,
    despulpado,
    fermentacion,
    lavado,
    secado,
    pergamino,
    fecha_final,
    d1,
    d2,
    f1,
    f2,
    l1,
    l2,
    s1,
    s2,
  } = req.body;
  try {
    const updatedBeneficio = await Beneficio.update(
      {
        partida,
        quintales,
        despulpado,
        fermentacion,
        lavado,
        secado,
        pergamino,
        fecha_final,
        d1,
        d2,
        f1,
        f2,
        l1,
        l2,
        s1,
        s2,
      },
      {
        where: { id: beneficioId },
      }
    );
    if (updatedBeneficio[0] === 1) {
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

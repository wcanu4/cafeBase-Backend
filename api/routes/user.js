const express = require('express');
const router = express.Router();

// Importa el modelo Sequelize
const User = require('../../models/User');
const Permiso = require('../../models/Permiso');
const jwt = require('jsonwebtoken');

/**-------------------------------------Obtener todos los usuarios------------------------------------- */
router.get('/', async (req, res) => {
  try {
    const user = await User.findAll();
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un error en el servidor.' });
  }
});

/**-------------------------------------Ingresar al sistema------------------------------------- */
router.post('/singin', async (req, res) => {
  const { user, pass } = req.body;
  try {
    const foundUser = await User.findOne({
      where: { user, pass },
      attributes: ['id', 'user', 'rol'], // Incluye 'id' para obtener el ID del usuario
    });

    if (foundUser) {
      // Encuentra los permisos del usuario en la tabla 'permiso' utilizando su ID
      const userPermissions = await Permiso.findOne({
        where: { user_id: foundUser.id },
        attributes: ['compras', 'ventas', 'inventario', 'procesos', 'reportes', 'usuarios','bodega'],
      });

      if (!userPermissions) {
        console.log('Permisos no encontrados para este usuario');
        res.json('Permisos no encontrados para este usuario');
        return;
      }

      const data = {
        user: foundUser.user,
        rol: foundUser.rol,
        permisos: userPermissions.dataValues, // Incluye los permisos del usuario
      };

      // Asegúrate de utilizar tu propia clave secreta en lugar de 'walter'
      const token = jwt.sign(data, 'walter', { expiresIn: '1h' });
      console.log('Token generado:', token);
      res.json({ token });
    } else {
      console.log('Usuario o clave incorrectos');
      res.json('Usuario o clave incorrectos');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un error en el servidor.' });
  }
});

router.post('/test', verifyToken, (req, res) => {
  console.log('Token válido:', req.data);
  res.json('Informacion secreta');
});

function verifyToken(req, res, next) {
  if (!req.headers.authorization) return res.status(401).json('No autorizado');
  const token = req.headers.authorization.substr(7);
  if (token !== '') {
    try {
      const content = jwt.verify(token, 'walter');
      req.data = content;
      next();
    } catch (error) {
      console.error('Token inválido o expirado:', error);
      res.status(401).json('Token inválido o expirado');
    }
  } else {
    res.status(401).json('Token vacío');
  }
}
/**-------------------------------------Insertar usuario------------------------------------- */
router.post('/userInsertar', async (req, res) => {
  const { name, document, phone, mail, addres, creation, user, rol, pass, state, permisos } = req.body; // Añade "permisos" para obtener los valores de los nuevos select

  try {
    // Crea un nuevo usuario en la tabla "user"
    const newUser = await User.create({
      name,
      document,
      phone,
      mail,
      addres,
      creation,
      user,
      rol,
      pass,
      state,
    });

    // Crea un nuevo registro en la tabla "permiso" y asocia el usuario
    const newPermiso = await Permiso.create({
      // Añade aquí los campos necesarios para "permiso"
      rol:rol,
      compras: permisos.compras,
      ventas: permisos.ventas,
      inventario: permisos.inventario,
      procesos: permisos.procesos,
      reportes: permisos.reportes,
      usuarios: permisos.usuarios,
      bodega: permisos.bodega,
      user_id: newUser.id, // Asocia el permiso con el usuario recién creado
    });

    res.status(201).json({ message: 'Usuario insertado exitosamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un error en el servidor.' });
  }
});
/**-------------------------------------Eliminar usuario------------------------------------- */
router.delete('/userEliminacion/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    // Eliminar primero los registros relacionados en la tabla 'permiso'
    await Permiso.destroy({
      where: { user_id: userId },
    });

    // Luego, eliminar el usuario
    const deletedUser = await User.destroy({
      where: { id: userId },
    });

    if (deletedUser === 1) {
      res.status(200).json({ message: 'Usuario eliminado exitosamente.' });
    } else {
      res.status(404).json({ message: 'Usuario no encontrado.' });
    }
  } catch (error) {
    console.error('Error al eliminar el usuario:', error);
    res.status(500).json({ error: 'Hubo un error en el servidor.' });
  }
});


/**-------------------------------------Editar usuario------------------------------------- */





router.put('/userEditar/:id', async (req, res) => {
  const userId = req.params.id;
  const {
    name,
    document,
    phone,
    mail,
    addres,
    creation,
    user,
    rol,
    pass,
    state,
    compras,
    ventas,
    inventario,
    procesos,
    reportes,
    usuarios,
    bodega,
  } = req.body;

  try {
    const existingUser = await User.findByPk(userId);

    if (!existingUser) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    // Actualizar campos comunes (nombres, apellidos, usuario, rol, correo, telefono, etc.)
    existingUser.name=name;
    existingUser.document=document;
    existingUser.phone=phone;
    existingUser. mail=mail;
    existingUser. addres=addres;
    existingUser.creation=creation;
    existingUser.user=user;
    existingUser.rol=rol;
    existingUser. pass=pass;
    existingUser.state=state;


    // Guardar los cambios en el usuario
    await existingUser.save();
   

    // Actualizar los campos de permiso si son proporcionados
    if (compras || ventas || inventario || procesos || reportes || usuarios||bodega) {
      const existingPermiso = await Permiso.findOne({ where: { user_id: userId } });

      if (existingPermiso) {
        // Actualizar los campos de permiso si existe un registro de permiso para el usuario
        existingPermiso.compras = compras;
        existingPermiso.ventas = ventas;
        existingPermiso.inventario = inventario;
        existingPermiso.procesos = procesos;
        existingPermiso.reportes = reportes;
        existingPermiso.usuarios = usuarios;
        existingPermiso.bodega = bodega;
        await existingPermiso.save();
      } else {
        // Crear un nuevo registro de permiso si no existe uno
        await Permiso.create({
          user_id: userId,
          compras,
          ventas,
          inventario,
          procesos,
          reportes,
          usuarios,
          bodega,
        });
      }
    }

    res.status(200).json({ message: 'Usuario actualizado exitosamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un error en el servidor.' });
  }
});




router.get('/usuarios/:userId/permisos', async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }

    // Busca los permisos para este usuario en la tabla 'permisos'
    const permisos = await Permiso.findOne({ where: { user_id: userId } });

    if (!permisos) {
      return res.status(404).json({ error: 'Permisos no encontrados para este usuario.' });
    }

    // Combina los datos del usuario y los permisos en una respuesta
    const usuarioConPermisos = {
      id: user.id,
     
      compras: permisos.compras,
      ventas: permisos.ventas,
      inventario: permisos.inventario,
      procesos: permisos.procesos,
      reportes: permisos.reportes,
      usuarios: permisos.usuarios,
      bodega: permisos.bodega,
    };

    res.json(usuarioConPermisos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un error en el servidor.' });
  }
});


router.get('/usuarios/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }

    // Busca los permisos para este usuario en la tabla 'permisos'
    const permisos = await Permiso.findOne({ where: { user_id: userId } });

    if (!permisos) {
      return res.status(404).json({ error: 'Permisos no encontrados para este usuario.' });
    }

    // Combina los datos del usuario y los permisos en una respuesta
    const usuarioConPermisos = {
      id: user.id,
      // Agrega otros campos del usuario aquí...
      compras: permisos.compras , // Convierte el valor de texto en booleano
      ventas: permisos.ventas,
      inventario: permisos.inventario,
      process: permisos.procesos,
      reportes: permisos.reportes,
      usuarios: permisos.usuarios,
      bodega: permisos.bodega,
    };

    res.json(usuarioConPermisos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un error en el servidor.' });
  }
});



module.exports = router;

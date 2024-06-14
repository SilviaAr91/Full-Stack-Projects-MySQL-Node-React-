const bcrypt = require("bcrypt");
require("dotenv").config();
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const connection = require("../config/db");
const { generateToken } = require("../middlewares/jwt");
const { sendMail, sendVerificationEmail } = require("../services/emailService");
const EmailService = require("../services/emailService");

class UserController {
  editUser = (req, res) => {
    const {
      user_id,
      company_name,
      company_phone,
      email,
      address,
      name,
      lastname,
      contact_phone,
    } = req.body;

    let sql = `UPDATE user SET company_name="${company_name}", company_phone="${company_phone}", email="${email}", address="${address}", name="${name}", lastname="${lastname}", contact_phone="${contact_phone}" WHERE user_id=${user_id}`;

    connection.query(sql, (err, result) => {
      if (err) {
        console.log("Error al ejecutar la consulta:", err);
        res.status(500).json("algo ha ido mal");
      } else {
        console.log("Actualización exitosa:", result);
        res.status(200).json({ result });
      }
    });
  };

  register = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    const {
      name,
      lastname,
      email,
      password,
      cif,
      address,
      contact_phone,
      company_name,
      company_phone,
    } = req.body;

    const sql = `SELECT * FROM user WHERE email = ?`;
    connection.query(sql, [email], (err, result) => {
      if (err) {
        console.error("Error al verificar el correo electrónico:", err);
        return res.status(500).json({
          error: "Error de base de datos al verificar el correo electrónico.",
        });
      }
      if (result.length > 0) {
        return res
          .status(400)
          .json({ error: "El correo electrónico ya está registrado." });
      }

      bcrypt.genSalt(8, (err, salt) => {
        if (err) {
          return res
            .status(500)
            .json({ error: "Error generando salt para la contraseña." });
        }
        bcrypt.hash(password, salt, (error, hash) => {
          if (error) {
            return res
              .status(500)
              .json({ error: "Error hasheando la contraseña." });
          } else {
            const sqlInsert = `INSERT INTO user (name, lastname, email, password, cif, address, contact_phone, company_name, company_phone)
                               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            const values = [
              name,
              lastname,
              email,
              hash,
              cif,
              address,
              contact_phone,
              company_name,
              company_phone,
            ];
            connection.query(sqlInsert, values, (err, result) => {
              if (err) {
                console.error("Error al insertar el usuario:", err);
                return res
                  .status(500)
                  .json({ error: "Error al registrar el usuario" });
              } else {
                // Genera un token de verificación
                const token = jwt.sign({ email }, process.env.TOKEN_SECRET, {
                  expiresIn: "1h",
                });
                const verificationUrl = `${process.env.CLIENT_URL}/users/verify/${token}`;

                // Envía el correo de verificación
                sendVerificationEmail(email, verificationUrl);

                return res.status(200).json({
                  message:
                    "Registro exitoso. Por favor, verifica tu correo electrónico.",
                });
              }
            });
          }
        });
      });
    });
  };

  checkEmail = (req, res) => {
    const email = req.params.email;

    const sql = `SELECT * FROM user WHERE email = ?`;
    connection.query(sql, [email], (err, result) => {
      if (err) {
        console.error("Error al verificar el correo electrónico:", err);
        return res.status(500).json({
          error: "Error de base de datos al verificar el correo electrónico.",
        });
      }
      if (result.length > 0) {
        return res.json({ exists: true });
      } else {
        return res.json({ exists: false });
      }
    });
  };

  verifyToken = (req, res) => {
    const { token } = req.params;
    console.log(token);

    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(400).json({ message: "Token inválido o expirado" });
      } else {
        const email = decoded.email;
        const sqlSelect = "SELECT user_id FROM user WHERE email = ?";

        connection.query(sqlSelect, [email], (err2, result) => {
          if (err2 || !result.length) {
            console.error("Error al obtener el ID de usuario:", err2);
            res.status(500).json({ message: "Error al verificar el usuario" });
          } else {
            const token = jwt.sign(
              {
                id: result[0].user_id,
              },
              process.env.TOKEN_SECRET,
              { expiresIn: "1d" }
            );
            console.log("tokeeeeeeeeeeeeeeeeeeeeeen", token);
            console.log(result[0].user_id);
            console.log(token ? true : false);
            if (token) {
              let sqlVerify =
                "UPDATE user SET user_is_verified = 1, user_is_disabled = 0 WHERE user_id = ?";
              connection.query(
                sqlVerify,
                [result[0].user_id],

                (err3, resultUpdate) => {
                  if (err3) {
                    console.error("No se ha podido verificar");
                    res
                      .status(500)
                      .json({ message: "Error al verificar usuario" });
                  } else {
                    res.status(200).json({
                      message: "La verificación ha sido exitosa",
                      token: token,
                    });
                  }
                }
              );
            }
          }
        });
      }
    });
  };

  loginUser = (req, res, email) => {
    // Utilizar las credenciales del usuario recién verificado para generar un token de autenticación
    const token = jwt.sign({ email }, process.env.TOKEN_SECRET, {
      expiresIn: "1d",
    });

    // Devolver el token de autenticación al cliente
    res.status(200).json({ token });
  };

  login = (req, res) => {
    console.log("reqq y body", req.body);
    const { email, pass } = req.body;
    let sql = `SELECT * FROM user WHERE email = ? AND user_is_deleted = 0`;
    connection.query(sql, [email], (err, result) => {
      console.log(result);
      if (err) {
        res.status(500).json("credenciales algo mal con la db");
      }
      if (!result || !result.length || result[0].user_is_deleted === 1) {
        res.status(401).json("Credenciales incorrectas 111");
      } else {
        //console.log("etoyyy aca", result);
        const [user] = result;
        let hash = result[0].password;
        bcrypt.compare(pass, hash, (error, response) => {
          //console.log("etoyyy aca", response);
          if (response) {
            const token = jwt.sign(
              {
                id: user.user_id,
              },
              process.env.TOKEN_SECRET,
              { expiresIn: "1d" }
            );
            //console.log(token);
            res.status(200).json({ token });
          } else {
            res.status(401).json("Credenciales incorrectas");
          }
        });
      }
    });
  };

  oneUser = (req, res) => {
    const { id } = req.params;
    let sql = `SELECT * FROM user WHERE user_id = '${id}' AND user_is_deleted = 0;`;
    connection.query(sql, (err, result) => {
      if (err) {
        return res.status(500).json("hay algun error");
      } else {
        return res.status(200).json(result[0]);
      }
    });
  };

  updateUsers = (req, res) => {
    const { id, checked } = req.body;
    console.log(id, checked);
    let sql = `UPDATE user SET user_is_disabled = ? WHERE user_id = ?`;
    connection.query(sql, [!checked, id], (err, result) => {
      if (err) {
        res.status(500).json("Ha fallado algo");
      } else {
        res.status(200).json("Todo ha ido bien");
      }
    });
  };

  allCatering = (req, res) => {
    console.log("estamos aqui");
    const sql = `SELECT * FROM user WHERE type = 2 AND user_is_deleted = 0;`;
    connection.query(sql, (err, result) => {
      if (err) {
        return res.status(500).json("hay error en el allCatering");
      } else {
        res.status(200).json({ result });
      }
    });
  };

  logicalDelete = (req, res) => {
    const { id } = req.params;
    let sql = `UPDATE user SET user_is_deleted = 1 WHERE user_id = ?`;

    connection.query(sql, [id], (err, result) => {
      if (err) {
        res.status(500).json("Error al borrar el usuario en la base de datos.");
      } else {
        res.status(200).json("Borrado lógico OK");
      }
    });
  };

  forgotPass = (req, res) => {
    const { email } = req.body;
    let sql = `SELECT * FROM user WHERE email = '${email}' AND user_is_deleted = 0 AND user_is_disabled = 0 and user_is_verified = 1;`;
    connection.query(sql, (err, result) => {
      if (!result.length) {
        res.status(401).json("Usuario no encontrado en la Base de datos");
      } else {
        const [user] = result; //destructuring de un array
        const token = jwt.sign(
          {
            email: user.email,
            name: user.name,
            id: user.user_id,
          },
          process.env.TOKEN_SECRET,
          { expiresIn: "1h" }
        );
        const url = `${process.env.CLIENT_URL}/recovery/${token}`;
        sendMail(user.email, url, user.name);
        res.status(200).json("mail OK");
      }
    });
  };

  passRecovery = (req, res) => {
    const { token, password } = req.body;
    // Verificar el token
    let data = jwt.decode(token);
    console.log(data);
    const user_id = data.id;

    // Encriptar la nueva contraseña
    bcrypt.hash(password, 8, (err, hashedPassword) => {
      if (err) {
        return res.status(500).json("Error al encriptar la contraseña");
      } else {
        let sql = `UPDATE user SET password = ? WHERE user_id = ? AND user_is_disabled = 0 AND user_is_verified = 1 AND user_is_deleted = 0`;

        connection.query(sql, [hashedPassword, user_id], (error, result) => {
          if (error) {
            console.log("error usuario no encontrado BD");
          } else {
            res.status(200).json("Contraseña actualizada correctamente");
          }
        });
      }
    });
  };
}

module.exports = new UserController();

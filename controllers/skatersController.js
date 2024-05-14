import {
    addSkaterQuery,
    getSkaterQuery,
    getLoginQuery,
    setSkaterQuery,
    updateSkaterQuery,
    deleteSkaterQuery
} from "../queries/crudSkate.js";
import path from 'path';
const __dirname = path.resolve();
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";
const secretKey = process.env.KEY_SECRET;

export const addSkaterControl = async (req, res) => {
    const { email, nombre, password, anos_experiencia, especialidad } = req.body;
    const skater = { email, nombre, password, anos_experiencia, especialidad };
    const { files } = req;
    const { foto } = files;
    const { name } = foto;
    const pathPhoto = `/img/${name}`;

    foto.mv(`${__dirname}/assets${pathPhoto}`, async (error) => {
        try {
        if (error) throw error;

        skater.foto = pathPhoto;
        await addSkaterQuery(skater);

        res.status(201).redirect("/login");
        } catch (error) {
        console.error("Error al agregar skater:", error);
      
        }
    });
};

export const getSkaterControl = async (req, res) => {
    try {
        const skaters = await getSkaterQuery();
        console.log(skaters);
        res.render("Home", { skaters });
    } catch (error) {
        res.status(500).send({
            error: `Algo salió mal... ${e}`,
            code: 500,
        });
    }
};

export const getLoginControl = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body)
    try {
        const skater = await getLoginQuery(email, password);
        console.log(skater);
        const token = jwt.sign(skater, secretKey);
        res.status(200).send(token);
    } catch (e) {
        console.log(e);
        res.status(500).send({
        error: `Algo salió mal... ${e}`,
        code: 500,
        });
    }
};
export const updateSkaterStatus = async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;
    try {
        await setSkaterQuery(id, estado);
        res.status(200).send("Estatus de skater cambiado con éxito");
    } catch (e) {
        res.status(500).send({
        error: `Algo salió mal... ${e}`,
        code: 500,
        });
    }
};
export const updateStaker = async (req, res) => {
    const skater = req.body;
    const { id } = req.params;
    try {
        await updateSkaterQuery(skater);
        res.status(200).send("Datos actualizados con éxito");
    } catch (e) {
        res.status(500).send({
        error: `Algo salió mal... ${e}`,
        code: 500,
        });
    }
};
export const deleteSkater = async (req, res) => {
    const { id } = req.params;
    try {
    const skaters = await deleteSkaterQuery(id);
    if (skaters) {
        res.status(200).send(skaters); 
        } else {
        res.status(404).send("Usuario no encontrado"); 
        }
    } catch (e) {
        res.status(500).send({
        error: `Algo salió mal... ${e.message}`,
        code: 500,
        });
    }
};
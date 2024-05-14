import pool from '../config/db.js';

//Prueba conexión
export const getDate = async () => {
    const response = await pool.query("SELECT NOW()");
    console.log(response.rows);
};
//Registrar usuarios
export const addSkaterQuery = async (skater) => {
    try {
        const values = Object.values(skater);
        const sql = {
            text: `INSERT INTO skaters (email, nombre, password, anos_experiencia, especialidad, foto, estado) VALUES ($1,$2,$3,$4,$5,$6,'f') RETURNING * `,
            values: values,
        };
        const result = await pool.query(sql);
        console.log(result.rows[0]);
        return result.rows[0];
    } catch (error) {
        console.error("Error al añadir skater:", error);
        throw error; 
    }
};

// Mostrar  los usuarios Skater

export const getSkaterQuery = async () => {
    try {
        const sql = {
            text: `SELECT * FROM skaters`
        }
        const result = await pool.query(sql);
        console.log(result.rows);
        return result.rows
    } catch (error) {
        console.log(error.message)
    }
};

//Guarda datos de registro
export const getLoginQuery = async (email, password) => {
    try {
        const sql = {
            text: `SELECT * FROM skaters WHERE email = $1 AND password = $2`,
            values: [email, password],
        };
        const results = await pool.query(sql)
        return results.rows[0]
    } catch (error) {
        console.log(error.message)
    }
};

export const setSkaterQuery = async (id, estado) => {
    try {
        const sql = {
            text: `UPDATE skaters SET estado = ${estado} WHERE id = ${id} RETURNING *`
        }
        const result = await pool.query(sql)
        return result.rows[0]
    } catch (error) {
        console.log(error.message)
    }
};

export const updateSkaterQuery = async (skater) => {
    try {
        const values = Object.values(skater);
        const sql = {
            text: `UPDATE skaters SET  nombre = $1, password = $2 , anos_experiencia = $3 , especialidad = $4   RETURNING *`,
            values: values
        }
        const result = await pool.query(sql)
        console.log(result.rows[0])
        return result.rows[0]
    } catch (error) {
        
    }
}; 
export const deleteSkaterQuery = async (id) => {
    try {
        const sql = {
        text: "DELETE FROM skaters WHERE id = $1 RETURNING *",
        values: [id],
        };
        const result = await pool.query(sql);
    
        return result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
        console.error(error.message);
        throw error;
    }
};
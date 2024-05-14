import jwt from "jsonwebtoken";

export const perfilControl = async (req, res) => {
    res.render("Perfil");
};

export const perfil = (req, res) => {
    const { token } = req.query;
    jwt.verify(token, secretKey, (err, skater) => {
        if (err) {
        res.status(500).send({
            error: `Algo salió mal...`,
            message: err.message,
            code: 500,
        });
        } else {
        res.render("Perfil", { skater });
        }
    });
};
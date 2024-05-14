import { getSkaterQuery } from "../queries/crudSkate.js";

export const admin = async (req, res) => {
    try {
        const skaters = await getSkaterQuery();
        res.render("Admin", { skaters });
    } catch (e) {
        res.status(500).send({
        error: `Algo salió mal... ${e}`,
        code: 500,
        });
    }
};
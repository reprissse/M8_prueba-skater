import express from 'express';
import router from './routes/router.js';
import { engine } from 'express-handlebars';
import path from 'path';
import { config } from 'dotenv';
config();


const app = express();
const PORT = process.env.PORT || 3018;
const __dirname = path.resolve();


//configuraciones handlebars
app.set('view engine', 'handlebars');
app.engine(
    "handlebars",
    engine ({
        defaultLayout: "main",
        layoutDir: path.join(__dirname, "views/layouts"),
    })
)

//middlewares
app.use(express.json())
app.use(express.static(path.join(__dirname,'/views')));
app.use(express.static(path.join(__dirname, '/public')));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'))

app.use('/', router);

app.listen(PORT, () => console.log(`Servidor levantado en el puerto http://localhost:${PORT}`));

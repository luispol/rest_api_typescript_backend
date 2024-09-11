import  express  from 'express';
import colors from 'colors';
import cors, {CorsOptions} from 'cors';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec, {swaggerUiOptions} from './config/swagger';
import router from './router';
import db from './config/db';


// Nos conectamos en nuestra base de datos
export async function connectDB(){
    try {
        await db.authenticate()
        db.sync()
        // console.log(colors.blue('Conexion exitosa a la BD'))
    } catch (error) {
        // console.log(error)
        console.log(colors.red.bold('Hubo un error al conectar a la BD'))
    }
}

connectDB() 


// En este server vamos a ir configurando toddas la configuraciones del proyecto
const server = express()

//Permitir conexiones
const corsOptions: CorsOptions = {
    // El origin es de donde nos envia la informacion, y el callback nos va a permitir la conexion o negar la conexion
    origin: function (origin, callback) {
            if (origin === process.env.FRONTED_URL ) {
                callback(null, true)
            }else{
                callback(new Error('Error de CORS'))

            }
    }
}
server.use(cors(corsOptions))


// Leer datos de formularios
server.use(express.json())

server.use(morgan('dev'))

server.use('/api/products', router)

// Docs

server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions))

export default server


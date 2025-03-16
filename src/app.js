import express from "express";
import router from './routes/userRoutes.js'
import productsRouter from './routes/productsRoutes.js'
import uploadRouter from './routes/uploadRoutes.js'

const app = express();
app.use(express.json());

app.use("/api/users", router);
app.use("/api/products", productsRouter);
app.use("/api/file", uploadRouter);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

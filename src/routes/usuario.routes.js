import express from 'express';

const router = express.Router();

router.get('/', (req, res)=>{
    res.send("Hola maquina del mal")
});


export default router
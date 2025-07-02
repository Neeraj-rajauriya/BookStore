import express from "express"
import auhtRoutes from "./user.Routes.js"

const router=express.Router();

router.use('/auth',auhtRoutes);

export default router;
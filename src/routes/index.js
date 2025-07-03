import express from "express"
import auhtRoutes from "./userRoutes.js"
import bookRoutes from "./bookRoutes.js"

const router=express.Router();

router.use('/auth',auhtRoutes);
router.use('/book',bookRoutes);

export default router;
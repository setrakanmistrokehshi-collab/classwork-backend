import express from "express";
import { createStudents,getAllStudents,loginUser, getUserById, updateUser, deleteUser} from "../controller/user.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router()
router.post('/register', createStudents)
router.post('/login', loginUser)
router.put('/update/:id', updateUser)
router.delete('/delete/:id', deleteUser)
router.get('/',protect, getAllStudents)
router.get('/:id', getUserById)
export default router

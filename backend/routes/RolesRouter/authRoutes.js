const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getAllUsers, getUserById, updateUser, deleteUser, logoutUser } = require('../../controller/RolesController/authController');
const { protect } = require('../../middleware/protect');

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/', protect, getAllUsers);
router.get('/:id', protect, getUserById);
router.put('/:id', protect, updateUser);
router.delete('/:id', protect, deleteUser);

// Logout route (clear cookie)
router.post('/logout', logoutUser);

module.exports = router;

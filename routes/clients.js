const express = require('express');         
const router = express.Router();            
const clientesController = require('../controllers/clientesController'); 
const auth = require('../middleware/auth'); 

router.post('/', auth, clientesController.createClient);

router.get('/', auth, clientesController.getAllClients);

router.get('/:id', auth, clientesController.getClientById);

router.put('/add-points/:id', auth, clientesController.addPoints);

router.put('/remove-points/:id', auth, clientesController.removePoints);

module.exports = router; 
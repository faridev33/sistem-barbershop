const express = require('express');
const router = express.Router();

// Import SEMUA fungsi dari controller
const { 
    getTodayQueue, 
    updateQueueStatus, 
    deleteQueue, 
    getRevenue, 
    getQueueStatus 
} = require('../controllers/queueController');

// Daftar Route
router.get('/today', getTodayQueue);
router.get('/revenue', getRevenue);
router.get('/status-live', getQueueStatus); // <--- DAFTARKAN INI UNTUK BOOKING PAGE
router.put('/:id', updateQueueStatus);
router.delete('/:id', deleteQueue);

module.exports = router;
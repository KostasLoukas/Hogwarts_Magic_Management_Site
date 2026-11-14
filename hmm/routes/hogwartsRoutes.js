import express from 'express';
import {
  getAllMagicItems,
  getMagicItemByPower,
  getMagicItemByPowerRange,
  getMagicItemByRarity,
  getMagicItemByType,
  getMagicItemByStatus,
  updateMagicItem,
  createMagicItem,
  deleteMagicItem
} from '../controllers/hogwartsController.js';

const router = express.Router();

//GET All + POST Create
router
.route('/')
.get(getAllMagicItems)
.post(createMagicItem);

//POST Delete
router.post('/DeleteMagicItem/:name', deleteMagicItem);

//GET by Power
router.get('/Power/:power', getMagicItemByPower);
//GET by Power Range
router.get('/PowerRange/:power1&:power2', getMagicItemByPowerRange);
//GET by Rarity
router.get('/Rarity/:rarity', getMagicItemByRarity);
//GET by Type
router.get('/Type/:type', getMagicItemByType);
//GET by Status
router.get('/Status/:status', getMagicItemByStatus);
//PATCH by Name
router.patch('/UpdateMagicItem/:name', updateMagicItem);


export default router;

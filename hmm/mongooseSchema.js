import mongoose from 'mongoose';



const magicItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A magic item's name is required!"],
    unique: [true, "Item name already exists!"]
  },
  type: { 
    type: String, 
    enum: ['Spell', 'Potion']
  },
  element: String,
  power: Number,
  rarity: { 
    type: String, 
    enum: ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary']
  },
  description: String,
  status: {
  type: String, 
    enum: ['Unbrewed', 'Brewed', 'Unlearned', 'Learned']
  }
});

const MagicItem = mongoose.model("MagicItem", magicItemSchema);

export default MagicItem;
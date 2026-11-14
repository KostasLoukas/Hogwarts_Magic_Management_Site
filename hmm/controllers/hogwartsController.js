import fs from 'node:fs';
import mongoose from 'mongoose';
import MagicItem from '../mongooseSchema.js';



//Load data once (top-level code executed once at startup - this will throw errors if the items exist in the database!)
let magicItems = [];
magicItems = JSON.parse(fs.readFileSync('./data/magicItems.json', 'utf8')); //Convert JSON to array
//Insert each item into the database
for (let i = 0; i < magicItems.length; i++)
{
  let item = new MagicItem(magicItems[i]);
  item.save()
  .then(()=>{
    console.log("Item saved to database once!");
  })
  .catch(err=>{
    console.log("Item already saved to database or something else occurred! ERROR: " + err);
  });
}



//GET /api/v1/magicItems
export const getAllMagicItems = async (req, res) => {

  try {
    const allMagicItems = await MagicItem.find();

    res.status(200).json({
      status: 'Success!',
      results: allMagicItems.length,
      data: { allMagicItems }
    });
  }
  catch (error) {
    res.status(404).json({
      status: 'Failed to retrieve all magic items. :(',
      message: 'Error: ' + error
    });
  }
};

//GET /api/v1/magicItems/Power/:power
export const getMagicItemByPower = async (req, res) => {

  if (req.params.power >= 1 && req.params.power <= 100)
  {
    try {
      const allMagicItems = await MagicItem.find({power:req.params.power});

      res.status(200).json({
        status: 'Success!',
        results: allMagicItems.length,
        data: { allMagicItems }
      });
    }
    catch (error) {
      res.status(404).json({
        status: 'Failed to retrieve all magic items by power value range. :(',
        message: 'Error: ' + error
      });
    }
  }
  else
  {
    res.status(404).json({
        status: 'Invalid \'Power\' parameter!',
        message: 'Power should be within the range [1-100].'
      });
  }
};

//GET /api/v1/magicItems/PowerRange/:power1&power2
export const getMagicItemByPowerRange = async (req, res) => {

  if ((req.params.power1 >= 1 && req.params.power1 <= 100) && (req.params.power2 >= 1 && req.params.power2 <= 100))
  {
    try {
      const allMagicItems = await MagicItem.find({power:{$gte:req.params.power1, $lte:req.params.power2}});

      res.status(200).json({
        status: 'Success!',
        results: allMagicItems.length,
        data: { allMagicItems }
      });
    }
    catch (error) {
      res.status(404).json({
        status: 'Failed to retrieve all magic items by power value. :(',
        message: 'Error: ' + error
      });
    }
  }
  else
  {
    res.status(404).json({
        status: 'Invalid \'Power\' parameter!'
      });
  }
};

//GET /api/v1/magicItems/Rarity/:rarity
export const getMagicItemByRarity = async (req, res) => {

  if (req.params.rarity == "Common" || req.params.rarity == "Uncommon" || req.params.rarity == "Rare" || req.params.rarity == "Epic" || req.params.rarity == "Legendary")
  {
    try {
      const allMagicItems = await MagicItem.find({rarity:req.params.rarity});

      res.status(200).json({
        status: 'Success!',
        results: allMagicItems.length,
        data: { allMagicItems }
      });
    }
    catch (error) {
      res.status(404).json({
        status: 'Failed to retrieve all magic items by rarity. :(',
        message: 'Error: ' + error
      });
    }
  }
  else
  {
    res.status(404).json({
        status: 'Invalid \'Rarity\' parameter!'
      });
  }
};

//GET /api/v1/magicItems/Type/:type
export const getMagicItemByType = async (req, res) => {

  if (req.params.type == "Spell" || req.params.type == "Potion")
  {
    try {
      const allMagicItems = await MagicItem.find({type:req.params.type});

      res.status(200).json({
        status: 'Success!',
        results: allMagicItems.length,
        data: { allMagicItems }
      });
    }
    catch (error) {
      res.status(404).json({
        status: 'Failed to retrieve all magic items by type. :(',
        message: 'Error: ' + error
      });
    }
  }
  else
  {
    res.status(404).json({
        status: 'Invalid \'Type\' parameter!'
      });
  }
};

//GET /api/v1/magicItems/Status/:status
export const getMagicItemByStatus = async (req, res) => {

  if (req.params.status == "Unlearned" || req.params.status == "Learned" || req.params.status == "Unbrewed" || req.params.status == "Brewed")
  {
    try {
      const allMagicItems = await MagicItem.find({status:req.params.status});

      res.status(200).json({
        status: 'Success!',
        results: allMagicItems.length,
        data: { allMagicItems }
      });
    }
    catch (error) {
      res.status(404).json({
        status: 'Failed to retrieve all magic items by status. :(',
        message: 'Error: ' + error
      });
    }
  }
  else
  {
    res.status(404).json({
        status: 'Invalid \'Status\' parameter!'
      });
  }
};

//PATCH /api/v1/magicItems/UpdateMagicItem/:name
export const updateMagicItem = async (req, res) => {
//Updated values can be " for all fields (except 'name') and case sensitivity is enabled (mainly for 'type' and 'status')

  try {
    //Check for magic item's existence!
    let magicItem = await MagicItem.findOne({name:req.params.name});

    if (!magicItem)
    {
      res.status(404).json({
        status: 'Request failed!',
        message: 'Could not find magic item to update!'
      });

      return;
    }
    else  //if item exists, then proceed...
    {
      //Blank 'name' updates are not allowed!
      if (req.body.name !== undefined && req.body.name.trim() == "")
      {
        res.status(404).json({
        status: 'Request failed!',
        message: 'Please provide a name for update that is not blank!'
        });

        return;
      }
      //For type-status validation later...
      let ogType = magicItem.type;

      //Check that attribute 'element' is defined
      if (req.body.element !== undefined)
      {
        magicItem.element = req.body.element;
      }

      //Check that attribute 'power' is defined
      if (req.body.power !== undefined)
      {
        //Check for valid data!
        if (req.body.power < 1 || req.body.power >100)
        {
          res.status(404).json({
          status: 'Request Failed!',
          message: 'Invalid Power data for update of magic item: ' + req.params.name
          });

          return;
        }
        else
        {
          magicItem.power = req.body.power;
        }
      }
      
      //Check that attribute 'rarity' is defined
      if (req.body.rarity !== undefined)
      {
        magicItem.rarity = req.body.rarity;
      }
      
      //Check that attribute 'description' is defined
      if (req.body.description !== undefined)
      {
        magicItem.description = req.body.description;
      }

      //To check if 'type' and 'status' are defined together (shall not pass otherwise!)
      let typeDefFlag = false;
      
      //Check that attribute 'type' is defined
      if (req.body.type !== undefined)
      {
        magicItem.type = req.body.type;
        typeDefFlag = true;
      }

      //'Status' and 'Type' should be updated together!
      if (req.body.status !== undefined && typeDefFlag == true)
      {
        //Only allow statuses 'Unlearned' or 'Learned' for Spells and 'Unbrewed' or 'Brewed' for Potions!
        if ((
            (magicItem.type == "Spell" && (req.body.status == "Unlearned" || req.body.status == "Learned")) ||
            (magicItem.type == "Potion" && (req.body.status == "Unbrewed" || req.body.status == "Brewed"))
            )
            || //in case the item had no magic type...
            ((magicItem.type == undefined && req.body.type == "Spell" && (req.body.status == "Unlearned" || req.body.status == "Learned")) ||
             (magicItem.type == undefined && req.body.type == "Potion" && (req.body.status == "Unbrewed" || req.body.status == "Brewed"))
            )
            || //in case the item had no magic status...
            ((magicItem.status == undefined && (req.body.status == "Unlearned" || req.body.status == "Learned") && req.body.type == "Spell") ||
             (magicItem.status == undefined && (req.body.status == "Unbrewed" || req.body.status == "Brewed") && req.body.type == "Potion")
            )
            ||
            (req.body.type.trim() == "" && req.body.status.trim() == "")  //if type and status are defined but are blank (allowed)
           )
        {  
          magicItem.status = req.body.status;
        }
        else
        {
          res.status(404).json({
            status: 'Request Failed!',
            message: 'Invalid match of given type-status! Item is ' + ogType + '! (bound to be ' + req.body.type + ')'
            });
            return;
        }
      }
      else if (req.body.status === undefined && typeDefFlag == false) //if type and status are not defined at all
      {
        console.log("Type and Status were not defined for update. Skipped.");
      }
      else
      {
        res.status(404).json({
          status: 'Request Failed!',
          message: 'Type and Status should be updated together!'
        });
        return;
      }

      //Lastly, check that attribute 'name' is defined for update
      if (req.body.name !== undefined)
      {
        magicItem.name = req.body.name;
      }
      
      //Finally, update the magic item onto the database!
      try {
        await MagicItem.findOneAndUpdate({name:req.params.name}, {name:magicItem.name, type:magicItem.type, element:magicItem.element, power:magicItem.power, rarity:magicItem.rarity, description:magicItem.description, status:magicItem.status}, {upsert:false});
        res.status(200).json({
        status: 'Success!',
        message: 'Magic Item \'' + req.params.name + '\' updated successfully!'
        });
      }
      catch {
        res.status(400).json({
        status: 'Failed.',
        message: 'Magic Item \'' + req.params.name + '\' could not be updated. :('
        });
      }

    }
  }
  catch (error) {
    res.status(404).json({
      status: 'Failed to update item. :(',
      message: 'Error: ' + error
    });
  }

};

//POST /api/v1/magicItems
export const createMagicItem = async (req, res) => {
  const newMagicItem = req.body;

  //Validation for field 'name'. Empty magic items (with only a name) are allowed! Field 'name' cannot be blank!
  if (!newMagicItem || !newMagicItem.name || (req.body.name.trim() == "")) {
    return res.status(404).json({
      status: 'Request Failed.',
      message: 'Please provide at least a \'name\' field for the new magic item that is not blank!'
    });
  }

  //Check for valid 'power' values if defined!
  if (req.body.power !== undefined && (req.body.power < 1 || req.body.power >100))
  {
    res.status(404).json({
    status: 'Request Failed!',
    message: 'Invalid Power data for creation of magic item: ' + newMagicItem.name
    });

    return;
  }

  //Check for valid 'type' and 'status' values if either of them is defined!
  //First, check if both 'type' and 'status' are defined
  if (req.body.type !== undefined && req.body.status !== undefined)
  {
    if (
        (
          (req.body.type == "Spell" && (req.body.status == "Unlearned" || req.body.status == "Learned"))
          ||
          (req.body.type == "Potion" && (req.body.status == "Unbrewed" || req.body.status == "Brewed"))
        )
        ||
        (req.body.type.trim() == "" && req.body.status.trim() == "")  //if type and status are defined but are blank (allowed)
      )
    {
      console.log("Type and Status are OK for creation of item.");
    }
    else
    {
      res.status(404).json({
      status: 'Request Failed!',
      message: 'Invalid Type-Status data for creation of magic item: ' + newMagicItem.name
      });

      return;
    }
  }//Check if 'type' is defined and 'status' is not  
  else if (req.body.type !== undefined && req.body.status === undefined)
  {
    if (req.body.type != "Spell" && req.body.type != "Potion")
    {
      res.status(404).json({
      status: 'Request Failed!',
      message: 'Invalid Type data for creation of magic item: ' + newMagicItem.name
      });

      return;
    }
  }//Check if 'status' is defined and 'type' is not
  else if (req.body.type === undefined && req.body.status !== undefined)
  {
    if (req.body.status != "Unlearned" && req.body.status != "Learned" && req.body.status != "Unbrewed" && req.body.status != "Brewed")
    {
      res.status(404).json({
      status: 'Request Failed!',
      message: 'Invalid Status data for creation of magic item: ' + newMagicItem.name
      });

      return;
    }
  }

  try {
      await MagicItem.create(newMagicItem);

      res.status(200).json({
        status: 'Success!',
        message: 'Magic item with name \''+ req.body.name + '\' created successfully!'
      });
    }
    catch (error) {
      res.status(404).json({
        status: 'Failed to create new magic item!',
        message: 'Error: ' + error  //convert error message to string or else it cannot be displayed!
      });
    }
};

//POST /api/v1/magicItems/DeleteMagicItem/:name
export const deleteMagicItem = async (req, res) => {
  
  try {
      const deletedItem = await MagicItem.deleteOne({name:req.params.name}); //this is successful even when no documents were deleted!
      
      //Testing if the query deleted any documents or not!
      if (deletedItem.deletedCount != 0)
      {
        res.status(200).json({
          status: 'Success!',
          message: 'Magic item with name \''+ req.params.name + '\' was deleted.'
        });
      }
      else
      {
        res.status(404).json({
        status: 'Magic item does not exist!',
        message: 'Try another name!'
        });
      }
    }
    catch (error) {
      res.status(404).json({
        status: 'Failed to delete item. :(',
        message: 'Error: ' + error  //convert error message to string or else it cannot be displayed!
      });
    }
};

import app from './app.js';
import mongodb from 'mongodb';
import mongoose from 'mongoose';



try {
  mongoose.connect("********************************************************************************", {
        authSource:"admin",
        ssl: true,
  });
  console.log("Connection to database was successful!\n");
} catch (error) {
  console.log("Connection to database failed!\n" + error);
}


const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

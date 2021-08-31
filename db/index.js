
    const mongoose = require('mongoose');
    const dbName = "sprinkle";
    const url = `mongodb://localhost:27017/${dbName}`;
    mongoose.connect(url);




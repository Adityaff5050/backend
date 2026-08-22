const express = require('express');
const catMe = express();     // ✅ call it to get the app instance
catMe.listen(3000, () => console.log('listening'));
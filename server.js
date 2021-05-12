const express = require('express');
const app = express;
const PORT = process.env.PORT || 3001;
app.use({extended: false});
app.use(express.json());

app.listen(PORT, function(){

});
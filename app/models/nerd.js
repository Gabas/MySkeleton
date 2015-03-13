// app/models/nerd.js
// grab the mongoose module
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var NerdSchema = new Schema({
	name: String
});

module.exports = mongoose.model('Nerds', NerdSchema);

// define our nerd model
// module.exports allows us to pass this to other files when it is called



// module.exports = mongoose.model('Nerd', {
//     name : {type : String, default: ''}
// });
/**
 * Created by rahul on 8/2/17.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var user = new Schema({
    user_id:String
},{timestamps: true});

var user = mongoose.model('user', user);

module.exports = user;

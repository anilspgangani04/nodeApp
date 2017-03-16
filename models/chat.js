/**
 * Created by rahul on 8/2/17.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var chat = new Schema({
    user_id:String,
    msg: String,
    created: {type: Date, default: Date.now}
}, { collection: 'chat' });

var chat = mongoose.model('chat', chat);

module.exports = chat;

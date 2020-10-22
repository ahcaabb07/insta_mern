const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;
const Schema = mongoose.Schema;
const postSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    iamge:{
        type:String,
        default:'none'
    },
    postedBy:{
        type:ObjectId,
        ref:"User"
    }
})
module.exports = mongoose.model('Post' , postSchema);
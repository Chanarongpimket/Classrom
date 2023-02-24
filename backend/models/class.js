const mongoose = require('mongoose');

const classroomSchema = new mongoose.Schema({

  classname:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  }
  })

module.exports = mongoose.model('Classroom', classroomSchema);

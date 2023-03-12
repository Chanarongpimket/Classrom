const mongoose = require('mongoose');

// const classroomSchema = new mongoose.Schema({
//   classId: String,
//   classname: String,
//   description: String,
//   teacher: String,
//   student: Array,
//   },
//   {
//     versionKey: false
//   }
// )
const classroomSchema=new mongoose.Schema({
    
  classId:{
      type:String,
      required:true
  },
  classname:{
      type:String,
      required:true
  },
  description:{
      type:String,
      required:true
  },
  teacher:{
      type:String,
      required:true
  },
  student:{
      type:Array,
      required:true
  }
})

// module.exports = mongoose.model('Classroom', classroomSchema);
const classroom = new mongoose.model("Classroom",classroomSchema)

module.exports=classroom
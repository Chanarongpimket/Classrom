const Classroom = require('../models/class');

exports.create = async (req, res, next) => {
  const { name, description } = req.body;
  const owner = req.user._id;

  try {
    const code = generateCode(); // helper function to generate a unique code
    const classroom = await Classroom.create({ name, description, owner, code });
    res.status(201).json(classroom);
  } catch (error) {
    next(error);
  }
};

exports.join = async (req, res, next) => {
  const { code } = req.body;
  const student = req.user._id;

  try {
    const classroom = await Classroom.findOne({ code });
    if (!classroom) {
      return res.status(404).json({ message: 'Classroom not found' });
    }

    if (classroom.students.includes(student)) {
      return res.status(409).json({ message: 'You have already joined this classroom' });
    }

    classroom.students.push(student);
    await classroom.save();

    res.json(classroom);
  } catch (error) {
    next(error);
  }
};

exports.gotoJ = (req, res) => {
  res.render("joinClass")
};
exports.gotoC = (req, res) => {
  res.render('createClass')
};
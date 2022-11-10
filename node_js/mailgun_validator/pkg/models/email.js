const mongoose = require('mongoose');

const Email = mongoose.model(
  'log',
  {
    from: {
      type: String,
      required: true
    },
    to: {
      type: String,
      required: true
    },
    subject: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    created: {
      type: Date,
      required: true
    }
  }
);

const create = async (data) => {
  let email = new Email(data);
  return email.save();
};

const getAll = async () => {
  return Email.find({}).sort({ created: -1 });;
};

const remove = async (id)=> {
  return Email.remove({ _id: id });
};

module.exports = {
  create,
  getAll,
  remove
};


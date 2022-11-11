const { Validator } = require('node-input-validator');

const validate = async (data) => {
  try {    
    const v = new Validator(data, {
      from: 'required|email',
      to: 'required|email',
      subject: 'required|string',
      html: 'required|string'
    });    
    const matched = await v.check();    
    if (!matched) {
      return res.status(400).send('Bad request');
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send('ISE');
  }
};

module.exports = {
  validate
};
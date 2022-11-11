require('dotenv').config()
const path = require('path');
const fs = require('fs');
const Mailgun = require('mailgun.js');
const formData = require('form-data');

const email = require('../pkg/models/email');
const validator = require('../pkg/mailer/index');

const createEmail = async (req, res) => {

  try {    
    await validator.validate(req.body);
    const mailgun = new Mailgun(formData);    
    const mg = mailgun.client({
      username: process.env.MAILGUN_USERNAME,
      key: process.env.MAILGUN_KEY
    }); 
    let filePath = path.join(__dirname, '..', 'pkg', 'uploads', 'download.png');
    let data = await fs.readFileSync(filePath);
    let file = {
        filename: 'download.png',
        data
    };
    await mg.messages.create(
      process.env.MAILGUN_DOMAIN,
      {
        ...req.body,
        attachment: file
      }
    );
    await email.create({
      ...req.body,
      content: req.body.html,
      created: new Date()
    });
    return res.status(200).send('Ok');    
  } catch (error) {
    console.log(error);
    return res.status(500).send('ISE');
  }
}

const getAllLogs = async (req, res) => {
  try {
    let emails = await email.getAll();
    if(emails.length === 0) {
      return res.status(200).send("There are no recipes created!");
    } 
    return res.status(200).send(emails);
  } catch (error) {
    if(error) console.log(error);
    return res.status(500).send(`Bad request!`);
  }
};

const removeLog = async (req, res) => {
  try {
    let e = await email.remove(req.params.id);
    if(e.deletedCount === 0) {
      return res.status(405).send("You can only delete your reciepts!");
    }
    return res.status(200).send('Post deleted');
  } catch (error) {
    if(error) console.log(error);
    return res.status(500).send(`Bad request!`);
  }
};


module.exports = {
  createEmail,
  getAllLogs,
  removeLog
}

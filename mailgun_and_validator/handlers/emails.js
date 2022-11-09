require('dotenv').config()
const path = require('path');
const fs = require('fs');
const Mailgun = require('mailgun.js');
const formData = require('form-data');
const { Validator } = require('node-input-validator');

const email = require('../pkg/models/email');

const createEmail = async (req, res) => {
  try {    
    const v = new Validator(req.body, {
      from: 'required|email',
      to: 'required|email',
      subject: 'required|string',
      html: 'required|string'
    }); 
    
    const matched = await v.check();    
    if (!matched) {
      return res.status(422).send(v.errors);
    }
    
    const mailgun = new Mailgun(formData);    
    const mg = mailgun.client({
      username: process.env.MAILGUN_USERNAME,
      key: process.env.MAILGUN_KEY
    });
    let messageParams = {
      from: req.body.from,
      to: req.body.to,
      subject: req.body.subject,
      html: req.body.html
    };
    
    let filePath = path.join(__dirname, '..', 'pkg', 'uploads', 'download.png');

    let data = await fs.readFileSync(filePath);
    let file = {
      filename: 'download.png',
      data
    };
    messageParams.attachment = file;
    let output = await mg.messages.create(
      process.env.MAILGUN_DOMAIN,
      messageParams
    );

    await email.create({
      ...messageParams,
      content: req.body.html, 
      created: new Date()
    });        
    return res.status(200).send(output.message);    
  } catch (error) {
    console.log(error);
    res.status(500).send('ISE');
  }
}

const getAllEmails = async (req, res) => {
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

const getSendFrom = async (req, res) => {
  try {
    let emails = await email.getFromEmail(req.body.from);
    if(emails !== null) {
      return res.status(200).send(emails);
    }
    return res.status(404).send("Reciept doesn't exist!");
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
  getAllEmails,
  getSendFrom,
  removeLog
}

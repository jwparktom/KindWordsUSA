const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = (req, res) => {
  const {msg} = req.query;

  if (!msg || msg.trim() == '') return res.status(401).json({error: 'missing-parameters'});

  const msgObj = {
    // for now, use email forwarding to not get the emails into spam
    to: 'message@kindwordsusa.com',
    from: 'message@kindwordsusa.com',
    subject: 'Message Received',
    text: msg,
    // html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  };
  sgMail.send(msgObj)
    .then(data => {
      // console.log(data);
      res.status(200).json({success: 'successful'});
    })
    .catch(err => {
      console.log(err);
      res.status(501).json({error: 'internal-error'});
    });
};

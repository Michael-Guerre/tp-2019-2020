/**
 * CowsayController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

var cowsay = require('cowsay');

module.exports = {
  /**
   * `CowsayController.say()`
   */
  say: async function (req, res) {
    let count = await Sentences.count();
    console.debug('Got '+count+' sentences in database');
    let s = await Sentences.find().limit(1).
      skip(Math.floor(Math.random() * Math.floor(count)));
    let sentence = "Random Message";
    if(s.length > 0) {
      sentence = s[0].sentence;
    }
    return res.view('cowsay', { cow: cowsay.say({
      f: process.env.COW || 'stegosaurus',
      text : sentence,
      e : 'oO',
      T : 'U '
    })});
  },

  add: async function (req, res) {
    return res.view('add');
  },

  create: async function(req, res) {
    await Sentences.create({ sentence: req.param('sentence') });
    var job = queue.create('email', {
        title: 'wThanks for the text'
        ,from : "cdad@l3o.eu"
      , to: req.param('email')
      , template: 'welcome-email'
    }).save( function(err){
      if( !err ) console.log( job.id );
    });
    queue.process('email', function(job, done){
      email(job.data.to, done);
    });
    return res.redirect('/say');
  },
};

function email(address, done) {
  if(!isValidEmail(address)) {
    return done(new Error('invalid to address'));
  }
  let transporter = nodemailer.createTransport(transport[, defaults])
  let poolConfig = "smtp://postmaster@mailgun.l3o.eu:fedbe91ae5e3529f94528dd311bea4c9-060550c6-d42c872f@smtp.mailgun.org:587"

  done();
}

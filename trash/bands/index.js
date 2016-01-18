module.exports = function(app) {
  require('./bandInfo')(app);
  require('./bandList')(app);
  require('./../rapper.controller.js'); // eliminated '(app)'
};

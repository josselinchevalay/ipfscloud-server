'use strict';
const file = require('../controllers/fileController.js');
const folder = require('../controllers/folderController.js');
const share = require('../controllers/shareController.js');
const search = require('../controllers/searchController.js');
const host = require('../controllers/hostController.js');
const key = require('../controllers/apiKeyController.js');
/*const orbit_keyvalue = require('../controllers/orbitKeyValueController.js');*/
const multer  = require('multer');
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });



module.exports = function(app) {

  /**
   * @swagger
   * /file:
   *   post:
   *     description: Upload a file on IpfsCloud
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: file uploaded
   */
 app.route('/file')
    .post(upload.single('file'), file.upload);

 app.route('/file/private')
    .post(upload.any(), file.secretUpload);

 app.route('/file/private/:info')
    .get(file.getFile);

 app.route('/folder')
 	.post(upload.any(), folder.upload);

 app.route('/folder/private')
   .post(upload.any(), folder.secretUpload);

 app.route('/folder/:id')
   .get(folder.getFolder);

 app.route('/folder/ls/:id')
 	.get(folder.ls);

 //DELETES BOTH FILE AND FOLDER
 app.route('/delete')
 	.post(file.delete);

 app.route('/email')
   .post(share.sendEmail);

 app.route('/host/:url')
   .get(host.redirect);

 app.route('/host')
   .post(upload.any(), host.upload)
   .get(host.isValidURL);
/* app.route('/orbit/keyvalue')
 	.get(orbit_keyvalue.show)*/


 //searching objects on IPFS (Thanks to https://github.com/ipfs-search/ipfs-search)
 app.route('/search')
   .get(search.search);

 app.route('/metadata/:id')
 	.get(search.metadata);


 //TODO: add authorization check for the masterKey. Only the masterKey has control over this route.
 app.route('/apiKey/create')
  .post(key.createKey);



};

import _each from 'lodash/collection/forEach';
import jade from 'jade';
import helpers from '../lib/helpers';
import express from 'express';

let router = express.Router();

var subpages = [{
  name: 'Index',
  url: '/',
  templateName: 'migreva'
}, {
  name: 'Stuff',
  url: '/stuff',
  templateName: 'subpages/stuff'
},{
  name: 'Contact',
  url: '/contact',
  templateName: 'subpages/contact'
}]

module.exports = function(app) {

  // For each subpage we have, route the URL by name and load the jade temaplte
  _each(subpages, function(subpage) {

    router.get(subpage.url, function(req, res) {

      console.log(req.header('Content-Type'));
      if (req.is('application/json')) {
        console.log('is json');
        // Return json
        res.json({
          success: true,

          // Load the HTML of the jade tempalte
          page: jade.renderFile(`${app.get('views')}/${subpage.templateName}.jade`)
        });
      }
      else {
        console.log('is not json');
        res.render(subpage.templateName, {
          title: subpage.name + ' - migreva.com',
          pageLoad: true
        })
      }
    });
  });

  app.use(router);
}
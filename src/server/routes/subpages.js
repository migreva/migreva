import jade from 'jade';
import { Router } from 'express';

let router = Router();

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


// For each subpage we have, route the URL by name and load the jade temaplte
for (let subpage of subpages) {

  router.get(subpage.url, function(req, res) {

    if (req.is('application/json')) {
      // Return json
      res.json({
        success: true,

        // Load the HTML of the jade tempalte
        page: jade.renderFile(`${app.get('views')}/${subpage.templateName}.jade`)
      });
    } else {
      res.render(subpage.templateName, {
        title: subpage.name + ' - migreva.com',
        pageLoad: true
      });
    }
  });
}

export default router;

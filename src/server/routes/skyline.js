import path from 'path';

import { Router } from 'express';
import cheerio from 'cheerio';

import { PACKAGE_DIR, readFile } from '../lib';

let PUBLIC_DIR = path.resolve(path.join(PACKAGE_DIR), 'public');

let router = new Router();

router.get('/detroit-skyline/', (req, res, next) => { res.render('skyline'); });

router.get('/get-skyline-elements/', async (req, res, next) => {
  try {
    let data = await processSkylineImage();
    res.json({ data });
  } catch(e) {
    next(e);
  }
});

async function processSkylineImage() {

  // Read the contents of the svg image and parse them
  let skylineImg = path.join(PUBLIC_DIR, 'img', 'detroit-skyline.svg');
  let contents = await readFile(skylineImg);
  let svgElements = [];
  let $ = cheerio.load(String(contents));

  let svg = $('svg');
  let height  = $('svg').attr('height');
  let width = $('svg').attr('width');

  $('svg > g').each(function(index, el) {
    let className = $(el).attr('class') || '';
    let displayName = className.replace('/-/g', ' ');

    let paths = [];
    $(el).find('path').each(function(index, path) {
      paths.push($(path).attr('d'));
    });

    let circles = [];
    $(el).find('circle').each(function(index, circle) {
      circles.push({
        cx: $(circle).attr('cx'),
        cy: $(circle).attr('cy'),
        r: $(circle).attr('r')
      })
    });

    svgElements.push({ className, displayName, paths, circles });
  });

  return { svgElements, height, width };
}

export default router;

import $ from './$.js';
import animations from './animations';
import request from 'request';

var newPageContent;

function done() {
  if (newPageContent) {
    $('body').html(newPageContent);

    $('#page-content').addClass('page-content-new');

    Velocity(document.getElementById('page-content'),{
      'top': 0,
      'opacity': 1,
    }, {
      duration: 500,
      complete: function() {
        $('.page-content-new').removeClass('page-content-new');
      }
    });
  }

  newPageContent = ''
}

function loadPage(hash) {

  return new Promise(function(resolve, reject) {
    let url = window.location.protocol + '//' + window.location.host + hash.replace('#', '/');
    request(url, function(err, response, body) {
      if (err) reject();

      newPageContent = body;

      resolve();
    });
  });
}

function animateOutCurrentPage() {

  return new Promise(function(resolve, reject) {
    animations.slideOutElement('#page-content', function() {
      $('body').html('<div class="jumbotron loading"><div class="row page-loading"><i class="fa fa-spinner"></i></div></div>')
      resolve();
    });
  });
}

$(document).ready(function() {
  $('body').on('click', '.subpage-nav', async function() {
    var href = $(this).attr('href');
    if (!href) {
      return;
    }

    await Promise.all([animateOutCurrentPage(), loadPage(href)]);

    done();
  });
});

module.exports = {
  loadPage: loadPage
}
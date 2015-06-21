import $ from './$';
import animations from './animations';
import requests from 'requests';

var PAGELOADING = false;
var LOADINGDONE = true;
var OUTANIMATIONDONE = true;

var newPageContent;

function done() {
  if (newPageContent) {
    $('body').html($(newPageContent));

    $('.page-content').addClass('page-content-new')
    Velocity($('.page-content')[0], {
      'top': 0,
      'opacity': 1,
    }, 500, () => {
      $('.page-content-new').removeClass('page-content-new');
    });
  }

  PAGELOADING = false;
  LOADINGDONE = true,
  OUTANIMATIONDONE = true;
  newPageContent = ''
}

function checkDone() {
  if (PAGELOADING && LOADINGDONE && OUTANIMATIONDONE && newPageContent) {
    done();
  }
}

function outAnimationDone() {
  OUTANIMATIONDONE = true;
  checkDone();
}

function pageLoadingDone(data) {
  newPageContent = data;
  LOADINGDONE = true;

  checkDone();
}

var loadPage = function(hash) {
  request.get(hash.replace('#', '/'), function(data) {
    if (!('success' in data) || !data.success || !('page' in data)) {
      console.log('failed to fetch ' + hash);
      return;
    }

    pageLoadingDone(data.page);
  });
}

var animateOutCurrentPage = function() {
  animations.slideOutElement('.page-content', function() {
    $('body').html('<div class="jumbotron loading"><div class="row page-loading"><i class="fa fa-spinner"></i></div></div>')

    outAnimationDone();
  });
}

$(document).ready(function() {
  $('body').on('click', '.subpage-nav', function() {
    var href = $(this).attr('href');
    if (!href) {
      return;
    }

    PAGELOADING = true;
    OUTANIMATIONDONE = false;
    LOADINGDONE = false;

    animateOutCurrentPage();
    loadPage(href);
  });
});

module.exports = {
  loadPage: loadPage
}
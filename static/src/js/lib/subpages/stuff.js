import request from 'request';
import _each from 'lodash/collection/forEach';
import $ from '../$';
import React from 'react';

export default class Stuff {
  constructor() {

  }

  pageLoaded() {
    request.get(`${window.location.origin}/github/languages`, (err, res, body) => {
      if (err) throw new Error(err);

      body = JSON.parse(body);

      _each(body.repos, function(repo) {
        let name = repo.repo;
        let $obj = $(`.${name}`);
        if (!$obj) return;

        React.render(
          <Stats stats={ repo.stats }/>,
          $obj.find('.languages')[0]
        );

      });
    });
  }
}

class Stats extends React.Component {
  constructor(stats) {
    super(stats);
    this.stats = stats
    this.percentages = [];
    this.compileStats();
  }

  compileStats() {
    let total = 0;
    _each(this.stats, function(stat) { total += stat });
    _each(this.stats, (stat, lang) => {
      this.percentages.push({
        name: lang,
        stats: stat/total
      });
    });
    this.percentages.sort(function(a, b) {
      if (a.stats > b.stats) return 1
      else if (a.stats < b.stats) return -1
      else return 0;
    })
  }

  getStatHtml(obj, index) {
    return (
      <div className='lang'>
        <span className='name'>{ obj.name }</span>
        <span className='percentage'>{ obj.stats }</span>
      </div>
    )
  }

  render() {

    return (
      <div>
        { this.percentages.map(this.getStatHtml) }
      </div>
    )
  }
}
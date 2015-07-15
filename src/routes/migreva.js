import Subpages from './subpages';
import GithubApi from './github';

module.exports = function(app) {

  let subpages = Subpages(app);
  let github = new GithubApi(app);

  return {

  }
}
import Subpages from './subpages';
import GithubApi from './github';

export default function(app) {

  let subpages = Subpages(app);
  let github = new GithubApi(app);

  return {

  }
}

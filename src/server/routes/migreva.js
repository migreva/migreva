import Subpages from './subpages';
import GithubApi from './github';
import Skyline from './skyline';

export default function(app) {

  app.use('/', Subpages);
  app.use('/', Skyline);
  let github = new GithubApi(app);

  return {

  }
}

import { Router } from 'express';
import request from 'request';
import { github } from '../config';

export default class GitHubApi {
  constructor(app) {
    this.githubUser = 'migreva';
    this.gitHubRoot = 'https://api.github.com/';
    this.githubLoginUrl = 'https://github.com/login/oauth/authorize';

    this.gitRepos = {
      renvy: {
        owner: 'michigan-com',
        name: 'renvy'
      },
      dashbeat: {
        owner: 'michigan-com',
        name: 'dashbeat'
      },
      migreva: {
        owner: 'migreva',
        name: 'migreva'
      }
    }

    this.initRoutes(app)
  }

  initRoutes(app) {
    this.router = Router();

    this.router.get('/github/languages/', async (req, res) => {
      let responses = await this.getRepoLanguages();
      res.json({
        repos: responses
      });
    });

    app.use(this.router);
  }

  /**
   * Iterates over this.gitRepos, hits the /languages and gets the languages
   *
   * @memberof GitHubApi
   *
   * @returns {Object} { username, repo, stats}
   */
  async getRepoLanguages() {
    let urls = [];
    for (let repoName in this.gitRepos) {
      let repo = this.gitRepos[repoName];
      urls.push(`${this.gitHubRoot}repos/${repo.owner}/${repo.name}/languages?access_token=${github.token}`);
    }

    let responses = await Promise.all([for (url of urls) this.fetch(url)]);

    let returnVal = [];
    for (let resp of responses) {
      console.log(resp.url);
      let match = /repos\/([^\/]+)\/([^\/]+)\/languages/.exec(resp.url);
      if (!match) {
        returnVal.push({ stats: resp.body });
      } else {
        returnVal.push({
          username: match[1],
          repo: match[2],
          stats: resp.body
        });
      }
    }

    return returnVal;
  }

  /**
   * Generates a promise and fetches the [url]
   *
   * @memeberof GitHubApi
   * @param {String} [url] Url to fetch
   * @return {Object} Promise. Resolves with the following object
   *  {
   *    url: url that was fetched,
   *    body: response body
   *  }
   */
  fetch(url) {
    return new Promise(function(resolve, reject) {

      let headers = {
        'User-Agent': 'migreva',
        'Accept': 'application/vnd.github.v3+json'
      }

      console.log(`Fetching ${url}`);
      request.get({
        url,
        headers
      }, (err, resp, body) => {
        if (err) reject(err);
        console.log(`Returned from ${url}`);
        resolve({
          url,
          body: JSON.parse(body)
        });
      });
    });
  }
}


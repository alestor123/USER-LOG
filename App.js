var axios = require('axios'),
username = process.argv[2] || 'github',
api = 'https://api.github.com/',
acts = ["WatchEvent","PushEvent","CreateEvent","PullRequestEvent","DeleteEvent","ForkEvent","IssueCommentEvent","PullRequestReviewCommentEvent","IssuesEvent","PublicEvent",],
chalk = require('chalk');

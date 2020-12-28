var axios = require('axios'),
fs = require('fs'),
options = require('minimist')(process.argv.slice(2)),
username = options.u || options.username || 'github',
api = 'https://api.github.com/',
acts = ["WatchEvent","PushEvent","CreateEvent","PullRequestEvent","DeleteEvent","ForkEvent","IssueCommentEvent","PullRequestReviewCommentEvent","IssuesEvent","PublicEvent",],
chalk = require('chalk');
axios.get(api+'users/'+username+'/events').then((response) => {
    response.data.filter((activity) => acts.includes(activity.type)).map((activity) => fsLog(Events(activity))
)})
function Events(activity){
var repo = chalk.green(activity.repo.name)
        if(activity.type=="ForkEvent") return `${chalk.bold.redBright("Forked")} a repo from ${activity.payload.forkee.html_url}`;
        else if(activity.type=="PullRequestEvent")  return `${chalk.bold.yellowBright(activity.payload.action.charAt(0).toUpperCase() + activity.payload.action.slice(1))} a PR at https://github.com/${repo}`;
        else if("WatchEvent"==activity.type) return `${chalk.blue.bold("Starred")} https://github.com/${repo}`;
        else if("CreateEvent"==activity.type)return `${chalk.green.bold("Created")} a ${activity.payload.ref_type} at https://github.com/${repo}`;
        else if("DeleteEvent"==activity.type) return `${chalk.red.bold("Deleted")} a ${activity.payload.ref_type} at https://github.com/${repo}`;
        else if("IssuesEvent"==activity.type)return `${chalk.bold.red(activity.payload.action.charAt(0).toUpperCase() + activity.payload.action.slice(1))} an issue at https://github.com/${repo}`;
        else if("IssueCommentEvent"==activity.type)return `${chalk.bold.red(activity.payload.action.charAt(0).toUpperCase() + activity.payload.action.slice(1))} an issue at https://github.com/${repo}`;
        else if("PublicEvent"==activity.type)return `${chalk.green("Push")} https://github.com/${repo} public`;
        else if(activity.type='PushEvent') return `${chalk.bold.magenta("Pushed")}  to https://github.com/${repo}`;
        else return "";
}
function fsLog(logText) {
    console.log(logText)
    if(options.fslog || options.f ||  process.env.LOG || false ){
    fs.appendFile(options.fsLog || options.f ||  process.env.LOGPATH || 'logs.log' ,`\n ${logText} \n` , (err) => {
        if (err) throw err;
})}}
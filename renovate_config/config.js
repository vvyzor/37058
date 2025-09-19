const fs = require('fs');
module.exports = {
$schema: "https://docs.renovatebot.com/renovate-schema.json",
platform: 'gitlab',
token: process.env.RENOVATE_GITLAB_TOKEN,
hostRules: [
    {
      hostType: 'gitlab',
      hostName: 'internal.gitlab.com',
      token: process.env.RENOVATE_GITLAB_TOKEN,
    },
  ],
postUpgradeTasks:
    {
        "commands": ["git rm -r --ignore-unmatch --cached .renovate"],
        "executionMode": "update"
    },
allowedEnv: [
    '*'
],
extends: [
    "config:recommended",
    ":semanticCommits"
],

// Suppress notifications for Gitlab group
packageRules: [ {
  "matchPackageNames": ["@company/private_package"],
  "commitMessageTopic": "dependency {{{replace '@' '' depName}}}"
} ],

semanticCommits: "enabled",

// Security Vulnerability Alerts
dependencyDashboardOSVVulnerabilitySummary: "all",
osvVulnerabilityAlerts: true,

force: {
    "ignorePrAuthor": true, // Used to ignore the old bot on bitbucket, but probably also old token
    "gradle-wrapper": {
        enabled: false, // Disable Gradle Wrapper updates globally
    },
    "cargo": {
        enabled: false, // Disable Rust Wrapper updates globally
    },
    "bundler": {
        enabled: false, // Disable Ruby Wrapper updates globally
    }
}
};

if (fs.existsSync("/tmp/renovate-repos.json")) {
    if (! "RENOVATE_RUNNER_INDEX" in process.env || ! "RENOVATE_RUNNER_TOTAL" in process.env) {
        console.log("/tmp/renovate-repos.json exists, but RENOVATE_RUNNER_INDEX and RENOVATE_RUNNER_TOTAL are not set.");
        process.exit(1);
    }
    segmentNumber = Number(process.env.RENOVATE_RUNNER_INDEX); // RENOVATE_RUNNER_INDEX is 1 indexed
    segmentTotal = Number(process.env.RENOVATE_RUNNER_TOTAL);
    allRepositories = JSON.parse(fs.readFileSync("/tmp/renovate-repos.json"));
    allSize = allRepositories.length;
    chunkSize = parseInt(allSize / segmentTotal);
    chunkStartIndex = chunkSize * (segmentNumber - 1);
    chunkEndIndex = chunkSize * segmentNumber;
    if (chunkEndIndex > allSize) {
        chunkEndIndex = allSize;
    }
    repositories = allRepositories.filter((_, i) => (segmentNumber - 1) === (i % segmentTotal))
    module.exports.repositories = repositories;
    module.exports.autodiscover = false;
    console.log(`/tmp/renovate-repos.json contains ${allRepositories.length} repositories. This is chunk number ${segmentNumber} of ${segmentTotal} total chunks. Processing ${repositories.length} repositories.`);
    console.log(`Processing the following repositories:`);
    console.log(JSON.stringify(repositories, null, 2))
} else {
    module.exports.autodiscover = true;
}
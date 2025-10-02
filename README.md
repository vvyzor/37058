# discussions/37058
Reproduction for [GitHub Discussion #37058](https://github.com/renovatebot/renovate/discussions/37058)

## Current behavior

After updating to version 41.x, we started encountering the following error for every scanned repository. The error began appearing in version 40.52.0:

```
 INFO: Renovate is exiting with a non-zero code due to the following logged errors
       "loggerErrors": [
         {
           "name": "renovate",
           "level": 50,
           "logContext": "EKny4fbDgeitNor94o4aZ",
           "repository": "local",
           "err": {
             "message": "managerFilePatterns is not iterable",
             "stack": "TypeError: managerFilePatterns is not iterable\n    at getMatchingFiles (/usr/local/renovate/lib/workers/repository/extract/file-match.ts:59:25)\n    at tryConfig (/usr/local/renovate/lib/workers/repository/extract/index.ts:21:46)\n    at extractAllDependencies (/usr/local/renovate/lib/workers/repository/extract/index.ts:38:7)\n    at checkOnboardingBranch (/usr/local/renovate/lib/workers/repository/onboarding/branch/index.ts:109:23)\n    at getRepoConfig (/usr/local/renovate/lib/workers/repository/init/config.ts:13:12)\n    at initRepo (/usr/local/renovate/lib/workers/repository/init/index.ts:58:12)\n    at Object.renovateRepository (/usr/local/renovate/lib/workers/repository/index.ts:70:14)\n    at attributes.repository (/usr/local/renovate/lib/workers/global/index.ts:184:11)\n    at start (/usr/local/renovate/lib/workers/global/index.ts:169:7)\n    at /usr/local/renovate/lib/renovate.ts:19:22"
           },
           "msg": "Repository has unknown error"
         }
       ]
```

## Expected behavior

We aim to understand the root cause of this error and eliminate it.

// In this file we remove that User's data after 30 minutes, who's data stored in DB but unverified...

// node-cron used to perform Day/Time based operations...
const cron = require("node-cron");                              // for more info visit https://www.npmjs.com/package/node-cron ...

const User = require("../models/userModel.js");

const removeUnverifyAccounts = () => {
    // Each star represent time from seconds/minute/hour/year/monthlyDay/weeklyDay ...
    // But here we use 5* to use from minutes...
    cron.schedule(" */5 * * * * ", async (req, res) => {
        const fiveMinutesAgo = new Date(Date.now() - 55 * 60 * 1000);

        await User.deleteMany({ 
            accountVerified : false,
            createdAt: {  $lt : fiveMinutesAgo },
        });
    });
}

module.exports = { removeUnverifyAccounts }
require('dotenv').config()
const createDeployTasks = require('shipit-deploy')

const PM2_APP_NAME = 'ZNotepad'

module.exports = shipit => {
    createDeployTasks(shipit);
    require('shipit-npm')(shipit);

    shipit.initConfig({
        default: {
            workspace: 'files',
            deployTo: '/home/mediawant/public_html/znotepad.com',
            repositoryUrl: 'git@github.com:haipc/znotepad.com.git',
            branch: 'master',
            keepReleases: 3,
            ignores: ['.git', 'node_modules'],
            deleteOnRollback: false,
            shallowClone: false
        },
        production: {
            servers: 'mediawant@mediago',
        },
    });

    shipit.on('updated', () => {
        shipit.start('copyConfig');
    });

    shipit.task('copyConfig', async ()=> {
        await shipit.copyToRemote(
            '.env.production',
            '/home/mediawant/public_html/znotepad.com/current/.env'
        );

        require('dotenv').config();
    });
};
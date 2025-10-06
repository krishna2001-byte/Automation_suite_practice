const { defineConfig } = require('cypress');
const cypressOnFix = require('cypress-on-fix');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const { addCucumberPreprocessorPlugin } = require('@badeball/cypress-cucumber-preprocessor');
const { createEsbuildPlugin } = require('@badeball/cypress-cucumber-preprocessor/esbuild');
const fs = require('fs-extra');
const path = require('path');

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  video: false,
  videoCompression: 40,
  retries: 1,
  reporterOptions: {
    charts: true,
    reportPageTitle: 'Cypress Test Results',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: true,
    useInlineDiffs: true,
    reportFilename: 'cypress-cucumber-poc-results.html',
    overwrite: true,
    autoOpen: false
  },
  e2e: {
    baseUrl: 'https://testautomation.bigcartel.com',
    async setupNodeEvents(on, config) {
      on = cypressOnFix(on);

      // ✅ Clean report folders before run
      on('before:run', () => {
        const htmlReportDir = path.join(__dirname, 'cypress', 'reports', 'html');
        const videosDir = path.join(htmlReportDir, 'videos');
        const jsonsDir = path.join(htmlReportDir, '.jsons');
        const Report = path.join(__dirname, 'report');

        const foldersToClean = [videosDir, jsonsDir, htmlReportDir,Report];

        foldersToClean.forEach((folder) => {
          try {
            if (fs.existsSync(folder)) {
              fs.chmodSync(folder, 0o777);
              fs.removeSync(folder);
              console.log(`✅ Deleted folder: ${folder}`);
            }
          } catch (err) {
            console.warn(`⚠️ Failed to delete ${folder}:`, err.message);
          }
        });
      });

      require('cypress-mochawesome-reporter/plugin')(on);
      await addCucumberPreprocessorPlugin(on, config);
      on('file:preprocessor', createBundler({ plugins: [createEsbuildPlugin(config)] }));

      return config;
    },
    specPattern: 'cypress/e2e/**/*.feature',
    screenshotsFolder: 'cypress/reports/screenshots',
    screenshotOnRunFailure: true,
    experimentalStudio: true,
    experimentalWebKitSupport: true,
    videosFolder: 'cypress/videos',
    retries: {
      runMode: 1,
      openMode: 0
    }
  },
  'cypress-cucumber-preprocessor': {
    nonGlobalStepDefinitions: true,
    step_definitions: 'cypress/e2e/step_definitions'
  }
});
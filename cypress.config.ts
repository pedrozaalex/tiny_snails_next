import { loadEnvConfig } from '@next/env';
import { defineConfig } from 'cypress';
import resetDB from './cypress/tasks/resetDB';
import seedDB from './cypress/tasks/seedDB';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const { combinedEnv } = loadEnvConfig(process.cwd(), false);

export default defineConfig({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    env: combinedEnv,
    e2e: {
        baseUrl: 'http://localhost:3000',
        retries: {
            runMode: 3,
        },
        viewportHeight: 1080,
        viewportWidth: 1920,
        video: false,
        screenshotOnRunFailure: false,
        setupNodeEvents(on) {
            on('task', {
                resetDB,
                seedDB,
            });
        },
    },
});

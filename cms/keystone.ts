// Welcome to Keystone!
//
// This file is what Keystone uses as the entry-point to your headless backend
//
// Keystone imports the default export of this file, expecting a Keystone configuration object
//   you can find out more at https://keystonejs.com/docs/apis/config

import { config } from '@keystone-6/core';

// to keep this file tidy, we define our schema in a different file
import { lists } from './schema';

// authentication is configured separately here too, but you might move this elsewhere
// when you write your list-level access control functions, as they typically rely on session data
import { withAuth, session } from './auth';
import dotenv from 'dotenv';

dotenv.config();

console.log(
    '===== LOG =====',
    process.env.DATABASE_URL,
    process.env.FRONTEND_URL
);

export default withAuth(
    config({
        db: {
            provider: 'postgresql',
            url: process.env.DATABASE_URL!
        },
        lists,
        session,
        server: {
            cors: {
                origin: process.env.FRONTEND_URL,
                credentials: true
            }
        }
    })
);

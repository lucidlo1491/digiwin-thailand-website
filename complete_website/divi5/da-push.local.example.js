/**
 * da-push.local.js — DirectAdmin credentials (GITIGNORED)
 *
 * Copy this file to da-push.local.js and fill in your credentials.
 * Find your DirectAdmin username/password in your hosting welcome email
 * or DirectAdmin login page (usually https://digiwin.co.th:2222).
 *
 * For better security, create a Login Key in DirectAdmin:
 *   Advanced Features > Login Keys > Create
 *   - Scope to database commands only
 *   - Restrict to your IP address
 *   Then use daPass: 'your-login-key-value'
 */
module.exports = {
  daUser: 'your-directadmin-username',
  daPass: 'your-directadmin-password',
  // daHost: 'digiwin.co.th',  // default
  // daPort: 2222,              // default
  // database: 'digiwin_datasea', // default
};

module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      name      : 'wfe-api',
      script    : 'src/index.js',
      env: {
        COMMON_VARIABLE: 'true'
      },
      watch : ["src/*", "../wfe-db/*"],
      watch_options: {
        followSymlinks: true
      }
    }
  ]
};

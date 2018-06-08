
module.exports = function (ctx) {
  return {
    plugins: [],
    css: ['app.styl'],
    extras: [
      ctx.theme.mat ? 'roboto-font' : null,
      'material-icons'
      // 'ionicons',
      // 'mdi',
      // 'fontawesome'
    ],
    supportIE: false,
    build: {
      scopeHoisting: true,
      vueRouterMode: 'history',
      gzip: true,
      extractCSS: false,
      extendWebpack (cfg) {
        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules|quasar)/
        })
      }
    },
    devServer: {
      port: 8080,
      open: true
    },
    framework: 'all',
    animations: 'all',
    electron: {
      bundler: 'builder',
      extendWebpack (cfg) {
        // do something with Electron process Webpack cfg
      },
      builder: {
        nsis: {
          // installerIcon: '',
          // license: '',
          // artifactName: '',
          oneClick: false,
          allowToChangeInstallationDirectory: true
        },
        win: {
          publish: {
            provider: 'github',
            publishAutoUpdate: true
          }
        }
      }
    }
  }
}

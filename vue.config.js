'use strict'
const path = require('path')
const webpack = require('webpack')
const defaultSettings = require('./src/config/settings')
const cheerio = require('cheerio')
const md = require('markdown-it')()

const striptags = {
  strip: function(str, tags) {
    const $ = cheerio.load(str, { decodeEntities: false })

    if (!tags || tags.length === 0) {
      return str
    }

    tags = !Array.isArray(tags) ? [tags] : tags
    var len = tags.length

    while (len--) {
      $(tags[len]).remove()
    }

    return $.html()
  },
  fetch: function(str, tag) {
    const $ = cheerio.load(str, { decodeEntities: false })
    if (!tag) return str

    return $(tag).html()
  }
}

function resolve(dir) {
  return path.join(__dirname, dir)
}

const wrap = function(render) {
  return function() {
    return render.apply(this, arguments)
      .replace('<code v-pre class="', '<code class="hljs ')
      .replace('<code>', '<code class="hljs">')
  }
}

function convert(str) {
  str = str.replace(/(&#x)(\w{4});/gi, function($0) {
    return String.fromCharCode(parseInt(encodeURIComponent($0).replace(/(%26%23x)(\w{4})(%3B)/g, '$2'), 16))
  })
  return str
}

const name = defaultSettings.title || 'vue Admin Template' // page title

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following methods:
// port = 9528 npm run dev OR npm run dev --port = 9528
const port = process.env.port || process.env.npm_config_port || 9528 // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    before: require('./mock/mock-server.js')
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
      })
    ]
  },
  chainWebpack(config) {
    // it can improve the speed of the first screen, it is recommended to turn on preload
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        // to ignore runtime.js
        // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial'
      }
    ])

    // when there are many pages, it will cause too many meaningless requests
    config.plugins.delete('prefetch')

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

    // set element-ui-ext demo
    config.module
      .rule('md')
      .test(/\.md/)
      .use('vue-loader')
      .loader('vue-loader')
      .end()
      .use('vue-markdown-loader')
      .loader('vue-markdown-loader/lib/markdown-compiler')
      .options({
        raw: true,
        use: [
          [require('markdown-it-container'), 'demo', {
            validate: function(params) {
              return params.trim().match(/^demo\s*(.*)$/)
            },
            render: function(tokens, idx) {
              var m = tokens[idx].info.trim().match(/^demo\s*(.*)$/)
              if (tokens[idx].nesting === 1) {
                var description = (m && m.length > 1) ? m[1] : ''
                var content = tokens[idx + 1].content
                var html = convert(striptags.strip(content, ['script', 'style'])).replace(/(<[^>]*)=""(?=.*>)/g, '$1')
                var script = striptags.fetch(content, 'script')
                var style = striptags.fetch(content, 'style')
                var jsfiddle = { html: html, script: script, style: style }
                var descriptionHTML = description ? md.render(description) : ''
                jsfiddle = md.utils.escapeHtml(JSON.stringify(jsfiddle))

                return `<demo-block class="demo-box" :jsfiddle="${jsfiddle}">
                        <div class="source" slot="source">${html}</div>
                        ${descriptionHTML}
                        <div class="highlight" slot="highlight">`
              }
              return '</div></demo-block>\n'
            }
          }],
          [require('markdown-it-container'), 'tip'],
          [require('markdown-it-container'), 'warning']
        ],
        preprocess: function(MarkdownIt, source) {
          MarkdownIt.renderer.rules.table_open = function() {
            return '<table class="demo-table">'
          }
          MarkdownIt.renderer.rules.fence = wrap(MarkdownIt.renderer.rules.fence)
          return source
        }
      })
      .end()

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
              // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                elementUI: {
                  name: 'chunk-elementUI', // split elementUI into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
          config.optimization.runtimeChunk('single')
        }
      )
  },
  css: {
    requireModuleExtension: true,
    sourceMap: true,
    loaderOptions: {
      scss: {
        /* sass-loader 8.0语法 */
        prependData: '@import "~@/styles/variables.scss";'
      }
    }
  }
}

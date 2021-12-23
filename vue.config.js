/**
 *   编辑器需要webpack配置文件用 node_modules\@vue\cli-service\webpack.config.js
 */

const path = require("path");
const {
  HTMLMinifierOptions: minify,
  CspHtmlWebpackPluginOptions: cspOptions,
  externalsOptions
} = require("./build/config");
const { isProd } = require("./build/utils");
const CspHtmlWebpackPlugin = require("csp-html-webpack-plugin");
const HtmlWebpackExternalsPlugin = require("html-webpack-externals-plugin");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);
const IS_DEV_PROD = ["dev"].includes(process.env.NODE_ENV);

const version = "v1";
const TimeStamp = new Date().getTime();

module.exports = {
  publicPath: IS_PROD || IS_DEV_PROD ? "/ext/magento/m" : "/",
  // assetsDir: "static",
  css: {
    // extract: IS_PROD,
    sourceMap: false,
    // 修改打包后css文件名，输出重构，打包编译后的文件名称  【模块名称.版本号.css】
    extract: {
      filename: `css/[name]_${version}.css?t=${TimeStamp}`,
      chunkFilename: `css/[name]_${version}.css?t=${TimeStamp}`
    }
  },
  productionSourceMap: process.env.NODE_ENV === "development",
  lintOnSave: false,
  devServer: {
    historyApiFallback: true, // history模式下使用
    overlay: {
      // 让浏览器 overlay 同时显示警告和错误
      warnings: false,
      errors: false
    },
    host: "0.0.0.0",
    port: 8702, // 端口号
    https: false, // https:{type:Boolean}
    open: false, // 配置自动启动浏览器
    hotOnly: true, // 热更新
    // proxy: 'http://localhost:8080'   // 配置跨域处理,只有一个代理
    proxy: {
      // 配置多个跨域
      "/rest/ext/": {
        target: process.env.VUE_APP_API,
        changeOrigin: true,
        // ws: true,//websocket支持
        secure: false,
        pathRewrite: {
          "^/": "/"
        }
      }
    }
  },
  pwa: {
    name: "Checkout - SafePal Pay",
    themeColor: "#01a1ef",
    workboxOptions: {
      // importWorkboxFrom: "local"
    },
    iconPaths: {
      favicon32: "favicon.ico",
      favicon16: "favicon.ico",
      appleTouchIcon: "favicon.ico",
      maskIcon: "favicon.ico",
      msTileImage: "favicon.ico"
    }
  },
  configureWebpack: config => {
    let plugins = [];
    plugins.push(
      new CompressionWebpackPlugin({
        filename: "[path][base].gz",
        algorithm: "gzip",
        test: new RegExp(".(" + ["js", "css", "svg"].join("|") + ")$"),
        threshold: 10240,
        deleteOriginalAssets: false
      })
    );
    config.plugins = [...config.plugins, ...plugins];
    // 修改打包后js文件名，输出重构，打包编译后的文件名称  【模块名称.版本号.js】
    config.output.filename = `js/[name]_${version}.js?t=${TimeStamp}`;
    config.output.chunkFilename = `js/[name]_${version}.js?t=${TimeStamp}`;
  },
  chainWebpack(config) {
    //配置mini-css-extract-plugin，使其使用的公路径为publicPath: "/",使用webpack的publicPath
    isProd &&
      ["css", "less", "scss", "sass", "stylus"].forEach(fileType => {
        const rule = config.module.rule(fileType);
        ["vue-modules", "vue", "normal-modules", "normal"].forEach(type => {
          rule
            .oneOf(type)
            .use("extract-css-loader")
            .loader(require("mini-css-extract-plugin").loader)
            .tap(options => ({
              ...options,
              publicPath: IS_PROD || IS_DEV_PROD ? "/ext/magento/" : "/"
            }));
        });
      });

    //配置style-resource,给每个less文件和vue文件增加全局变量和mixin
    ["vue-modules", "vue", "normal-modules", "normal"]
      .reduce((rule, type) => {
        return rule
          .oneOf(type)
          .use("style-resource")
          .loader("style-resources-loader")
          .options({
            patterns: [
              path.resolve(__dirname, "./src/styles/mixins/index.less"),
              path.resolve(__dirname, "./src/styles/variable.less")
            ]
          })
          .end()
          .end();
      }, config.module.rule("less"))
      .end()
      .end()

      //TODO: It's a mess here , needs to be reorganized.
      .module.rule("html")
      .test(/(?<!src[\\/]html[\\/].*)\.html$/)
      .use("html-loader")
      .loader("html-loader")
      .options({
        interpolate: true,
        ...(isProd ? minify : null)
      })
      .end()
      .end()
      .end()
      /*
      对.ejs文件的处理,只对非src/html下的文件有效。
      引入后需要执行才能获得字符串
      如:
      import  template from "template.html"
      const html = template();
      引用静态资源有两种方式:
      1.在lodash插值中用require()引用，可以使用webpack alias
      2.通过html-loader对静态资源的链接进行转换，本质也是变为require(),但是无法使用webpack alias
      */
      .module.rule("ejs")
      .test(/(?<!src[\\/]html[\\/].*)\.ejs$/)
      //使用ejs-loader处理模板中的lodash插值
      .use("ejs-loader")
      .loader("ejs-loader")
      .end()
      .use("extract-loader")
      .loader("extract-loader")
      .end()
      //对模板进行压缩，处理文件中对静态资源的引用,不可使用webpack alias
      .use("html-loader")
      .loader("html-loader")
      .options({
        ...(isProd ? minify : null)
      });

    config.module
      .rule("pug")
      .test(/\.pug$/)
      .use("pug-html-loader")
      .loader("pug-html-loader")
      .end();
    //optimization优化
    isProd &&
      config.optimization
        .runtimeChunk("single")
        .splitChunks({
          minChunks: 2,
          minSize: 0,
          cacheGroups: {
            vendors: {
              name: "vendors",
              test: /[\\/]node_modules[\\/]/,
              priority: -10,
              chunks: "all"
            },
            common: {
              name: "common",
              test: /[\\/]src[\\/](?!documents)/,
              priority: -20,
              chunks: "all",
              reuseExistingChunk: true
            }
          }
        })
        .end();

    /*
    修改html-webpack-plugin配置项
    html-webpack-plugin默认使用lodash.template作为模板引擎
    * 在html-webpack-plugin的html模板中引用静态资源有一种方式:
      1.在lodash插值中用require()引用，可以使用webpack alias
   */
    isProd &&
      config.plugin(`html`).tap(options => {
        options[0].minify = minify;
        return options;
      });

    config.plugin("preload-font").use(require("@vue/preload-webpack-plugin"), [
      {
        rel: "preload",
        include: "allAssets",
        fileWhitelist: [/\.(woff2?|eot|ttf|otf)(\?.*)?$/],
        as: "font"
      }
    ]);

    config
      .plugin("html-webpack-externals-plugin")
      .use(HtmlWebpackExternalsPlugin, [
        {
          externals: externalsOptions
        }
      ]);

    isProd &&
      config
        .plugin("csp-html-webpack-plugin")
        .use(CspHtmlWebpackPlugin, [...cspOptions]);

    isProd &&
      config.plugin("optimize-css").tap(options => {
        options[0].cssnanoOptions.preset = [
          "default",
          {
            mergeLonghand: false,
            cssDeclarationSorter: false,
            reduceTransforms: false
          }
        ];
        return options;
      });
  }
};

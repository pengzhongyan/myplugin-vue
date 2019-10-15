let path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  lintOnSave: false,
  publicPath: "./",
  outputDir: "./dist",
  chainWebpack: config => {
    // 另外也可以新增一个 ~ 指向 packages
    config.resolve.alias.set("@views", resolve("src/views"));
    config.resolve.alias.set("@pages", resolve("src/pages"));
    config.resolve.alias.set("@filters", resolve("src/filters"));
    config.resolve.alias.set("@store", resolve("src/store"));
    config.resolve.alias.set("@mixins", resolve("src/mixins"));
    config.resolve.alias.set("@utils", resolve("src/utils"));
    config.resolve.alias.set("@stylus", resolve("src/stylus"));
    config.resolve.alias.set("@components", resolve("src/components"));
    config.resolve.alias.set("@assets", resolve("src/assets"));
    config.resolve.alias.set("~", path.resolve("packages"));

    // 把 packages，因为新增的文件默认是不被 webpack 处理的
    config.module
      .rule("js")
      .include.add(/packages/)
      .end()
      .use("babel")
      .loader("babel-loader")
      .tap(options => {
        // 修改它的选项...
        return options;
      });
  },
  css: {
    loaderOptions: {
      stylus: {
        preferPathResolver: "webpack",
        paths: [path.join(__dirname, "src/stylus")],
        import: ["global.styl"]
      }
    }
  },
  pages: {
    index: {
      // page 的入口
      entry: "src/main",
      // 模板来源
      template: "public/index.html",
      // 在 dist/index.html 的输出
      filename: "index.html",
      // 当使用 title 选项时，
      title: "插件"
    }
  }
};

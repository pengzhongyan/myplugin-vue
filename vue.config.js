let path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  lintOnSave: false,
  publicPath: "./",
  outputDir: "./dist",
  chainWebpack: config => {
    config.resolve.alias.set("@views", resolve("src/views"));
    config.resolve.alias.set("@pages", resolve("src/pages"));
    config.resolve.alias.set("@filters", resolve("src/filters"));
    config.resolve.alias.set("@scripts", resolve("scripts/api"));
    config.resolve.alias.set("@store", resolve("src/store"));
    config.resolve.alias.set("@mixins", resolve("src/mixins"));
    config.resolve.alias.set("@utils", resolve("src/utils"));
    config.resolve.alias.set("@stylus", resolve("src/stylus"));
    config.resolve.alias.set("@components", resolve("src/components"));
    config.resolve.alias.set("@data", resolve("src/data"));
    config.resolve.alias.set("@assets", resolve("src/assets"));
    config.resolve.alias.set("@api", resolve("src/api")); // 生成的接口
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

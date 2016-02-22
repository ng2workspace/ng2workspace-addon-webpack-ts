module.exports = function(options, workspace) {
  var config = workspace.get('webpack').webpackConfig;
  var srcDir = workspace.util.toAbsolute(workspace.config.dir_src);

  // replace entries with .js extension with .ts
  if(typeof config.entry === 'string') {
    config.entry = config.entry.replace(/\.js$/, '.ts');
  } else if(typeof config.entry === 'object') {
    Object.keys(config.entry).forEach(function(key) {
      if(config.entry[key].indexOf(srcDir) === 0) {
        config.entry[key] = config.entry[key].replace(/\.js$/, '.ts');
      }
    });
  }

  config.resolve.extensions.push('.ts', '.async.ts', '.tsx', '.async.tsx');

  config.module.loaders.push({
    test: /\.async\.tsx?$/,
    loaders: ['es6-promise-loader', 'ts-loader'],
    exclude: [/\.(spec|e2e)\.ts$/]
  }, {
    test: /\.tsx?$/,
    loader: 'ts-loader',
    exclude: [/\.(spec|e2e|async)\.ts$/]
  });

  config.ts = options.loader;
};
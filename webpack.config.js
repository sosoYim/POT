const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  // 번들 설정 진입점
  entry: {
    // 프로퍼티 키가 output의 [name]에 매칭
    app: './frontend/src/js/app.js',
    main: './frontend/src/js/event/main.js',
    appliedpot: './frontend/src/js/event/appliedpot.js',
    createboard: './frontend/src/js/event/createboard.js',
    createdpot: './frontend/src/js/event/createdpot.js',
    detailboard: './frontend/src/js/event/detailboard.js',
    manage: './frontend/src/js/event/manage.js',
    participantedpot: './frontend/src/js/event/participantedpot.js',
    setting: './frontend/src/js/event/setting.js',
    login: './frontend/src/js/event/login.js',
    register: './frontend/src/js/event/register.js',
  },
  // 번들링된 js 파일의 이름(filename)과 저장될 경로(path)를 지정
  output: {
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
    filename: 'js/[name].bundle.js',
  },
  optimization: {
    runtimeChunk: 'single',
  },
  plugins: [
    // 번들링된 JS 파일을 html 파일에 자동 추가해주는 플러그인
    new HtmlWebpackPlugin({
      template: './frontend/src/template/index.html',
      chunks: ['app', 'main'],
    }),
    new HtmlWebpackPlugin({
      filename: 'appliedpot.html',
      template: './frontend/src/template/appliedpot.html',
      chunks: ['app', 'appliedpot'],
    }),
    new HtmlWebpackPlugin({
      filename: 'createboard.html',
      template: './frontend/src/template/createboard.html',
      chunks: ['app', 'createboard'],
    }),
    new HtmlWebpackPlugin({
      filename: 'createdpot.html',
      template: './frontend/src/template/createdpot.html',
      chunks: ['app', 'createdpot'],
    }),
    new HtmlWebpackPlugin({
      filename: 'detailboard.html',
      template: './frontend/src/template/detailboard.html',
      chunks: ['app', 'detailboard'],
    }),
    new HtmlWebpackPlugin({
      filename: 'manage.html',
      template: './frontend/src/template/manage.html',
      chunks: ['app', 'manage'],
    }),
    new HtmlWebpackPlugin({
      filename: 'participantedpot.html',
      template: './frontend/src/template/participantedpot.html',
      chunks: ['app', 'participantedpot'],
    }),
    new HtmlWebpackPlugin({
      filename: 'setting.html',
      template: './frontend/src/template/setting.html',
      chunks: ['app', 'setting'],
    }),
    new HtmlWebpackPlugin({
      filename: 'login.html',
      template: './frontend/src/template/login.html',
      chunks: ['app', 'login'],
    }),
    new HtmlWebpackPlugin({
      filename: 'register.html',
      template: './frontend/src/template/register.html',
      chunks: ['app', 'register'],
    }),
    // css 결과물을 내보내기 위한 플러그인. 컴파일 + 번들링 CSS 파일이 저장될 경로와 이름 지정
    new MiniCssExtractPlugin({ filename: 'css/style.css' }),
    new CopyPlugin({
      patterns: [
        {
          from: path.join(__dirname, './frontend/src/images'),
          to: path.join(__dirname, './public/images'),
        },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, 'src/js')],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              [
                '@babel/plugin-transform-runtime',
                {
                  corejs: 3,
                  proposals: true,
                },
              ],
            ],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  devServer: {
    // 서버에 콘텐츠를 제공할 위치를 알려준다. 정적 파일을 제공하려는 경우에만 필요.
    static: {
      directory: path.join(__dirname, 'public'),
    },
    open: true,
    port: 5500,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
      },
    },
    // 별도의 API 백엔드 개발 서버가 있고 동일한 도메인에서 API 요청을 보내려는 경우 일부 URL을 프록시하는 것이 유용할 수 있다.
    // PORT 7000에는 api 서버가, PORT 3000에는 devServer가 실행중이기에 호스트와 포트를 명시하지 않으면 404에러가 발생한다.

    onListening(devServer) {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined');
      }

      const { port } = devServer.server.address();
      console.log('Listening on port:', port);
    },
  },
  // 소스 맵(Source Map)은 디버깅을 위해 번들링된 파일과 번들링되기 이전의 소스 파일을 연결해주는 파일이다.
  devtool: 'source-map',
  mode: 'development',
};

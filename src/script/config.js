//带带-测试环境
const config_dev = {
  ctxPath: 'https://test-play.daidaidj.com',
};
//带带-生产环境
const config_pro = {
  ctxPath: 'https://play.daidaidj.com',
};
let config = {};
//带带-生产环境
if (process.env.CLIENT_ENV === 'production') {
  config = config_pro;
  config.env = 'production';
}
//带带-测试环境
else {
  config = config_dev;
  config.env = 'development';
}


export default config;

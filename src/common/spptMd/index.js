const SPPTMDCONFIG = require("./sppt-mdmp-sdk-conf");
const spptMd = require("./sppt-mdmp-sdk.js");

spptMd.setPara({
  name: "spptMd",
  server_url: SPPTMDCONFIG.server_url,
  autoTrack: SPPTMDCONFIG.autoTrack,
  show_log: SPPTMDCONFIG.show_log,
});

// 初始化
const spptMdInit = async () => {
  spptMd.registerApp({
    app_name: SPPTMDCONFIG.app_name,
    page_url: ()=>{
      return spptMd.status.referrer ? spptMd.status.referrer : ''
    },
    source_url: ()=>{
      return spptMd.status.last_referrer ? spptMd.status.last_referrer : ''
    },
  });
  spptMd.init();
};
spptMdInit();

// 登录
const spptLogin = (spptUserId) => {
	if (!spptUserId) {
    console.log('没有登录用户ID');
		return
	}
	uni.setStorageSync('spptUserId', spptUserId);
	spptMd.login(spptUserId);
	spptMdInit();
}

// 退出
const spptLogout = () => {
	spptMd.logout(true);
	uni.removeStorageSync('spptMd');
	spptMdInit();
}

// 获取自定义事件数据
const spptTrackRow = (eventName, row) => {
  let setRow = {
    event_name: 'p_goodsClick',
    position: '楼层一',
    type: '工商财税',
    current_time: '2019-12-18 15：48：30',
    target_url: 'https://www.dgg.cn/goods-1910153845.html',
  };
  if (row) {
    setRow = row;
    for (const key in setRow) {
      // 转化数字类型
      if (key && key.length > 1 && key.split('_')[0] === 'n') {
        setRow[key] = setRow[key] ? Number(setRow[key]) : 0;
      }
    }
  }
  if (!eventName) {
    eventName = 'P_goodsClick';
  }
  spptMd.track(eventName, setRow);
};

spptMd.spptMdInit = spptMdInit;
spptMd.spptLogin = spptLogin;
spptMd.spptLogout = spptLogout;
spptMd.spptTrackRow = spptTrackRow;

export default spptMd;

var ctg1 = require("./category-1.js");
var ctg2 = require("./category-2.js");
var ctg3 = require("./category-3.js");
var details = {
	activity: {
		"name": "2020 上海信息消费节开幕式 暨数字新生代云峰汇",
		"time": "5月17日-5月18日",
		"address": "上海安沙国际会议中心E2馆 (外马路1353号)",
		"company": "上海市信息服务业行业协会、中国信息消费推进联盟、上海东方飞马企业服务有限公司"
	},
	category: [{
		"id": 1,
		"name": "三大产品",
		"subCategory": [{
			"id": 101,
			"name": "5G+",
		}, {
			"id": 102,
			"name": "智能网联汽车",
		}, {
			"id": 103,
			"name": "智能家电",
		}]
	}, {
		"id": 2,
		"name": "三大服务",
		"subCategory": [{
			"id": 201,
			"name": "在线云服务",
		}, {
			"id": 202,
			"name": "智慧康养服务",
		}, {
			"id": 203,
			"name": "在线文娱服务",
		}]
	}, {
		"id": 3,
		"name": "三大场景",
		"subCategory": [{
			"id": 301,
			"name": "在线教育",
		}, {
			"id": 302,
			"name": "在线文旅",
		}, {
			"id": 303,
			"name": "数字商业",
		}]
	}],
	list: [...ctg1.data, ...ctg2.data, ...ctg3.data]
}
module.exports = {
	details
}

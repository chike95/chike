# 数据转发

AXIOS 请求数据转发

```js
const { post } = require('axios');

const API_URL = 'http://xxx.xxx.xxx.xxx:10003/CIMAPI/api/v1';
const AUTH_USERNAME = 'autodata';
const AUTH_PASSWORD = 'Autodata123456';

// 获取token
async function getToken() {
	try {
		const response = await post(`${API_URL}/auth/login`, {
			username: AUTH_USERNAME,
			password: AUTH_PASSWORD,
		});
		// console.log(response.data.payload.token.accessToken);
		return response.data.payload.token.accessToken;
	} catch (error) { console.error('Error getting token:', error.message); }
}

async function pushData(data, token) { // push数据
	try {
		const headers = {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		};
		const response = await post(`${API_URL}/momitor/autodata`, data, { headers });
		console.log('数据推送成功，返回:', response.data);
	} catch (error) { console.error('数据推送失败:', error.message); }
}

async function pushDataToAPI(data) { // push数据到API接口
	try {
		const token = await getToken();
		console.log(token);
		await pushData(data, token);
	} catch (error) { console.error('Error:', error.message); }
}

module.exports = { pushDataToAPI: pushDataToAPI }
```
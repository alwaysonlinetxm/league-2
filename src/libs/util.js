import 'isomorphic-fetch';

export default {
	callApi: function(url, methed, data) {
		if (methed === 'GET') {
			return fetch(url).then(response => response.json());
		} else {
			return fetch(url, {
				methed,
				headers: {
					'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
				},
				credentials: 'include',
				body: this.serialize(data)
			}).then(response => response.json());
		}
	},

	serialize: function(obj) {
		const str = [];
		for (const p in obj) {
			if (obj.hasOwnProperty(p)) {
				const v = obj[p];
				str.push(typeof v === 'object' ?
					this.serialize(v, p) :
					`${encodeURIComponent(p)}=${encodeURIComponent(v)}`);
			}
		}
		return str.join('&');
	},
};

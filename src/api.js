import axios from 'axios';
import Ajv from 'ajv' 


class ApiEntity {
	constructor(baseUrl, schema) {
		if (baseUrl.slice(-1) === '/')
			baseUrl = baseUrl.slice(0, -1);

		this.baseUrl = baseUrl; 
		this.schema = schema; 
	}

	_onError(error) {
		console.log(error);
	}

	get(onFinish) {
		axios.get(this.baseUrl)
			.then((resp) => {
				var data = []

				for (var i in resp.data) {
					if (new Ajv().validate(this.schema, resp.data[i]))
						data.push(resp.data[i]);
					else {
						console.error(`Item ${i} is invalid (skiped)`);
						console.error(resp.data[i]);
					}
				}

				onFinish(data); 
			})
			.catch((error) => this._onError(error));
	}

	upd(id, data, onFinish) {
		axios.put(this.baseUrl + `/${id}`, data)
			.then((resp) => onFinish(resp))
			.catch((error) => this._onError(error));

	}

	del(id, onFinish) {
		axios.delete(this.baseUrl + `/${id}`)
			.then((resp) => onFinish(resp))
			.catch((error) => this._onError(error));
	}

	add(data, onFinish) {
		console.log('POST'); 
		axios.post(this.baseUrl, data)
			.then((resp) => onFinish(resp))
			.catch((error) => this._onError(error));
	}
}

export default class Api {
	constructor(baseUrl) {
		if (baseUrl.slice(-1) === '/')
			baseUrl = baseUrl.slice(0, -1);

		this.baseUrl = baseUrl;

		this.departments = new ApiEntity(this._urlFor('/departments'), {
			"properties": {
				"id": { 
					"type": "number", 
				},
				"name": {
					"type": "string"
				}
			}
		});

		this.employees = new ApiEntity(this._urlFor('/employees'), {
			"properties": {
				"id": { 
					"type": "number", 
				},
				"firstName": {
					"type": "string"
				},
				"lastName": {
					"type": "string"
				}, 
				"departmentId": {
					"type": "number"
				}
			}
		});
	}

	_urlFor(subUrl) {
		if (subUrl[0] !== '/')
			subUrl = '/' + subUrl; 

		return this.baseUrl + subUrl;
	}
} 

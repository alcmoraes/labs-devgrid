// @flow

import _ from 'lodash';

class Api {

    endpoint: string;
    headers: Object;

    constructor(){

        this.endpoint = '';

        this.headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

    }

    /**
     * 
     * @param {string} endpoint Sets the endpoint to fetch
     */
    setEndpoint(endpoint: string): void {
        this.endpoint = endpoint;
        return;
    }

    /**
     * 
     * @param {Object} headers The headers to set
     * @param {boolean} replace True if want to replace the current headers
     * @return {void}
     */
    setHeaders(headers: Object, replace?: boolean = false): void {
        this.headers = replace ? headers : _.merge(this.headers, headers);
        return;
    }
    
    /**
     * 
     * @param {string} url The url to fetch
     * @param {string} base Replaces the default endpoint
     * @returns {Promise} A promise with the data parsed as json
     */
    get(url: string, base?: ?string = null): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                let data = await fetch((base || this.endpoint) + url, {
                    method: 'GET',
                    headers: new Headers(this.headers),
                    mode: 'cors',
                    cache: 'default'
                });
                resolve(data.json());
            } catch (err) {
                reject(err);
            }
        });
    }
    
    /**
     * 
     * @param {string} url The url to fetch
     * @param {string} base Replaces the default endpoint
     * @returns {Promise} A promise with the data parsed as json
     */
    delete(url: string, base?: ?string = null): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                let data = await fetch((base || this.endpoint) + url, {
                    method: 'DELETE',
                    headers: new Headers(this.headers),
                    mode: 'cors',
                    cache: 'default'
                });
                resolve(data.json());
            } catch (err) {
                reject(err);
            }
        });
    }
    
    /**
     * 
     * @param {string} url The url to fetch
     * @param {Object} body The content to put
     * @param {string} base Replaces the default endpoint
     * @returns {Promise} A promise with the data parsed as json
     */
    put(url: string, body: Object, base?: ?string = null): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                let data = await fetch((base || this.endpoint) + url, {
                    method: 'PUT',
                    headers: new Headers(_.merge(_.clone(this.headers), { 'Content-Type': 'application/json' })),
                    body: JSON.stringify(body),
                    mode: 'cors',
                    cache: 'default'
                });
                resolve(data.json());
            } catch (err) {
                reject(err);
            }
        });
    }
    
    /**
     * 
     * @param {string} url The url to fetch
     * @param {Object} body The content to post
     * @param {string} base Replaces the default endpoint
     * @returns {Promise} A promise with the data parsed as json
     */
    post(url: string, body: Object, base?: ?string = null): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                let data = await fetch((base || this.endpoint) + url, {
                    method: 'POST',
                    headers: new Headers(_.merge(_.clone(this.headers), {'Content-Type': 'application/json'})),
                    body: JSON.stringify(body),
                    mode: 'cors',
                    cache: 'default'
                });
                resolve(data.json());
            } catch (err) {
                console.log(err);
                reject(err);
            }
        });
    }

}

export default new Api();

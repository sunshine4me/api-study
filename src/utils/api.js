

let headers = new Headers();
headers.append("Accept", "application/json");
headers.append("Content-Type", "application/json");

const fetchAsync = (url, method, body) => {

    const fetchConfig = {
        method: method.toUpperCase(),
        headers: headers,
        body: JSON.stringify(body),
        cache: 'default',
        credentials: 'include',
    }


    return fetch(url, fetchConfig).then((response) => {

        const contentType = response.headers.get("Content-Type");
        if (response.status >= 200 && response.status < 300) {
            if (contentType && contentType.indexOf("application/json") != -1)
                return response.json();
            else
                return response.text()
        } else {
            return response.text().then(data => {
                throw new Error(data);
            })
        }
    }).catch((error) => {
        throw error;
    });

}


const testCase = {
    get(id) {
        return fetchAsync("/testcase/" + id, "get");
    },
    getRoots() {
        return fetchAsync(`/testcase/`, "get");
    },
    getByParentId(parentId) {
        return fetchAsync(`/testcase/${parentId}/children`, "get");
    }
}

const account = {
    login(email) {
        return fetchAsync("/account/login", "post", { email })
    },
    islogin(){
        return fetchAsync("/account/islogin", "get")
    }

}


export {
    account,
    testCase
}
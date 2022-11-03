



export const client = async (
    { path, headers, method, body }: {
        path: string,
        headers?: { [key: string]: any },
        method?: ('GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'),
        body?: BodyInit | null | undefined
    }

): Promise<{ [key: string]: any } | string> => {


    const resp = await fetch(path, {
        method: method || 'GET',
        credentials: 'include',
        headers: headers || {},
        body
    })

    const contentType = resp.headers.get('content-type')
    let responsePayload: any;
    if (contentType && contentType.indexOf('application/json') !== -1) {
        responsePayload = await resp.json()
    } else {
        responsePayload = await resp.text()
    }

    if (resp.status > 304) {

        throw responsePayload;
    }
    return responsePayload
}
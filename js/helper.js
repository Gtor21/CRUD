export async function ajax(url, options = null) {
    try {
        let res = await fetch(url, options);
        if (!res.ok) throw { status: res.status, statusText: res.statusText };
        let data = await res.json();
        return data;
    } catch (err) {
        console.log(err);
        //return error(err);
    }
}
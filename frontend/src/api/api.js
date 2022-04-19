const API_URL = "https://localhost:4000";

export async function listaLogUlaza() {
    const response = await fetch(`${API_URL}/api/logs`);
    return response.json();
}

export async function kreirajLogUlaze(ulazi){
    const api_kljuc = entry.api_kljuc;
    delete entry.api_kljuc;
    const response = await fetch(`${API_URL}/api/logs`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "X-API-KEY": api_kljuc
        },
        body: JSON.stringify(ulazi),
    });

    let json;
    if(response.headers.get("content-type").includes("text/html")) {
        const poruka=await response.text();
        json = {
            poruka,
        };
    }
    else{
        json=await response.json();
    }
    if(response.ok){
        return json;
    }
     const error = new Error(json.poruka);
     error.response=json;
     throw error;

}
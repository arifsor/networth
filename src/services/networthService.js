const httpHost = "http://localhost:8080/v1";
const networthServic = {
    async calculateNetworth(request) {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        };
        const response=  await fetch(`${httpHost}/networth`, requestOptions);
        const data = response.json();
        return data;
    },
    async getNetworth(currencyIsoCode) {
        const response = await fetch(`${httpHost}/networth?currencyIsoCode=${currencyIsoCode}`);
        const data = response.json();
        return data;
    }
};

export default networthServic;
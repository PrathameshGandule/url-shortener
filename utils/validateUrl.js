async function urlValidation(urlToCheck){
    // try {
    //     const domain = new URL(urlToCheck).hostname;
    //     await dns.lookup(domain);
    // } catch {
    //     return "Domain not resolvable"
    // }

    try {
        const response = await fetch(urlToCheck, { method: "HEAD", timeout: 5000 });
        if (!response.ok) {
            return `HTTP status ${response.status}`;
        }
    } catch (headError) {
        try {
            const response = await fetch(urlToCheck, { method: "GET", timeout: 5000 });
            if (!response.ok) {
                return `HTTP status ${response.status}`;
            }
        } catch (getError) {
            return `URL not reachable: ${getError.message}`;
        }
    }

    return "URL is valid"
    
}

export { urlValidation };
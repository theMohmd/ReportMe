export const setCookie = (cname: string, cvalue: string) => {
    document.cookie = cname + "=" + cvalue + ";path=/";
};
export const getCookie = (cname: string) => {
    // Split all cookies into an array of key-value pairs
    const cookies = document.cookie.split(";").map((cookie) => cookie.trim());

    // Iterate over the array to find the cookie with the specified key
    for (const cookie of cookies) {
        const [cookieKey, cookieValue] = cookie.split("=");

        // If the key matches, return the corresponding value
        if (cookieKey === cname) {
            return decodeURIComponent(cookieValue);
        }
    }

    // If the key is not found, return null
    return null;
};
export const deleteCookie = (cname: string) => {
    const d = new Date();
    d.setTime(d.getTime());
    const expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + "" + ";" + expires + ";path=/";
};

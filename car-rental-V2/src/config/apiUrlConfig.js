const apiUrl = import.meta.env.VITE_API_URL;
const localUrl = import.meta.env.VITE_LOCAL_URL;

export const baseUrl = window.location.hostname === "localhost" ? localUrl : apiUrl;

export const apiKey = import.meta.env.VITE_PUBLIC_KEY;
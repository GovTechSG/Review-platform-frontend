let prefix = "";
if (process.env.NODE_ENV === 'production') {
    prefix = "https://review-api.gds-gov.tech";
}

export const API_URL_PREFIX = prefix;
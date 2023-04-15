export const URL_BASE = process.env.REACT_APP_API_URL || "";
export const URL_BASE_V1 = URL_BASE + "/v1";

export const URL_LOGIN = URL_BASE_V1 + "/login/";
export const URL_USER_INFO = URL_BASE_V1 + "/users/me";

export const URL_ROOMS = URL_BASE_V1 + "/rooms/";

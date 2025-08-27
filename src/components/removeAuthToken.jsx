import { setToken } from './auth-slice';

export function removeAuthToken(dispatch) {
  localStorage.removeItem("token");
  dispatch(setToken(null));
}

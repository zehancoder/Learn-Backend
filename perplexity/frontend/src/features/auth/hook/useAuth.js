import { useDispatch } from "react-redux";
import { register, login, getMe, logout } from "../services/auth.api.js";
import { setUserState, setError, setLoading } from "../toolkit/auth.slice.js";

export function useAuth() {
  const dispatch = useDispatch();
  // handle register user
  async function handleRegister({ email, password, username }) {
    try {
      dispatch(setLoading(true));
      const data = await register({ email, password, username });
    } catch (err) {
      dispatch(setError(err.response.data.message || "Something went wrong"));
    } finally {
      dispatch(setLoading(false));
    }
  }
  // handle login user
  async function handleLogin({ email, password }) {
    try {
      dispatch(setLoading(true));
      const data = await login({ email, password });
      console.log(data.user)
      dispatch(setUserState(data.user));
    } catch (error) {
      dispatch(setError(error.response.data.message || "Something went wrong"));
    } finally {
      dispatch(setLoading(false));
    }
  }
  // handle get current user
  async function handleGetMe() {
    try {
      dispatch(setLoading(true));
      const data = await getMe();
      dispatch(setUserState(data.user));
    } catch (error) {
      dispatch(setError(error.response.data.message || "Something went wrong"));
    } finally {
      dispatch(setLoading(false));
    }
  }
  // handle logout user
  async function handleLogout() {
    try {
      dispatch(setLoading(true));
      await logout();
      dispatch(setUserState(null));
    } catch (error) {
      dispatch(setError(error.response.data.message || "Something went wrong"));
    } finally {
      dispatch(setLoading(false));
    }
  }

  return {
    handleRegister,
    handleLogin,
    handleGetMe,
    handleLogout
  };
}

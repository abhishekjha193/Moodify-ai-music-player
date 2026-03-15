import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { login, register, getme, logout } from "../services/auth.api";
import { useEffect } from "react";

export const useauth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const { user, setUser, loading, setLoading } = context;

  async function handleRegister({ username, email, password }) {
    setLoading(true);
    const data = await register({ username, email, password });
    setUser(data.user);
    setLoading(false);
  }

  async function handleLogin({ email, password }) {
    setLoading(true);
    const data = await login({ email, password });
    setUser(data.user);
    setLoading(false);
  }

  async function handleGetMe() {
    setLoading(true);
    const data = await getme();
    setUser(data.user);
    setLoading(false);
  }

  async function handleLogout() {
    setLoading(true);
    await logout();
    setUser(null);
    setLoading(false);
  }

  useEffect(()=>{
  handleGetMe()
  },[])

  return { user, loading, handleRegister, handleLogin, handleGetMe, handleLogout };
};
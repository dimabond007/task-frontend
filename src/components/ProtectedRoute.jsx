import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUserContext } from "@/contexts/UserContext";

function ProtectedRoute({ children }) {
  const { token, getUser } = useUserContext();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      const user = await getUser(token);
      setUser(user);
      setLoading(false);
    }
    fetchUser();
  }, [token, getUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (token === null) {
    return <Navigate to="/auth/login" />;
  }

  return children;
}

export default ProtectedRoute;

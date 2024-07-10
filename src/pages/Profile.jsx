import { useState, useEffect } from "react";
import { useUserContext } from "../contexts/UserContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ProfilePage = () => {
  const { token, login, logout, getUser } = useUserContext();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser(token);
        setUser(userData);
        console.log("User fetched:", userData);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [getUser]);

  if (loading) {
    return <div className="container mx-auto p-4">{/* <Spinner /> */}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      {user ? (
        <>
          <div className="text-center m-4">
            <h1 className="text-4xl font-bold text-primary">My Profile</h1>
          </div>
          <Card className="profile p-4">
            <CardContent className="flex justify-between p-0 my-4">
              <div>
                <label className="block font-medium">Name:</label>
                <span className="block">
                  {user.firstname} {user.lastname}
                </span>
              </div>
              <div>
                <label className="block font-medium">Email:</label>
                <span className="block">{user.email}</span>
              </div>
              <div>
                <label className="block font-medium">Username:</label>
                <span className="block">{user.username}</span>
              </div>
            </CardContent>
            <Button onClick={logout} className="w-full">
              Logout
            </Button>
          </Card>
        </>
      ) : (
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Please log in</h1>
          <Button
            onClick={login}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Login
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;

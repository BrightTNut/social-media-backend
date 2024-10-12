import { useEffect, useState } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch("http://localhost:3000/students");
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          setError("Error fetching students");
        }
      } catch (error) {
        setError("Error fetching students");
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 m-0">
      <h1 className="text-center pt-9 text-pink-200 text-4xl italic">
        See All Users
      </h1>

      {/* Display error if any */}
      {error && (
        <p className="text-center text-red-500 text-lg font-bold">{error}</p>
      )}

      <div className="grid grid-cols-3 gap-y-2 p-6">
        {/* Map over users array and render each user's details */}
        {users.length > 0
          ? users.map((user) => (
              <div
                key={user._id}
                className="bg-white p-4 m-2 shadow-lg rounded-lg text-center"
              >
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p>{user.social}</p>
              </div>
            ))
          : !error && (
              <p className="text-center text-white text-lg font-bold">
                No users found
              </p>
            )}
      </div>
    </div>
  );
};

export default Users;

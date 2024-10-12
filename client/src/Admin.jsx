import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();
  const userlist = () => {
    navigate("/users");
  };
  return (
    <div className="flex bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500  items-center justify-center h-screen bg-blue-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-4/5 ">
        <form className="grid gap-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            // value={formData.name}
            // onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            // value={formData.password}
            // onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <button className="items-left" onClick={userlist}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Admin;

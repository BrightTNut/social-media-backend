import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Form() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",

    image: null,

    classes: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const imgChange = (e) => {
    const file = e.target.files[0];
    const validTypes = ["image/jpeg", "image/png", "image/gif"];
    if (file) {
      if (validTypes.includes(file.type)) {
        const imageUrl = URL.createObjectURL(file);
        setFormData({
          ...formData,
          image: imageUrl,
        });
      } else {
        setError("Please select a valid image (JPEG, PNG, GIF)");
      }
    }
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    // Create a new object excluding the image field
    // eslint-disable-next-line no-unused-vars
    const { image, ...dataToSend } = formData;

    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        // If the response is OK, show success message
        alert("Form submitted successfully");
        window.location.reload(); // Reload the page after successful submission
      } else {
        const errorData = await response.json();

        // Show the prompt message from the server response if the user already exists
        if (errorData.prompt) {
          alert(errorData.prompt); // Display the custom prompt ("User already exists")
        } else {
          alert(`Error submitting form: ${errorData.error || "Unknown error"}`);
        }
      }
    } catch (error) {
      alert("Error submitting form. Please try again later.");
      console.error("Submission error:", error);
    }
  };

  const Schoollist = () => {
    navigate("/admin");
  };
  return (
    <div className="flex bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 items-center justify-center h-screen bg-blue-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">
          User Submission Form
        </h1>
        <form onSubmit={handleOnSubmit} className="grid gap-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />

          <input
            type="url"
            name="social"
            placeholder="Social Media Handler"
            value={formData.social}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />

          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={imgChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {formData.image && (
            <div className="flex justify-center">
              <img
                src={formData.image}
                alt="Preview"
                width={100}
                height={100}
                className="border border-gray-300 rounded mt-2"
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
        <button
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 ml-0 m-6"
          onClick={Schoollist}
        >
          See All List
        </button>
      </div>
    </div>
  );
}

export default Form;

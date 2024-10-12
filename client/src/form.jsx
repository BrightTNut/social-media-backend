import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Form() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    social: "",
    image: null,
  });
  const [preview, setPreview] = useState(null); // State to hold the image preview
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Disable button during submission

  // Updated function to handle file input and set preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/png", "image/gif"];
      if (validTypes.includes(file.type)) {
        setFormData((prev) => ({
          ...prev,
          image: file, // Store the actual file in formData
        }));
        setPreview(URL.createObjectURL(file)); // Create a preview URL for the image
        setError(""); // Clear any previous errors
      } else {
        setError("Please select a valid image (JPEG, PNG, GIF)");
      }
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (!formData.image) {
      setError("Please upload an image");
      return;
    }

    setIsSubmitting(true); // Disable the submit button during submission

    const dataToSend = new FormData(); // Use FormData for file uploads
    dataToSend.append("file", formData.image); // Append the actual image file
    dataToSend.append("name", formData.name); // Append the name
    dataToSend.append("social", formData.social); // Append the social handle

    try {
      const response = await fetch("http://localhost:3000/upload", {
        method: "POST",
        body: dataToSend, // Use FormData directly in the body
      });

      if (response.ok) {
        // Clear the form and image preview on success
        setFormData({ name: "", social: "", image: null });
        setPreview(null);
        alert("Form submitted successfully!");
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
    } finally {
      setIsSubmitting(false); // Re-enable the submit button after submission
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
            required
          />

          <input
            type="url"
            name="social"
            placeholder="Social Media Handle"
            value={formData.social}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />

          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange} // Use the updated file change handler
            className="w-full p-2 border border-gray-300 rounded"
          />

          {/* Display image preview */}
          {preview && (
            <img
              src={preview}
              alt="Image Preview"
              className="w-full h-auto mt-4 rounded"
            />
          )}

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
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

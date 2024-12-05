"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";

const AddActor = () => {
  const [name, setName] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");
  const [age, setAge] = useState(0);
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null); // For previewing the image
  const router = useRouter();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result as string;
        setPictureUrl(base64Image); // Store the base64 string
        setImagePreview(base64Image); // Optional: Display the image preview
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  
    const actorData = {
      name,
      pictureUrl,
      age,
      bio,
    };
  
    console.log("Submitting actor data:", actorData);
  
    try {
      const response = await axios.post("/api/actors", actorData);
  
      console.log("Response Data:", response.data);
  
      if (response.status === 201) {
        router.push("/");
      } else {
        setError("Failed to add actor");
      }
    } catch (error: unknown) { // Use 'unknown' instead of 'any'
      console.error("Error in Axios POST:", error);
  
      // Type guard to handle AxiosError type
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.message ||
          "An error occurred while adding the actor."
        );
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Actor</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 text-gray-700  rounded-md"
            required
          />
        </div>

        <div>
          <label htmlFor="pictureUrl" className="block text-sm font-semibold">
            Picture
          </label>
          <input
            type="file"
            id="pictureUrl"
            name="pictureUrl"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
          {imagePreview && (
            <div className="mt-2">
              <Image
                height={100}
                width={100}
                src={imagePreview}
                alt="Selected image preview"
                className="w-32 h-32 object-cover border rounded-md"
              />
            </div>
          )}
        </div>

        <div>
          <label htmlFor="age" className="block text-sm font-semibold">
            Age
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            className="w-full p-2 border border-gray-300 text-gray-700 rounded-md"
            required
          />
        </div>

        <div>
          <label htmlFor="bio" className="block text-sm font-semibold">
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            placeholder="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full p-2 border border-gray-300 text-gray-700  rounded-md"
            rows={4}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? "Adding Actor..." : "Add Actor"}
        </button>
      </form>
    </div>
  );
};

export default AddActor;

"use client";
import React, { useState } from "react";
import axios, { AxiosProgressEvent } from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UploadCloud, CheckCircle, Home } from "lucide-react";

function VideoUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("No file chosen");

  const router = useRouter();
  const MAX_FILE_SIZE = 120 * 1024 * 1024; // 100MB

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    setFileName(selectedFile ? selectedFile.name : "No file chosen");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!file) return;

    setError("");
    setSuccessMessage("");
    setUploadProgress(0);

    if (file.size > MAX_FILE_SIZE) {
      setError("File size exceeds 100MB limit.");
      return;
    }
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("originalSize", file.size.toString());

    const onUploadProgress = (progressEvent: AxiosProgressEvent) => {
      if (progressEvent.total) {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setUploadProgress(percentCompleted);
      }
    };

    try {
      const response = await axios.post("/api/video-upload", formData, {
        onUploadProgress,
      });
      setSuccessMessage("Video uploaded successfully!");
      setTitle("");
      setDescription("");
      setFile(null);
      setFileName("No file chosen");
    } catch (error) {
      console.error(error);
      setError("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-950 text-gray-100 p-4 sm:p-8 flex items-center justify-center">
      <div className="w-full max-w-2xl">
        <div className="flex items-center space-x-3 mb-8">
          <UploadCloud className="w-8 h-8 text-indigo-400" />
          <h1 className="text-3xl font-bold tracking-wide">Upload Video</h1>
        </div>

        <div className="bg-gray-900 p-8 rounded-2xl shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-400 mb-2"
              >
                Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="block w-full bg-gray-800 border-gray-700 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                placeholder="e.g., My Awesome Vacation"
                required
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-400 mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="block w-full bg-gray-800 border-gray-700 rounded-lg py-3 px-4 h-28 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                placeholder="A short description of your video..."
              />
            </div>

            <div>
              <label
                htmlFor="video-file"
                className="block text-sm font-medium text-gray-400 mb-2"
              >
                Video File (Max 50MB)
              </label>
              <div className="flex items-center">
                <label
                  htmlFor="video-file"
                  className="cursor-pointer bg-indigo-600 text-white hover:bg-indigo-700 font-semibold py-2 px-4 rounded-l-lg transition"
                >
                  Choose File
                </label>
                <span className="flex-1 p-2 bg-gray-800 text-gray-400 text-sm rounded-r-lg truncate">
                  {fileName}
                </span>
                <input
                  id="video-file"
                  type="file"
                  accept="video/*"
                  onChange={handleFileChange}
                  className="hidden"
                  required
                />
              </div>
            </div>

            {!isUploading && (
              <button
                type="submit"
                className="w-full flex justify-center items-center gap-2 bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-colors duration-300"
                disabled={!file || !title}
              >
                Upload Video
              </button>
            )}

            {isUploading && (
              <div className="w-full space-y-2">
                <p className="text-sm text-indigo-400 text-center">
                  Uploading...
                </p>
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <div
                    className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}
          </form>

          {successMessage && (
            <div className="mt-6 text-center">
              <div className="flex items-center justify-center gap-2 text-green-400 font-medium p-3 bg-green-500/10 rounded-lg">
                <CheckCircle size={20} />
                <p>{successMessage}</p>
              </div>
              <Link href="/home">
                <button className="mt-4 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors">
                  <Home size={18} />
                  Go to Home
                </button>
              </Link>
            </div>
          )}
          {error && (
            <div className="mt-6 text-red-400 font-medium p-3 bg-red-500/10 rounded-lg">
              <p>{error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default VideoUpload;

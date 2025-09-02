"use client";
import React, { useState, useEffect, useRef } from "react";
import { CldImage } from "next-cloudinary";
import { Image as ImageIcon, Download, Sparkles } from "lucide-react";

const socialFormats = {
  "Instagram Square (1:1)": { width: 1080, height: 1080, aspectRatio: "1:1" },
  "Instagram Portrait (4:5)": { width: 1080, height: 1350, aspectRatio: "4:5" },
  "X Post (16:9)": { width: 1200, height: 675, aspectRatio: "16:9" },
  "X Header (3:1)": { width: 1500, height: 500, aspectRatio: "3:1" },
  "Meta Cover (205:78)": { width: 820, height: 312, aspectRatio: "205:78" },
};
type SocialFormat = keyof typeof socialFormats;

export default function SocialShare() {
  const [file, setFile] = useState<File | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<SocialFormat>(
    "Instagram Square (1:1)"
  );
  const [isUploading, setIsUploading] = useState(false);
  const [isTransforming, setIsTransforming] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (uploadedImage) setIsTransforming(true);
  }, [selectedFormat, uploadedImage]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;
    setFile(selectedFile);
    handleFileUpload(selectedFile);
  };

  const handleFileUpload = async (fileToUpload: File) => {
    setIsUploading(true);
    setUploadedImage(null); // Reset previous image
    const formData = new FormData();
    formData.append("file", fileToUpload);

    try {
      const response = await fetch("/api/image-upload", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("Failed to upload image");
      const data = await response.json();
      setUploadedImage(data.publicId);
    } catch (error) {
      console.log(error);
      alert("Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDownload = () => {
    if (!imageRef.current) return;
    fetch(imageRef.current.src)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${selectedFormat
          .replace(/\s+/g, "_")
          .toLowerCase()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      });
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-950 text-gray-100 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center space-x-3 mb-8">
          <Sparkles className="w-8 h-8 text-indigo-400" />
          <h1 className="text-3xl font-bold tracking-wide">
            Social Media Image Creator
          </h1>
        </div>

        <div className="bg-gray-900 rounded-2xl shadow-2xl p-8 space-y-8">
          {/* Upload Section */}
          <div>
            <label
              htmlFor="image-upload"
              className="block text-sm font-medium text-gray-400 mb-2"
            >
              Upload an image file
            </label>
            <label
              htmlFor="image-upload"
              className="w-full flex items-center gap-4 bg-gray-800 border-gray-700 rounded-lg py-3 px-4 cursor-pointer hover:bg-gray-700 transition"
            >
              <span className="flex items-center justify-center gap-2 bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg text-sm">
                <ImageIcon size={16} /> Choose Image
              </span>
              <span className="text-gray-400 text-sm truncate">
                {file ? file.name : "No file chosen"}
              </span>
            </label>
            <input
              id="image-upload"
              type="file"
              onChange={handleFileChange}
              className="hidden"
            />
            {isUploading && (
              <div className="mt-4">
                <p className="text-sm text-indigo-400 mb-2">Uploading...</p>
                <div className="w-full bg-gray-700 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-indigo-600 h-2.5 rounded-full w-full animate-pulse"></div>
                </div>
              </div>
            )}
          </div>

          {/* Format + Preview */}
          {uploadedImage && (
            <div className="border-t border-gray-800 pt-8 space-y-6">
              <div>
                <label
                  htmlFor="format-select"
                  className="text-lg font-semibold text-gray-300 mb-2 block"
                >
                  Choose Social Media Format
                </label>
                <select
                  id="format-select"
                  className="w-full bg-gray-800 border-gray-700 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                  value={selectedFormat}
                  onChange={(e) =>
                    setSelectedFormat(e.target.value as SocialFormat)
                  }
                >
                  {Object.keys(socialFormats).map((format) => (
                    <option key={format} value={format} className="bg-gray-800">
                      {format}
                    </option>
                  ))}
                </select>
              </div>
              <div className="relative bg-black/20 rounded-lg shadow-inner p-4 min-h-[200px]">
                <h3 className="text-center text-lg font-semibold text-gray-400 mb-3">
                  Preview
                </h3>
                <div className="flex justify-center">
                  {isTransforming && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-900/70 rounded-lg z-10">
                      <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                  <CldImage
                    width={socialFormats[selectedFormat].width}
                    height={socialFormats[selectedFormat].height}
                    src={uploadedImage}
                    sizes="100vw"
                    alt="Transformed image"
                    crop="fill"
                    aspectRatio={socialFormats[selectedFormat].aspectRatio}
                    gravity="auto"
                    ref={imageRef}
                    className="rounded-lg shadow-md"
                    onLoad={() => setIsTransforming(false)}
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-colors"
                  onClick={handleDownload}
                  disabled={isTransforming}
                >
                  <Download size={18} />
                  Download
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

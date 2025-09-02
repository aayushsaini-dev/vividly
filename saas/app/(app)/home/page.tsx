"use client";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import VideoCard from "@/components/VideoCard";
import { Video } from "@prisma/client";
import { useAuth } from "@clerk/nextjs"; // Import useAuth to check login status
import { useRouter } from "next/navigation"; // Import useRouter to handle redirects

function Home() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { userId } = useAuth(); // Get the current user's ID (will be null if not logged in)
  const router = useRouter(); // Get the router to perform redirects

  const fetchVideos = useCallback(async () => {
    try {
      const response = await axios.get("/api/videos");
      if (Array.isArray(response.data)) {
        setVideos(response.data);
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch videos");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  const handleDownload = useCallback(
    async (url: string | null, title: string) => {
      // --- PROTECTED ACTION ---
      // If there is no signed-in user, redirect to the sign-in page.
      if (!userId) {
        router.push("/sign-in");
        return; // Stop the function before the download starts
      }

      if (!url) return;
      try {
        const response = await fetch(url);
        if (!response.ok)
          throw new Error(`Failed to fetch video: ${response.status}`);
        const blob = await response.blob();
        const objectUrl = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = objectUrl;
        link.download = `${title || "video"}.mp4`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(objectUrl);
      } catch (err) {
        console.error("Download failed:", err);
      }
    },
    [userId, router] // Add userId and router as dependencies for the callback
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-gray-950">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-950 text-gray-100 p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold tracking-wide flex items-center space-x-2">
          <span role="img" aria-label="clapperboard">
            🎬
          </span>
          <span>Video Library</span>
        </h1>
      </div>
      {error && (
        <div className="mb-6 rounded-lg bg-red-500/20 p-4 text-red-300 border border-red-700">
          {error}
        </div>
      )}
      {videos.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="text-2xl font-semibold text-gray-400 mb-2">
            No videos available
          </div>
          <p className="text-gray-500">
            Check back later or upload your first video
          </p>
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              onDownload={() => {
                if (video.videoUrl) {
                  handleDownload(video.videoUrl, video.title);
                }
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;

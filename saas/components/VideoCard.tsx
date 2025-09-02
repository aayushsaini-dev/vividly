"use client";
import React, { useCallback } from "react";
import { getCldImageUrl } from "next-cloudinary";
import { Download, Clock, FileDown, FileUp } from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { filesize } from "filesize";
import { Video } from "@prisma/client";

dayjs.extend(relativeTime);

// Define props with a simplified onDownload signature
interface VideoCardProps {
  video: Video;
  onDownload: () => void;
}

// Type the component directly instead of using React.FC for better type inference
const VideoCard = ({ video, onDownload }: VideoCardProps) => {
  const getThumbnailUrl = useCallback((publicId: string) => {
    return getCldImageUrl({
      src: publicId,
      width: 400,
      height: 225,
      crop: "fill",
      gravity: "auto",
      format: "jpg",
      quality: "auto",
      assetType: "video",
    });
  }, []);

  const formatSize = useCallback((size: number) => {
    return filesize(size);
  }, []);

  const formatDuration = useCallback((seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.round(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  }, []);

  const compressionPercentage = Math.round(
    (1 - Number(video.compressedSize) / Number(video.originalSize)) * 100
  );

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <figure className="aspect-video relative bg-gray-200">
        <img
          src={getThumbnailUrl(video.publicId)}
          alt={video.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
          <Clock size={14} />
          {formatDuration(video.duration)}
        </div>
      </figure>

      <div className="p-4 space-y-3">
        <h2 className="text-lg font-semibold line-clamp-1 text-gray-900">
          {video.title}
        </h2>
        <p className="text-sm text-gray-700 line-clamp-2">
          {video.description}
        </p>
        <p className="text-xs text-gray-600">
          Uploaded {dayjs(video.createdAt).fromNow()}
        </p>
        <div className="grid grid-cols-2 gap-4 text-sm mt-2">
          <div className="flex items-center gap-2">
            <FileUp size={16} className="text-blue-600" />
            <div>
              <div className="font-medium text-gray-900">Original</div>
              <div className="text-gray-600">
                {formatSize(Number(video.originalSize))}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <FileDown size={16} className="text-green-600" />
            <div>
              <div className="font-medium text-gray-900">Compressed</div>
              <div className="text-gray-600">
                {formatSize(Number(video.compressedSize))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
          <div className="text-sm font-medium text-gray-800">
            Compression:{" "}
            <span className="text-blue-600 font-bold">
              {compressionPercentage}%
            </span>
          </div>
          <button
            className="flex items-center justify-center gap-1 rounded-lg bg-blue-600 text-white px-3 py-1.5 text-sm hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
            onClick={onDownload}
            disabled={!video.videoUrl}
          >
            <Download size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;

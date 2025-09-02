export interface Video {
  id: string;
  title: string;
  description: string | null;
  publicId: string;
  videoUrl: string | null; // ✅ add this
  createdAt: Date;
  updatedAt: Date;
  duration: number;
  compressedSize: number;
  originalSize: number;
}

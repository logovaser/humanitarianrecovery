import { uploadToR2 } from "@/lib/gallery/r2";

const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

export async function saveGalleryUpload(file: File, albumSlug: string) {
  if (!allowedTypes.has(file.type)) {
    throw new Error("Only JPEG, PNG, WebP, and GIF images are allowed");
  }

  if (file.size > 10 * 1024 * 1024) {
    throw new Error("Image must be smaller than 10 MB");
  }

  const ext = file.type.split("/")[1]?.replace("jpeg", "jpg") ?? "jpg";
  const buffer = Buffer.from(await file.arrayBuffer());

  return uploadToR2(buffer, file.type, ext, albumSlug);
}

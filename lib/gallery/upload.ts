import { mkdir, writeFile } from "fs/promises";
import { randomUUID } from "crypto";
import path from "path";

const uploadDir = path.join(process.cwd(), "public", "uploads", "gallery");
const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

export async function saveGalleryUpload(file: File) {
  if (!allowedTypes.has(file.type)) {
    throw new Error("Only JPEG, PNG, WebP, and GIF images are allowed");
  }

  const maxSize = 10 * 1024 * 1024;
  if (file.size > maxSize) {
    throw new Error("Image must be smaller than 10 MB");
  }

  const extension = file.type.split("/")[1]?.replace("jpeg", "jpg") ?? "jpg";
  const filename = `${randomUUID()}.${extension}`;

  await mkdir(uploadDir, { recursive: true });
  const bytes = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(uploadDir, filename), bytes);

  return `/uploads/gallery/${filename}`;
}

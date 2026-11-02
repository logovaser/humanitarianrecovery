import {
  ACCEPTED_IMAGE_TYPES,
  ACCEPTED_IMAGE_TYPES_ERROR,
  MAX_UPLOAD_BYTES,
  MAX_UPLOAD_MB,
} from "@/lib/gallery/limits";
import { uploadToR2 } from "@/lib/gallery/r2";

export async function saveGalleryUpload(file: File, albumSlug: string) {
  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    throw new Error(ACCEPTED_IMAGE_TYPES_ERROR);
  }

  if (file.size > MAX_UPLOAD_BYTES) {
    throw new Error(`Image must be smaller than ${MAX_UPLOAD_MB} MB`);
  }

  const ext = file.type.split("/")[1]?.replace("jpeg", "jpg") ?? "jpg";
  const buffer = Buffer.from(await file.arrayBuffer());

  return uploadToR2(buffer, file.type, ext, albumSlug);
}

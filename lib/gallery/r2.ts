import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const client = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

const bucket = process.env.R2_BUCKET_NAME!;
const publicUrl = (process.env.R2_PUBLIC_URL ?? "").replace(/\/$/, "");

export async function uploadToR2WithPrefix(
  buffer: Buffer,
  mimeType: string,
  ext: string,
  prefix: string,
) {
  const { randomUUID } = await import("crypto");
  const key = `${prefix}/${randomUUID()}.${ext}`;
  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: buffer,
      ContentType: mimeType,
    }),
  );
  return `${publicUrl}/${key}`;
}

export async function uploadToR2(buffer: Buffer, mimeType: string, ext: string, albumSlug: string) {
  const { randomUUID } = await import("crypto");
  const key = `gallery/${albumSlug}/${randomUUID()}.${ext}`;

  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: buffer,
      ContentType: mimeType,
    }),
  );

  return `${publicUrl}/${key}`;
}

export async function deleteFromR2(src: string) {
  const prefix = `${publicUrl}/`;
  if (!src.startsWith(prefix)) return;
  const key = src.slice(prefix.length);

  try {
    await client.send(new DeleteObjectCommand({ Bucket: bucket, Key: key }));
  } catch {
    // Object may already be deleted.
  }
}

export function isR2Url(src: string) {
  return publicUrl.length > 0 && src.startsWith(`${publicUrl}/`);
}

export async function readJsonFromR2<T>(key: string, fallback: T): Promise<T> {
  try {
    const res = await client.send(new GetObjectCommand({ Bucket: bucket, Key: key }));
    const body = await res.Body?.transformToString("utf-8");
    if (!body) return fallback;
    return JSON.parse(body) as T;
  } catch {
    return fallback;
  }
}

export async function writeJsonToR2(key: string, data: unknown): Promise<void> {
  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: JSON.stringify(data, null, 2),
      ContentType: "application/json",
    }),
  );
}

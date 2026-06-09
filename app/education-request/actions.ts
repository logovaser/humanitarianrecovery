"use server";

const FORM_ID = process.env.GOOGLE_FORM_ID;
const ENTRY_ORGANIZATION = process.env.GOOGLE_FORM_ENTRY_ORGANIZATION;
const ENTRY_PURPOSE = process.env.GOOGLE_FORM_ENTRY_PURPOSE;
const ENTRY_COOPERATION_TYPE = process.env.GOOGLE_FORM_ENTRY_COOPERATION_TYPE;

export async function submitEducationRequestAction(formData: FormData) {
  const organization = (formData.get("organization") as string | null)?.trim();
  const purpose = (formData.get("purpose") as string | null)?.trim();
  const cooperationType = formData.get("cooperationType") as string | null;

  if (!organization || !purpose || !cooperationType) {
    throw new Error("All fields are required");
  }

  if (!FORM_ID || !ENTRY_ORGANIZATION || !ENTRY_PURPOSE || !ENTRY_COOPERATION_TYPE) {
    throw new Error("Google Form is not configured");
  }

  const cooperationTypeCapitalized =
    cooperationType.charAt(0).toUpperCase() + cooperationType.slice(1);

  const body = new URLSearchParams({
    [ENTRY_ORGANIZATION]: organization,
    [ENTRY_PURPOSE]: purpose,
    [ENTRY_COOPERATION_TYPE]: cooperationTypeCapitalized,
  });

  const res = await fetch(
    `https://docs.google.com/forms/d/e/${FORM_ID}/formResponse`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
      redirect: "manual",
    },
  );

  // 0 = opaque redirect (success, Google redirects to confirmation page)
  // 200 = success with confirmation HTML
  // 400 = bad request (wrong entry IDs or form ID)
  console.log("[education-request] status:", res.status, "| body:", body.toString());

  if (res.status !== 0 && res.status >= 400) {
    throw new Error(`Google Forms submission failed (${res.status}). Check entry IDs in .env.local.`);
  }
}

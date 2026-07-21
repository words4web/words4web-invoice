/** Fetch logo from public assets and convert to base64 for offline iframe printing */
export async function getLogoBase64(
  path: string = "/logo.png",
): Promise<string> {
  const resp = await fetch(path);
  const blob = await resp.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.readAsDataURL(blob);
  });
}

/** Fetch signature from public assets and convert to base64 for offline iframe printing */
export async function getSignatureBase64(): Promise<string> {
  const resp = await fetch("/deepali.sign.jpeg");
  const blob = await resp.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.readAsDataURL(blob);
  });
}

/** Fetch stamp from public assets and convert to base64 for offline iframe printing */
export async function getStampBase64(): Promise<string> {
  const resp = await fetch("/stamp.png");
  const blob = await resp.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.readAsDataURL(blob);
  });
}

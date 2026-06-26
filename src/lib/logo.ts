/** Fetch logo from public assets and convert to base64 for offline iframe printing */
export async function getLogoBase64(): Promise<string> {
  const resp = await fetch("/logo.png");
  const blob = await resp.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.readAsDataURL(blob);
  });
}

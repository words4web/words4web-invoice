/**
 * printHtml — injects an HTML string into a hidden iframe and triggers the
 * browser's native PDF print dialog. No server, no Puppeteer required.
 *
 * Based on: new uk client/implementation_plan.md, Component 5
 */
export function printHtml(html: string): void {
  const match = html.match(/<title>([^<]+)<\/title>/i);
  const tempTitle = match ? match[1] : "";
  const originalTitle = document.title;

  const iframe = document.createElement("iframe");
  Object.assign(iframe.style, {
    position: "fixed",
    top: "0",
    left: "0",
    width: "0",
    height: "0",
    border: "0",
    visibility: "hidden",
  });
  document.body.appendChild(iframe);

  const doc = iframe.contentWindow!.document;
  doc.open();
  doc.write(html);
  doc.close();

  iframe.onload = () => {
    try {
      if (tempTitle) {
        document.title = tempTitle;
      }
      iframe.contentWindow!.focus();
      iframe.contentWindow!.print();
    } finally {
      if (tempTitle) {
        document.title = originalTitle;
      }
      setTimeout(() => {
        if (document.body.contains(iframe)) {
          document.body.removeChild(iframe);
        }
      }, 3000);
    }
  };
}

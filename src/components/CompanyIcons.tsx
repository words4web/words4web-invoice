// Raw SVG strings for use in dynamic iframe HTML compilation
export const PIN_SVG_STR = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="display: block;"><circle cx="12" cy="12" r="11" fill="black" stroke="black" stroke-width="1"/><path d="M12 6C9.5 6 7.5 8 7.5 10.5C7.5 13.8 12 18 12 18C12 18 16.5 13.8 16.5 10.5C16.5 8 14.5 6 12 6ZM12 12C11.17 12 10.5 11.33 10.5 10.5C10.5 9.67 11.17 9 12 9C12.83 9 13.5 9.67 13.5 10.5C13.5 11.33 12.83 12 12 12Z" fill="white"/></svg>`;

export const PHONE_SVG_STR = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="display: block;"><circle cx="12" cy="12" r="11" fill="black" stroke="black" stroke-width="1"/><path d="M15.2 12.5C14.5 12.5 13.9 12.3 13.4 12.1C13.2 12 13 12.1 12.8 12.3L11.8 13.5C10.2 12.6 9 11.4 8.1 9.8L9.3 8.8C9.5 8.6 9.6 8.4 9.5 8.2C9.3 7.7 9.1 7.1 9.1 6.4C9.1 6.1 8.9 5.8 8.6 5.8H7C6.7 5.8 6.4 6.1 6.4 6.4C6.4 11.3 10.3 15.2 15.2 15.2C15.5 15.2 15.8 14.9 15.8 14.6V13C15.8 12.7 15.5 12.5 15.2 12.5Z" fill="white"/></svg>`;

export const EMAIL_SVG_STR = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="display: block;"><circle cx="12" cy="12" r="11" fill="black" stroke="black" stroke-width="1"/><path d="M16.5 8.5H7.5C6.9 8.5 6.5 8.9 6.5 9.5V14.5C6.5 15.1 6.9 15.5 7.5 15.5H16.5C17.1 15.5 17.5 15.1 17.5 14.5V9.5C17.5 8.9 17.1 8.5 16.5 8.5ZM16 10.1L12 12.5L8 10.1V9.5L12 11.9L16 9.5V10.1Z" fill="white"/></svg>`;

export const WEBSITE_SVG_STR = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="display: block;"><circle cx="12" cy="12" r="11" fill="black" stroke="black" stroke-width="1"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" fill="white"/></svg>`;

// React Element Wrappers for use in live preview pages
export function PinIcon() {
  return <div dangerouslySetInnerHTML={{ __html: PIN_SVG_STR }} />;
}

export function PhoneIcon() {
  return <div dangerouslySetInnerHTML={{ __html: PHONE_SVG_STR }} />;
}

export function EmailIcon() {
  return <div dangerouslySetInnerHTML={{ __html: EMAIL_SVG_STR }} />;
}

export function WebsiteIcon() {
  return <div dangerouslySetInnerHTML={{ __html: WEBSITE_SVG_STR }} />;
}

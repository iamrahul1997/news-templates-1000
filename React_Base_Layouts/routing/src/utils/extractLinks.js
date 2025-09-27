// export function extractAllLinkText(htmlString) {
//   if (!htmlString) return "No links available";
//   const div = document.createElement("div");
//   div.innerHTML = htmlString;
//   const aTags = div.querySelectorAll("a");
//   if (!aTags.length) return "No links available";
//   return Array.from(aTags)
//     .map((a) => a.textContent)
//     .join(", ");
// }

export function extractAllLinkText(htmlString = "") {
  if (!htmlString) return "";
  const div = document.createElement("div");
  div.innerHTML = htmlString;
  const links = div.querySelectorAll("a");
  return Array.from(links)
    .map((link) => link.textContent)
    .join(", ");
}

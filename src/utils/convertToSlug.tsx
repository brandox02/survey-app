export default function convertToSlug(text: string) {
   return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/[\s\W-]+/g, '-');
}
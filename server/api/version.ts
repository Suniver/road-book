export default defineEventHandler(async (event) => {
  return { version: process.env.NEXT_PUBLIC_APP_VERSION };
});

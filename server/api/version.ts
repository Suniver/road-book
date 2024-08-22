export default defineEventHandler(async (event) => {
  return { version: process.env.APP_VERSION };
});

module.exports = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/login",
        permanent: true,
      },
    ];
  },
  env: {
    BASE_URL: process.env.BASE_URL,
  },
};

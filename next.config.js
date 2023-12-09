module.exports = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/student",
        permanent: true,
      },
    ];
  },
  env: {
    BASE_URL: process.env.BASE_URL,
  },
};

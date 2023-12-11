module.exports = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/student",
        permanent: true,
      },
      {
        source: "/recruiter",
        destination: "/recruiter/jobs",
        permanent: true,
      },
      {
        source: "/advisor",
        destination: "/advisor/jobs",
        permanent: true,
      },
    ];
  },
  env: {
    BASE_URL: process.env.BASE_URL,
  },
};

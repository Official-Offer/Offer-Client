module.exports = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/login",
        permanent: true,
      },
      {
        source: "/student/jobs",
        destination: "/student/jobs/0",
        permanent: false,
      },
    ]
  },
}
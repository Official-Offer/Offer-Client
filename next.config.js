module.exports = {
  async redirects() {
    return [
      {
        source: "/student/jobs",
        destination: "/student/jobs/0",
        permanent: false,
      },
    ]
  },
}
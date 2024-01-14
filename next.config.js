const { getCookie } = require("cookies-next");

module.exports = {
  // i18n: {
  //   // Support vietnamese and english
  //   locales: ['vi-VN', 'en-US', 'nl-NL', 'fr'],
  //   // This is the default locale you want to be used when visiting
  //   // a non-locale prefixed path e.g. `/hello`
  //   defaultLocale:  'en-US',
  //   // This is a list of locale domains and the default locale they
  //   // should handle (these are only required when setting up domain routing)
  //   // Note: subdomains must be included in the domain value to be matched e.g. "fr.example.com".
  //   domains: [
  //     // VN domain
  //     {
  //       domain: 'example.vn',
  //       defaultLocale: 'vi-VN',
  //     },
  //     {
  //       domain: 'example.com',
  //       defaultLocale: 'en-US',
  //     },
  //     {
  //       domain: 'example.nl',
  //       defaultLocale: 'nl-NL',
  //     },
  //     {
  //       domain: 'example.fr',
  //       defaultLocale: 'fr',
  //       // an optional http field can also be used to test
  //       // locale domains locally with http instead of https
  //       http: true,
  //     },
  //   ],
  // },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'official-offer.s3.amazonaws.com',
        port: '',
        pathname: '/**/*',
      }
    ]
  },
  async redirects() {
    return [
      {
        source: "/",
        // redirect to /{role} based on user role
        destination: getCookie("role") ? `/${getCookie("role")}/profile` : "/student",
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

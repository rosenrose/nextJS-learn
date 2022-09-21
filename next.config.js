const API_KEY = process.env.API_KEY;
// console.log(process.env);

module.exports = {
  reactStrictMode: true,
  basePath: "/nextJS-learn",
  assetPrefix: "/nextJS-learn",
  // images: {
  //   domains: ["i.ytimg.com"],
  // },
  env: {
    API_KEY,
    basePath: "/nextJS-learn",
  },
  async redirects() {
    return [
      {
        source: "/old/:path*",
        destination: "/new/:path*",
        permanent: false,
      },
      // {
      //   source: "/api/playlist/:params",
      //   destination: `https://www.googleapis.com/youtube/v3/playlistItems?key=${API_KEY}${encodeURIComponent(
      //     "&"
      //   )}:params`,
      //   permanent: false,
      // },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/api/playlist/:params",
        destination: `https://www.googleapis.com/youtube/v3/playlistItems?key=${API_KEY}${encodeURIComponent(
          "&"
        )}:params`,
      },
      {
        source: "/api/video/:id",
        destination: `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&id=:id&part=snippet,contentDetails`,
      },
    ];
  },
};

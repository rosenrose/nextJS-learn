import { useState, useEffect } from "react";
import Link from "next/link";
// import Image from "next/image";
import { useRouter } from "next/router";
import Seo from "../components/Seo";

const id = "UUyWiQldYO_-yeLJC0j5oq2g";
const API_KEY = process.env.API_KEY;
// console.log(id, API_KEY);

export default function Home({ data }) {
  const [movies, setMovies] = useState();
  useEffect(() => {
    (async () => {
      // const data = await (
      //   await fetch(`/api/playlist/playlistId=${id}&part=snippet,contentDetails&maxResults=20`)
      // ).json();
      const data = await (
        await fetch(
          `https://www.googleapis.com/youtube/v3/playlistItems?key=${API_KEY}&playlistId=${id}&part=snippet,contentDetails&maxResults=20`
        )
      ).json();
      setMovies(data.items);
    })();
  }, []);
  const router = useRouter();
  const onClick = (id, title) => {
    router.push(`/movies/${encodeURIComponent(title)}/${id}`);
  };

  return (
    <div className="container">
      <Seo title="home" />
      {!movies ? (
        <h1>로딩...</h1>
      ) : (
        movies?.map((movie) => {
          let id = movie.contentDetails.videoId;
          let title = movie.snippet.title.replace(/\[DJMax Respect V\] | \(M\/V 4K 60FPS\)/g, "");
          let url = `/movies/${encodeURIComponent(title)}/${id}`;

          return (
            <div onClick={() => onClick(id, title)} className="movie" key={id}>
              {/* <Image
                src={movie.snippet.thumbnails[Object.keys(movie.snippet.thumbnails).at(-1)].url}
                alt={id}
                width="100%"
                height="100%"
              /> */}
              <img
                src={movie.snippet.thumbnails[Object.keys(movie.snippet.thumbnails).at(-1)].url}
                alt={id}
              />
              <h4>
                <Link href={url} as={url}>
                  <a>{title}</a>
                </Link>
              </h4>
            </div>
          );
        })
      )}
      <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 20px;
          gap: 20px;
        }
        .movie {
          cursor: pointer;
        }
        .movie img {
          max-width: 100%;
          border-radius: 12px;
          transition: transform 0.2s ease-in-out;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }
        .movie:hover img {
          transform: scale(1.05) translateY(-10px);
        }
        .movie h4 {
          font-size: 18px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}

// export async function getServerSideProps() {
//     const data = await(await fetch(`http://localhost:3000/api/playlist/playlistId=${id}&part=snippet,contentDetails&maxResults=20`)).json();
//     return {
//         props: {
//             data,
//         }
//     };
// }

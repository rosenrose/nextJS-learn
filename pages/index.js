import { useState, useEffect } from "react";
import Link from "next/link";
// import Image from "next/image";
import { useRouter } from "next/router";
import Seo from "../components/Seo";

const initPlaylistId = "UUyWiQldYO_-yeLJC0j5oq2g";
const API_KEY = process.env.API_KEY;
// console.log(API_KEY);

export default function Home({ data }) {
  const [movies, setMovies] = useState();
  const [thumbnails, setThumbnails] = useState({});
  const [playlistId, setPlaylistId] = useState(initPlaylistId);

  useEffect(() => {
    (async () => {
      // const data = await (
      //   await fetch(`/api/playlist/playlistId=${id}&part=snippet,contentDetails&maxResults=20`)
      // ).json();
      const data = await (
        await fetch(
          `https://www.googleapis.com/youtube/v3/playlistItems?key=${API_KEY}&playlistId=${playlistId}&part=snippet,contentDetails&maxResults=20`
        )
      ).json();

      data.items.forEach((movie) => {
        const id = movie.contentDetails.videoId;
        fetch(`https://asia-northeast3-get-youtube-thumbnail.cloudfunctions.net/thumbnail?id=${id}`)
          .then((response) => response.text())
          .then((thumbnail) => {
            setThumbnails((prev) => ({ ...prev, [id]: thumbnail }));
          });
      });
      setMovies(data.items);
    })();
  }, [playlistId]);

  const router = useRouter();
  const onClick = (id, title) => {
    router.push(`/movies/${encodeURIComponent(title)}/${id}`);
  };
  const onChange = (event) => {
    setPlaylistId(event.target.value);
  };

  return (
    <>
      <input type="text" onChange={onChange} list="playlists" className="idInput" />
      <datalist id="playlists">
        <option value={initPlaylistId} />
        <option value="PLtYQ7DpMMg-I22iICgrMNC1ln3ZT4FxUj" />
      </datalist>
      <div className="container">
        <Seo title="home" />
        {!movies ? (
          <h1>로딩...</h1>
        ) : (
          movies?.map((movie, i) => {
            const id = movie.contentDetails.videoId;
            const title = movie.snippet.title;
            const url = `/movies/${encodeURIComponent(title)}/${id}`;

            return (
              <div onClick={() => onClick(id, title)} className="movie" key={id}>
                {thumbnails[id] && <img src={thumbnails[id]} alt={id} />}
                <h4>
                  <Link href={url} as={url}>
                    <a>{title}</a>
                  </Link>
                </h4>
              </div>
            );
          })
        )}
      </div>
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
        .idInput {
          width: 20rem;
        }
      `}</style>
    </>
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

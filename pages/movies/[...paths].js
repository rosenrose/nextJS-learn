import { useRouter } from "next/router";
import { useState, useEffect } from "react";
// import Image from "next/image";
import Seo from "../../components/Seo";

export default function Detail({ paths }) {
  const router = useRouter();
  const [title, id] = router.query.paths || [];
  // const [title, id] = paths || [];

  const [movie, setMovie] = useState();
  useEffect(() => {
    (async () => {
      // const data = await (await fetch(`/api/video/${id}`)).json();
      const data = await (
        await fetch(
          `https://www.googleapis.com/youtube/v3/videos?key=${process.env.API_KEY}&id=${id}&part=snippet,contentDetails`
        )
      ).json();
      setMovie(data.items[0]);
    })();
  }, [id]);

  return (
    <div>
      {!movie ? (
        "로딩..."
      ) : (
        <div>
          <Seo title={title} />
          {/* <Image
            src={movie.snippet.thumbnails[Object.keys(movie.snippet.thumbnails).at(-1)].url}
            alt={id}
            layout="fill"
            objectFit="contain"
          /> */}
          <img
            src={movie.snippet.thumbnails[Object.keys(movie.snippet.thumbnails).at(-1)].url}
            alt={id}
          />
          <h4>{title}</h4>
          <pre>{JSON.stringify(movie, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

// export function getServerSideProps({ params: { paths } }) {
//     return {
//         props: {
//             paths,
//         }
//     };
// }

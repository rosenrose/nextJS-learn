import { useRouter } from "next/router";
import { useState, useEffect } from "react";
// import Image from "next/image";
import Seo from "../../components/Seo";

export default function Detail({ paths }) {
  const router = useRouter();
  const [title, id] = router.query.paths || [];
  // const [title, id] = paths || [];

  const [movie, setMovie] = useState();
  const [thumbnail, setThumbnail] = useState("");
  useEffect(() => {
    (async () => {
      // const data = await (await fetch(`/api/video/${id}`)).json();
      const data = await (
        await fetch(
          `https://www.googleapis.com/youtube/v3/videos?key=${process.env.API_KEY}&id=${id}&part=snippet,contentDetails`
        )
      ).json();

      setThumbnail(
        await (
          await fetch(
            `https://asia-northeast3-get-youtube-thumbnail.cloudfunctions.net/thumbnail?id=${id}`
          )
        ).text()
      );
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
          <img src={thumbnail} alt={id} />
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

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
      setMovie(data.items[0]);
      setThumbnail((await extractInfo(data.items[0])).thumbnail);
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

async function extractInfo(item) {
  const { title, description, publishedAt: date, thumbnails } = item.snippet;
  const info = { title, description, date };
  const thumbnail = thumbnails[Object.keys(thumbnails).at(-1)].url;

  if (thumbnail.endsWith("maxresdefault.jpg")) {
    return { ...info, thumbnail };
  } else {
    const availableRes = ["maxresdefault", "sddefault", "hqdefault", "mqdefault", "default"];

    for (const res of availableRes) {
      const maxres = thumbnail.replace(/[^\/]+(?=.jpg)/, res);
      const status = await (
        await fetch(
          `https://rosenrose-proxy.herokuapp.com/status?url=${encodeURIComponent(maxres)}`
        )
      ).text();

      if (status === "200") {
        return { ...info, thumbnail: maxres };
      }
    }

    return { ...info, thumbnail: "" };
  }
}

// export function getServerSideProps({ params: { paths } }) {
//     return {
//         props: {
//             paths,
//         }
//     };
// }

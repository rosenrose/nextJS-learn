import { useRouter } from "next/router";
import { useQuery } from "react-query";
import Seo from "../../components/Seo";

export default function Detail(props) {
  const router = useRouter();
  const [title, id] = router.query.paths || [];
  // const [title, id] = paths || [];

  // console.log("router", router, "props", props);
  // const thumbnail = router.query.thumbnail;

  const { data: thumbData } = useQuery(id, () =>
    fetch(`https://asia-northeast3-get-youtube-thumbnail.cloudfunctions.net/thumbnail?id=${id}`)
      .then((response) => response.text())
      .then((thumbnail) => ({ id, thumbnail }))
  );

  const { isLoading, data: movie } = useQuery(["info", id], () =>
    fetch(
      `https://www.googleapis.com/youtube/v3/videos?key=${process.env.API_KEY}&id=${id}&part=snippet,contentDetails`
    ).then((response) => response.json())
  );

  return (
    <div>
      {isLoading ? (
        "로딩..."
      ) : (
        <div>
          <Seo title={title} />
          <img src={thumbData.thumbnail} alt={id} />
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

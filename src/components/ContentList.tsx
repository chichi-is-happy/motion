import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { Post } from "../store/content";
import ContentListItem from "./ContentListItem";

const ContentList = () => {
  //
  const selectPosts = createSelector(
    (state: { content: { posts: Post[] } }) => state.content.posts,
    (posts) => posts
  );

  const posts = useSelector(selectPosts);
  console.log("포스트들", posts);

  return (
    <>
      <div className=" flex flex-col items-center justify-center">
        {posts.length === 0 && (
          <div className="items-center justify-center text-gray-500">
            등록된 포스트가 없습니다.
          </div>
        )}
        <ul className="w-full">
          {posts.map((post: Post, index: number) => (
            <>
              <ContentListItem
                key={post.id}
                category={post.category}
                id={post.id}
                imageUrl={post.imageUrl}
                videoUrl={post.videoUrl}
                task={post.task}
                title={post.title}
                content={post.content}
                index={index}
              />
            </>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ContentList;

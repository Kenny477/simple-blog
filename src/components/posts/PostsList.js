import { getPosts } from "../../hooks/useFirestore";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { postState } from "../../atoms/postAtom";
function PostsList() {
    const [posts, setPosts] = useState([]);
    const setPost = useSetRecoilState(postState)

    useEffect(() => {
        getPosts().then(posts => setPosts(posts));
    }, []);

    const handleClick = (id, e) => {
        e.stopPropagation();
        setPost(id);
        // console.log("CLICKED POST", id);
    }

    return (
        <div className="space-y-4">
            {posts.map(post => {
                return (
                    <div key={post.id} className="cursor-pointer border-2 rounded border-blue-500 box-shadow p-2" onClick={e => handleClick(post.id, e)}>
                        <h1>{post.title}</h1>
                        <h3>{new Date(post.date?.seconds * 1000).toLocaleString()}</h3>
                    </div>
                )
            })}
        </div>
    )
}

export default PostsList;

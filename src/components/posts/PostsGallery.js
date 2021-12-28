import { getPosts } from "../../hooks/useFirestore";
import { useEffect, useState } from "react";

function PostsGallery() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getPosts().then(posts => setPosts(posts));
    }, []);

    return (
        <div>
            {posts.map(post => {
                return (
                    <div key={post.id}>
                        <h1>{post.title}</h1>
                        <h3>{new Date(post.date?.seconds * 1000).toLocaleString()}</h3>
                    </div>
                )
            })}
        </div>
    )
}

export default PostsGallery

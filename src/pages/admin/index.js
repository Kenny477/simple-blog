import { Suspense } from "react";
import Editor from "../../components/editor/Editor";
import PostsList from "../../components/posts/PostsList";
import { newPost } from "../../hooks/useFirestore";

function Admin() {

    const handleNewPost = () => {
        newPost();
        
    }

    return (
        <div className="flex flex-row">
            <div className="flex flex-col p-4">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2" onClick={handleNewPost}>
                    Create new post
                </button>
                <PostsList />
            </div>
            <div className="flex flex-col flex-grow h-screen p-4">
                <Suspense fallback={<div>Loading...</div>}>
                    <Editor />
                </Suspense>
            </div>
        </div>
    )
}

export default Admin;

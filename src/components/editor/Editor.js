import { useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import { postState } from "../../atoms/postAtom"
import { deletePost, getLatestPostId, getPost, updatePost } from "../../hooks/useFirestore";

function Editor() {
    const [post, setPost] = useRecoilState(postState);
    const [data, setData] = useState({
        title: "",
        content: "",
        author: "",
        date: null
    });

    useEffect(() => {
        console.log("POST CHANGED")
        console.log(post)
        getPost(post).then(post => {
            const tmpData = post.data();
            setData({
                title: tmpData.title || "",
                content: tmpData.content || "",
                author: tmpData.author || "",
                date: tmpData.date || null
            });
            // console.log(data)
        }).catch(err => {
            console.log(err);
        });
    }, [post])

    const handlePublish = () => {
        // console.log(post, data);
        updatePost(post, data);
    }

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.id]: e.target.value
        })
    }

    const handleDelete = () => {
        console.log("DELETED POST", post);
        deletePost(post);
        const latestPostId = getLatestPostId();
        console.log(latestPostId);
        setPost(latestPostId);
    }

    return (
        <div className="h-full">
            <div className="flex flex-col h-full">
                <div className="mb-4 flex flex-col">
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" className="w-full border-solid border-2 border-black rounded p-2" value={data?.title} onChange={handleChange} />
                </div>
                <div className="mb-4 flex flex-col">
                    <label htmlFor="author">Author</label>
                    <input type="text" id="author" className="w-full border-solid border-2 border-black rounded p-2" value={data?.author} onChange={handleChange} />
                </div>
                <div className="mb-4 flex flex-col flex-grow">
                    <label htmlFor="content">Content</label>
                    <textarea id="content" className="w-full flex-grow resize-none scroll-smooth border-solid border-2 border-black rounded p-2" value={data?.content} onChange={handleChange} />
                </div>
                <div className="flex justify-between">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleDelete}>
                        Delete
                    </button>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handlePublish}>
                        Publish
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Editor;

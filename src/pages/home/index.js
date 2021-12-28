import React, { useEffect, useState } from 'react';
import { getPosts } from '../../hooks/useFirestore';


function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts().then(posts => setPosts(posts));
  }, []);

  return (
    <div className="">
      {posts.map(post => {
        return (
          <div key={post.id}>
            <h1>{post.title}</h1>
            <h3>{new Date(post.date?.seconds*1000).toLocaleString()}</h3>
            <p>{post.content}</p>
          </div>
        )
      })}
    </div>
  );
}

export default App;

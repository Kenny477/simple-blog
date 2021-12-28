import { initializeApp } from 'firebase/app';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, limit, orderBy, query, Timestamp, updateDoc } from 'firebase/firestore';
import firebaseConfig from './firebase';

const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);

export const postsRef = collection(firestore, 'posts');

export const getPosts = async () => {
    const postsList = await getDocs(postsRef);
    const posts =  postsList.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    return posts;
}

export const newPost = async () => {
    const newPost = await addDoc(postsRef, {
        title: 'New post',
        content: 'New post content',
        date: Timestamp.now()
    });
    console.log('new post');
    return newPost;
}

export const getPost = async (id) => {
    const post = await getDoc(doc(firestore, `posts/${id}`));
    return post;
}

export const updatePost = async (id, data) => {
    const post = await updateDoc(doc(firestore, `posts/${id}`), data);
    return post;
}

export const getLatestPostId = async () => {
    const q = query(postsRef, orderBy('date', 'desc'), limit(1));
    const posts =  await getDocs(q);
    console.log(posts)
    return posts?.docs[0]?.id;
}
// maybe fix with onSnapshot
// https://firebase.google.com/docs/firestore/query-data/listen

export const deletePost = async (id) => {
    deleteDoc(doc(firestore, `posts/${id}`));
}

export default firestore;
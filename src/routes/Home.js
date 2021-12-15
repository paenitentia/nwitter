import React, { useEffect, useState } from "react";
import { dbService } from "../fbase";
import { addDoc, collection, doc, getDocs, onSnapshot, query } from "firebase/firestore"

const Home = ({ userObj }) => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);

    
    useEffect(() => {
        const q = query(collection(dbService, "nweets").orderBy("createdAt", "desc"));
        onSnapshot(q, (snapshot) => {
            const nweetArr = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setNweets(nweetArr);
        });
    }, []);

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            const data = await addDoc(collection(dbService, "nweets"), {
                text: nweet,
                createdAt: Date.now(),
                creatorId: userObj.uid,
            });
        } catch(error) {
            console.error(error);
        }

        setNweet("");
    };

    const onChange = (event) => {
        const { target: { value }} = event;
        setNweet(value);
    }
    return (
        <div>
            <form>
                <input type="text" value={nweet} onChange={onChange} placeholder="What's on your mind?" maxlength={120} />
                <input type="submit" value="Nweet" />
            </form>
        
            <div>
                {nweets.map((nweet) => (
                <div key={nweet.id}>
                    <h4>{nweet.text}</h4>
                </div>))}
            </div>
        </div>
    );
};
export default Home;

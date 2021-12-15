import React, { useEffect, useState } from "react";
import { dbService } from "../fbase";
import { addDoc, collection, getDocs, query } from "firebase/firestore"

const Home = () => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);

    const getNweets = async () => {
        const dbNweets = await getDocs(collection(dbService, "nweets"));
        dbNweets.forEach((doc) => {
            const nweetObj = {
                ...doc.data(),
                id: doc.id,
            }

            setNweets((prev) => [nweetObj, ...prev]);
        });
    }

    useEffect(() => {
        getNweets();
    }, []);

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            const data = await addDoc(collection(dbService, "nweets"), {
                nweet,
                createdAt: Date.now(),
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
                    <h4>{nweet.nweet}</h4>
                </div>))}
            </div>
        </div>
    );
};
export default Home;

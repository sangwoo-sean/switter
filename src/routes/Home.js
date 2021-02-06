import React, {useEffect, useState} from "react";
import Swit from "../components/Swit";
import { dbService, firebaseInstance } from "../fBase";

const Home = ({userObj})=> {
    const [swit, setSwit] = useState("");
    const [swits, setSwits] = useState([]);

    useEffect(() => { // render 완료된 후에 db에서 트윗들을 받아옴
        dbService.collection("swits").onSnapshot((snapshot) => { // snapshot = db에 event가 생시면 데이터를 받아옴
            const switArray = snapshot.docs.map((doc) =>({
                    id:doc.id,
                    ...doc.data()
                }));
            setSwits(switArray);
        });
    }, []);
    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.collection("swits").add({
            text: swit,
            createdAt: Date.now(),
            creatorId: userObj.uid
        });
        setSwit("");
    };
    const onChange = (event) => {
        const {target : {value}} = event;
        setSwit(value);
    };
    return (
        <div>
            <form>
                <input onChange={onChange} type="text" value= {swit} placeholder="say here" maxLength={120}/>
                <input onClick={onSubmit} type="submit" value="Swit"/>
            </form>
            <div>
                {swits.map((each) => (
                <Swit key={each.id} switObj={each} isOwner={each.creatorId === userObj.uid} />
                ))}
            </div>
        </div>
    );
};


export default Home;
import React, {useState} from "react";
import { dbService } from "../fBase";

const Swit = ({switObj, isOwner}) => {
    const [editing, setEditing] = useState(false);
    const [newSwit, setNewSwit] = useState(switObj.text);
    const onDeleteClick = async () => {
        const ok = window.confirm("Delete?");
        if (ok) {
            await dbService.doc(`swits/${switObj.id}`).delete();
        }
    };
    const toggleEditing = () => setEditing((prev) => !prev);

    const onChange = (event) => {
        const {target: {value}} = event;
        setNewSwit(value);
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.doc(`swits/${switObj.id}`).update({
            text: newSwit
        });
        setEditing(false);
    }

    return (
    <div>
        {editing ? (
            <>
                <form>
                    <input type="text" placeholder="Edit your text" value={newSwit} required onChange={onChange}/>
                </form>
                <button onClick={onSubmit} >Confirm</button>
                <button onClick={toggleEditing} >Cancel</button>
            </>
        ) : (
            <>
            <h4>{switObj.text}</h4>
            {isOwner && ( //userid가 로그인한사람과 일치하면 버튼 활성화
                <>
                    <button onClick={onDeleteClick} >Delete</button>
                    <button onClick={toggleEditing} >Edit</button>
                </>
            )}
            </>
        )}
    </div>
    );
};
export default Swit;
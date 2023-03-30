import React, {useEffect, useState} from "react";
import UIModal from "../../UI/Modal/Modal";
import useApi from "../../utils/useApi";
import PromotionModalCommentsTree from "./CommentsTree/CommentsTree";
import './Modal.css';

const PromotionModal = ({ promotionId, onClickClose }) => {
    const [comment, setComment] = useState("");
    const [load, loadInfo] = useApi({
        url: '/comments',
        params: {
            promotionId,
            _expand: 'user'
        }
    });

    const [sendComment, sendCommentInfo] = useApi({
        url: '/comments',
        method: 'post',
    });

    useEffect(() => {
        load();
    }, []);

    async function onSubmit(ev) {
        ev.preventDefault();
        try {
            await sendComment({
                data: {
                    userId: 1,
                    promotionId,
                    comment,
                }
            });
            setComment('');
            load({ quietly: true });
        } catch (error) {
            
        }        
    };

    async function sendAnswer(text, parentId) {
        await sendComment({
            data: {
                userId: 1,
                promotionId,
                comment: text,
                parentId
            }
        });
        load({ quietly: true });
    }

    return (
        <UIModal isOpen onClickClose={onClickClose}>
            <form className="promotion-modal__comment-form" onSubmit={onSubmit}>
                <textarea
                    placeholder="Comentar..."
                    onChange={(ev) => setComment(ev.target.value)}
                    value={comment}
                    disabled={sendCommentInfo.loading}
                />
                <button type="submit" disabled={sendCommentInfo.loading}>
                    {sendCommentInfo.loading ? 'Enviando...' : 'Enviar'}
                </button>
            </form>
            <PromotionModalCommentsTree comments={loadInfo.data} sendComment={sendAnswer} />            
        </UIModal>
    )    
};

export default PromotionModal;
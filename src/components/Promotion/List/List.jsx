import React, { useState } from "react";
import UIModal from "../../UI/Modal/Modal";
import PromotionCard from "../Card/Card";
import PromotionModal from "../Modal/Modal";
import useApi from "../../utils/useApi";
import "./List.css";

const PromotionList = ({ loading, error, promotions, refetch }) => {
  const [promotionId, setPromotionId] = useState(null);
  const [deletePromotion, deletePromotionInfo] = useApi({
    method: 'DELETE',
  })

  if (error) {
    return <div>Algo deu errado</div>;
  }

  if (promotions === null || deletePromotionInfo.loading) {
    return <div>Carregando...</div>;
  }

  if (promotions.length === 0) {
    return <div>Nenhum resultado encontrado</div>;
  }

  return (
    <div className="promotion-list">
      {promotions.map((promotion) => (
        <PromotionCard
          promotion={promotion}
          key={promotion.id}
          onClickComments={() => setPromotionId(promotion.id)}
          onClickDelete={async () => {
            await deletePromotion({
                url: `/promotions/${promotion.id}`,
            })
            refetch();
          }}
        />
      ))}
      {loading && <div>Carregando mais promoções...</div>}
      {promotionId && (
        <PromotionModal
          promotionId={promotionId}
          onClickClose={() => setPromotionId(null)}
        />
      )}
      ;
    </div>
  );
};
export default PromotionList;

import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import "./Form.css";
import useApi from "../../utils/useApi";
import schema from "./schema";
import Field from "../../Form/Field/Field";
import UIButton from "../../UI/Button/Button";

const initialValue = {
  title: "",
  url: "",
  imageUrl: "",
  price: 0,
};

const PromotionForm = ({ id }) => {
  const navigate = useNavigate();
  const [load, loadInfo] = useApi({
    url: `/promotions/${id}`,
    method: "get",
  });

  const [save, saveInfo] = useApi({
    url: id ? `/promotions/${id}` : "/promotions",
    method: id ? "put" : "post",
    onCompleted: (response) => {
      if (!response.error) {
        navigate("/");
      }
    },
  });

  useEffect(() => {
    if (id) {
      load();
    }
  }, [id]);

  function onSubmit(formValues) {
    save({
      data: formValues,
    });
  }

  const values = id ? loadInfo.data : initialValue;

  if (!values) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h1>Promo Show</h1>
      {id ? <h2>Editar Promoção</h2> : <h2>Nova Promoção</h2>}
    
      <Formik
        initialValues={values}
        onSubmit={onSubmit}
        validationSchema={schema}
        render={() => (
          <Form>
            {saveInfo.loading && <span>Salvando dados...</span>}
            <div className="promotion-form__group"> 
              <Field
                type="text"
                name="title"
                label="Título"
              />  
            </div>
            <div className="promotion-form__group">
              <Field
                type="text"
                name="url" 
                label="Link"
              />             
            </div>
            <div className="promotion-form__group">
              <Field
                type="text"
                name="imageUrl"
                label="Imagem (URL)"
              />
            </div>
            <div className="promotion-form__group">
              <Field
                type="number"
                name="price"
                label="Preço"
              />          
            </div>
            <div>
              <UIButton component='button' type="submit">Salvar</UIButton>
              
            </div>
          </Form>
        )}
      />
    </div>
  );
};

export default PromotionForm;

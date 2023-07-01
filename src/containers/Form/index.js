import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

const mockContactApi = () =>
   new Promise((resolve) => {
      setTimeout(resolve, 1000);
   });

const Form = ({ onSuccess, onError }) => {
   const [sending, setSending] = useState(null);
   const [successMessage, setSuccessMessage] = useState(null);
   /* const validateForm = () =>{
    if()
   } */
   const sendContact = useCallback(
      async (evt) => {
         evt.preventDefault();
         setSending(true);
         console.log(evt);
         // We try to call mockContactApi
         try {
            await mockContactApi();
            setSending(true);
            onSuccess();
            setSuccessMessage("le formulaire a été envoyé avec succès !");
         } catch (err) {
            setSending(false);
            onError(err);
         }
      },
      [onSuccess, onError]
   );
   return (
      <form onSubmit={sendContact}>
         <div className="row">
            <div className="col">
               <Field placeholder="" label="Nom" name="prenom" />
               <Field placeholder="" label="Prénom" />
               <Select selection={["Personel", "Entreprise"]} onChange={() => null} label="Personel / Entreprise" type="large" titleEmpty />
               <Field placeholder="" label="Email" />
               <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
                  {sending ? "En cours" : "Envoyer"}
               </Button>
            </div>
            <div className="col">
               {successMessage && <p>{successMessage}</p>}
               <Field placeholder="message" label="Message" type={FIELD_TYPES.TEXTAREA} />
            </div>
         </div>
      </form>
   );
};

Form.propTypes = {
   onError: PropTypes.func,
   onSuccess: PropTypes.func,
};

Form.defaultProps = {
   onError: () => null,
   onSuccess: () => null,
};

export default Form;

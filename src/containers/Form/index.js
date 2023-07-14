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
   const [sending, setSending] = useState(false);
   const [nomValue, setNomValue] = useState("");
   const [isChampRempli, setIsChampRempli] = useState(true);
   const handleNomChange = (value) => {
      setNomValue(value);
   };

   console.log(nomValue);
   const sendContact = useCallback(
      async (evt) => {
         evt.preventDefault();

         if (nomValue.trim() === "") {
            setIsChampRempli(false);
            return;
         }

         setSending(true);

         // We try to call mockContactApi
         try {
            await mockContactApi();
            onSuccess();
            setSending(false);
         } catch (err) {
            setSending(false);
            onError(err);
         }
      },
      [onSuccess, onError, nomValue]
   );
   return (
      <form onSubmit={sendContact}>
         <div className="row">
            <div className="col">
               <Field placeholder="" label="Nom" name="Nom" nomValue={nomValue} onNomChange={handleNomChange} />
               {!isChampRempli && <p>Veuillez remplir le champ !</p>}
               <Field placeholder="" label="Prénom" name="prenom" />
               <Select selection={["Personel", "Entreprise"]} onChange={() => null} label="Personel / Entreprise" type="large" titleEmpty />
               <Field placeholder="" label="Email" />
               <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
                  {sending ? "En cours" : "Envoyer"}
               </Button>
            </div>
            <div className="col">
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

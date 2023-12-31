import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";
import "./style.scss";

const Slider = () => {
   const { data } = useData();
   const [index, setIndex] = useState(0);
   // Modification du sens de sort pour ordre décroissant
   const byDateDesc = data?.focus.sort((evtA, evtB) => (new Date(evtA.date) > new Date(evtB.date) ? -1 : 1));
   const nextCard = () => {
      if (byDateDesc) {
         // Ajout d'un -1 à la methode byDateDesc.length
         setTimeout(() => setIndex(index < byDateDesc.length - 1 ? index + 1 : 0), 5000);
      }
   };
   useEffect(() => {
      nextCard();
   });
   return (
      <div className="SlideCardList">
         {byDateDesc?.map((focus, idx) => (
            <>
               {focus && (
                  <div key={focus.id} className={`SlideCard SlideCard--${index === idx ? "display" : "hide"}`}>
                     <img src={focus.cover} alt="forum" />
                     <div className="SlideCard__descriptionContainer">
                        <div className="SlideCard__description">
                           <h3>{focus.title}</h3>
                           <p>{focus.description}</p>
                           <div>{getMonth(new Date(focus.date))}</div>
                        </div>
                     </div>
                  </div>
               )}
               <div className="SlideCard__paginationContainer">
                  <div className="SlideCard__pagination">
                     {byDateDesc.map((paginationFocus, radioIdx) => (
                        <input
                           key={paginationFocus.id}
                           type="radio"
                           name="radio-button"
                           /* remplace idx par index */ checked={index === radioIdx}
                           /* Ajout readOnly */ readOnly
                        />
                     ))}
                  </div>
               </div>
            </>
         ))}
      </div>
   );
};

export default Slider;

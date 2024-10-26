import React from "react";
import { useTranslation } from 'react-i18next';



export default function About() {

    const { t, i18n } = useTranslation();

    const changeLanguage = (lng) => {
      i18n.changeLanguage(lng); // Change the language
    };

    return (
        <div className="container">
            
    <div className="mt-5">
        <h1>{t('welcome')}</h1>
        <p>{t('description')}</p>
        
        <button onClick={() => changeLanguage('en')}>English</button>
        <button onClick={() => changeLanguage('ar')}>العربية</button>
    </div>
        </div>
    );
}
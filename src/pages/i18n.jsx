import  I18n  from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";



I18n
    .use(initReactI18next)
    .use(Backend)
    .use(LanguageDetector)
    .init({
        falbacking:'tr',
        
    })


export default  I18n;   
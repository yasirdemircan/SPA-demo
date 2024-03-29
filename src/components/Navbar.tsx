import React, { useContext, useEffect, useState } from 'react'
import { FaClipboardList } from "react-icons/fa";
import { IoFastFoodSharp, IoLanguage, IoPersonSharp } from "react-icons/io5";
import { LanguageContext } from '../context/LanguageContext';
import useTranslate from '../translations/Translations';
import ThemeButton from './ThemeButton';


export default function Navbar({ tabSelector, themeSelector }: {
  tabSelector: React.Dispatch<React.SetStateAction<string>>
  themeSelector: React.Dispatch<React.SetStateAction<string>>
}) {

  //Index of the selected navbar element (for the styling)
  const [selected, setSelect] = useState(1)

  //Get which language code we are on
  const { languageVal, setter } = useContext(LanguageContext)

  //Custom useTranslate hook to load translated values
  const translations = useTranslate(languageVal as string)

  useEffect(() => {
    const applicationTabs = ["Account", "Orders", "Menu"]
    tabSelector(applicationTabs[selected])
  }, [selected])


  const navbarMemberStyle = "flex flex-col text-center gap-2 rounded-md p-2"
  return (

    <div className="navbar text-lg font-title text-primary-content flex justify-between">
      <div className="flex flex-col text-center">
        <p className="text-3xl text-secondary">SPA</p>
        <p className="text-sm text-secondary">Demo</p>
      </div>
      <div className="flex-none gap-10 p-5 px-10">
        <div className={selected === 0 ? "bg-primary text-base-100 " + navbarMemberStyle : navbarMemberStyle}
          onClick={() => {
            setSelect(0)
          }}
        >
          <IoPersonSharp className='self-center' size={50}></IoPersonSharp>
          <h1>{translations.account}</h1>
        </div>

        <div className={selected === 1 ? "bg-primary text-base-100 " + navbarMemberStyle : navbarMemberStyle}
          onClick={() => {
            setSelect(1)
          }}>
          <FaClipboardList className='self-center' size={50}></FaClipboardList>
          <h1>{translations.orders}</h1>
        </div>
        <div className={selected === 2 ? "bg-primary text-base-100 " + navbarMemberStyle : navbarMemberStyle}
          onClick={() => {
            setSelect(2)
          }}>
          <IoFastFoodSharp size={50}></IoFastFoodSharp>
          <h1>{translations.menu}</h1>
        </div>
        <ThemeButton
          setCurrentTheme={themeSelector}></ThemeButton>
        <div className={navbarMemberStyle}
          onClick={() => {
            //Modifies the context state to change global language
            if (languageVal === "En") {
              setter("Sk")
            } else {
              setter("En")
            }

          }}>
          <IoLanguage size={50}></IoLanguage>
          <h1>{languageVal}</h1>
        </div>

      </div>
    </div>

  )
}

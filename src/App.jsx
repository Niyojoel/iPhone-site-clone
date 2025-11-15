import { useEffect, useState } from "react"
import { Features, Hero, Highlight, How_It_Works, Model, Navbar, Footer } from "./sections";

// import * as Sentry from '@sentry/react';


const App = () => {
  const [theme, setTheme] = useState(localStorage.getItem("Theme") !== null ? localStorage.getItem("Theme") : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

  const changeTheme = ()=> {
    setTheme(prev=> prev === "dark" ? "light" : "dark")
  } 

  const themeStyles = (light, dark="") => {
    if (theme === "dark") {
      return dark;
    }
    return light;
  }

  useEffect(()=> {
    localStorage.setItem("Theme", theme);
    document.querySelector("html")?.setAttribute("data-theme", theme);
  },[theme])

  return (
    <div className="site_wrapper"> 
      <main className="bg-[var(--body-bgColor)]">
        <Navbar toggleTheme={changeTheme} themeStyles={themeStyles} />
        <Hero/>
        <Highlight/>
        <Model/>
        <Features/>
        <How_It_Works/>
        <Footer/>
      </main>
    </div>
  )
}

export default App;

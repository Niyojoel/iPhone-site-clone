import {Search, ShoppingBag, SunDimIcon, MoonIcon} from "lucide-react"
import { AiFillApple} from "react-icons/ai"
import {navLists} from "../constants"

const Navbar = ({toggleTheme, themeStyles}) => {
  return (
    <header className='w-full sticky z-50 top-0 left-0 bg-[var(--body-bgColor)] py-5 sm:px-10 px-5 flex justify-between items-center transition-none'>
        <nav className='flex w-full items-center screen-max-width'>
            <AiFillApple size={30} className="svg"/>
            <div className="flex flex-1 items-center justify-center max-sm:hidden">
                {navLists.map(nav=>(
                    <div key={nav} className={`w-[5rem] px-5 text-sm cursor-pointer text-[var(--gray)] hover:text-[var(--body-color)] transition-all duration-500`}>
                        {nav}
                    </div>
                ))}
            </div>

            <div className="flex gap-5 max-sm:gap-3 items-center max-sm:justify-end max-sm:flex-1">
                <Search size={20} className="svg"/>
                <ShoppingBag size={20} className="svg"/>
                <button onClick={toggleTheme} className="transition-all duration-500">
                    <SunDimIcon className={`svg transition-all duration-1000 ${themeStyles("hidden", "flex")}`}/>
                    <MoonIcon className={`svg fill-[var(--gray)] hover:fill-[var(--body-color)] transition-all duration-1000 ${themeStyles("flex", "hidden")}`} size={20}/>
                </button>
            </div>
        </nav>
    </header>
  )
}

export default Navbar
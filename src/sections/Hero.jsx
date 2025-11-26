import {useGSAP} from "@gsap/react"
import {heroVideo, smallHeroVideo} from "../utils"
import { useEffect, useState } from "react"
import { animateWithGsap } from "../App"

const Hero = () => {
  const [videoSrc, setVideoSrc] = useState(window.innerWidth < 768 ? smallHeroVideo : heroVideo)

  const handleVideoSrcSet =()=> {
    if(window.innerWidth < 768) {return setVideoSrc(smallHeroVideo)};
    return setVideoSrc(heroVideo);
  }

  useGSAP(()=> {
    animateWithGsap("#hero-text", { opacity: 1, delay: 1.5 })
    animateWithGsap("#hero-cta", {opacity: 1, delay: 2,  translateY: 0})
  },[])

  useEffect(()=> {
    window.addEventListener("resize", handleVideoSrcSet);

    return ()=> window.removeEventListener("resize", handleVideoSrcSet)
  },[handleVideoSrcSet])
  
  return (
    <section className="w-full nav-height pt-20 bg-[var(--black_white)] relative">
      <div className="h-5/6 w-full flex-center flex-col lg:gap-5 md:gap-14">
        <p id="hero-text" className="hero-title will-change-transform">iPhone 15 Pro</p>
        <div className={`flex self-center w-full items-center justify-center h-[100%] max-md:h-[90%] max-xs:py-10 max-xl:py-10 max-md:py-0 bg-black`}>
          <video autoPlay playsInline={true} muted key={videoSrc} className="pointer-events-none lg:w-[80%] w-12/12 h-full">
            <source src={videoSrc} type="video/mp4"/>
          </video>
        </div>
        <div id="hero-cta" className="flex flex-col items-center opacity-0 translate-y-20 will-change-transform">
          <a href="#highlights" className="btn">Buy</a>
          <p>From $199/month or $999</p>
        </div>
      </div>
    </section>
  )
}

export default Hero;
import {useGSAP} from "@gsap/react"
import gsap from "gsap"
import { rightImg, watchImg } from "../utils"
import {VideoCarousel} from "../components"
import { ScrollTrigger } from "gsap/all"
import { animateWithScrollTrigger } from "../utils/animations"

gsap.registerPlugin(ScrollTrigger)

const Highlight = () => {
  const animeProps = {opacity: 1, y: 0}
  
  const triggerActions = "restart none restart none";

  useGSAP(()=> {
    animateWithScrollTrigger("#title", animeProps, {}, triggerActions, 'top 100%')
    animateWithScrollTrigger(".link", {...animeProps, duration: 1, stagger: 0.25}, {}, triggerActions, 'top 100%')
  },[])

  return (
    <section id="highlights" className="w-full overflow-hidden h-full common-padding bg-[var(--zinc)]">
      <div className="screen-max-width">
        <div className="mb-12 w-full md:flex md:flex-wrap items-center justify-between">
          <h1 id="title" className="section-heading text-nowrap mr-16 max-xs:text-wrap">
            Get the highlights.
          </h1>
          <div className="flex flex-wrap items-end gap-5">
            <p className="link">
              Watch the film
              <img src={watchImg} alt="watch" className="ml-2"/>
            </p>
            <p className="link">
              Watch the event
              <img src={rightImg} alt="right" className="ml-2"/>
            </p>
          </div>
        </div>
        <VideoCarousel/>
      </div>
    </section>
  )
}

export default Highlight
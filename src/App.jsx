import { useEffect, useState, useLayoutEffect, useRef } from "react"
import { Features, Hero, Highlight, How_It_Works, Model, Navbar, Footer } from "./sections";
import {ScrollTrigger} from "gsap/ScrollTrigger"
import {ScrollSmoother} from "gsap/ScrollSmoother"
import { gsap } from "gsap";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)


// import * as Sentry from '@sentry/react';

const defaultAction = "restart none none none";

export const animateWithScrollTrigger = (
  target,
  animateProps,
  scrollProps,
  actions = defaultAction,
  startPosition = "top 85%"
) => {
  gsap.to(target, {
    ...animateProps,
    scrollTrigger: {
      trigger: target,
      toggleActions: actions,
      start: startPosition,
      ...scrollProps,
    },
  });
};

export const animateVideoWithGsap = (
  target,
  completeAction,
  actions = "play pause reverse restart",
  startPosition = "-10% bottom"
) => {
  gsap.to(target, {
    scrollTrigger: {
      trigger: target,
      toggleActions: actions,
      start: startPosition,
    },
    onComplete: video && (() => {
      completeAction();
    }),
  });
};

export const animateWithGsapTimeline = (timeline, rotationRef, rotationState, firstTarget, secondTarget, animationProps ) => {
  
  timeline.to(rotationRef.current.rotation, {
    y: rotationState,
    duration: 1,
    ease: 'power2.inOut'
  })

  timeline.to(firstTarget, {
    ...animationProps,
    ease: 'power2.inOut'
  },'<')

  timeline.to(secondTarget, {
    ...animationProps,
    ease: 'power2.inOut'
  },'<')
}

export const animateWithGsap = (target, animateProps) => {
  gsap.to(target, {
    ...animateProps
  })
}

const App = () => {
  const [theme, setTheme] = useState(localStorage.getItem("Theme") !== null ? localStorage.getItem("Theme") : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  const contentRef = useRef(null);

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
  
  useLayoutEffect(()=> {
    if(contentRef.current) {
      ScrollSmoother.create({
        smooth: 0,
        effects: true,
        smoothTouch: 0,
      })
    }
    ScrollTrigger.normalizeScroll(true);
    return () => {
      ScrollTrigger.normalizeScroll(false);
    }
  }, [])

  return (
    <div className="site_wrapper" id="smooth-content" ref={contentRef}> 
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

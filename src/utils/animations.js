import gsap from "gsap"
import { ScrollTrigger } from "gsap/all"

gsap.registerPlugin(ScrollTrigger)

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
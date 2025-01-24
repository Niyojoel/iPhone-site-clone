import { useGSAP } from "@gsap/react";
import { animateVideoWithGsap, animateWithScrollTrigger } from "../utils/animations";
import { explore1Img, explore2Img, exploreVideo } from "../utils";
import { useRef } from "react";

const Features = ()=> {
    const exploreVideoRef = useRef();
    const playVideo = () => exploreVideoRef.current.play();
    const triggerActions1 = "restart reverse restart reverse";
    const triggerActions2 = "restart none none reverse";

    useGSAP(() => {
        animateVideoWithGsap('#exploreVideo', playVideo)
        animateWithScrollTrigger('#features-title', {y: 0, opacity: 1},{}, triggerActions1);
        animateWithScrollTrigger('.g_grow', {scale: 1, opacity: 1, ease: "power1"}, {scrub: 5.5}, triggerActions1);
        animateWithScrollTrigger('.g_text', {y: 0, opacity: 1, ease: "power2.inOut", duration: 1}, {}, triggerActions2, "20%, bottom");
    },[])

    return (
        <section className="h-full common-padding bg-[var(--zinc)] relative overflow-hidden">
            <div className="screen-max-width">
                <div className="mb-12 w-full">
                    <h1 id="features-title" className="section-heading">
                        Explore the full story.
                    </h1>
                </div>
                <div className="flex flex-col justify-center items-center overflow-hidden">
                    <div className="mt-32 max-md:mt-14 mb-24 pl-24">
                        <h2 className="text-5xl lg:text-7xl font-semibold">iPhone.</h2>
                        <h2 className="text-5xl lg:text-7xl font-semibold">Forged in titanium.</h2>
                    </div>
                    <div className="w-full flex-center flex-col gap-1">
                        <div className="w-full h-[50vh] flex items-start max-md:features_video_bg">
                            <video playsInline id='exploreVideo' className="w-full h-full object-cover object-top" preload='none' muted autoPlay ref={exploreVideoRef}>
                                <source src={exploreVideo} type="video/mp4"/>
                            </video>
                        </div>
                        <div className="flex flex-col w-full relative">
                            <div className="overflow-hidden feature-video-container gap-1">
                                <div className="overflow-hidden flex-1 h-[50vh] bg-zinc">
                                    <img src={explore1Img} alt="titanium" className="feature-video g_grow"/>
                                </div>
                                <div className="overflow-hidden flex-1 h-[50vh] bg-zinc">
                                    <img src={explore2Img} alt="titanium2" className="feature-video g_grow"/>
                                </div>
                            </div>  
                        </div>
                    </div>
                    <div className="feature-text-container">
                        <div className="flex-1 flex-center">
                            <p className="feature-text g_text">
                                iPhone 15 is {" "}
                                <span className="text-[var(--body-color)]">
                                    the first iPhone to feature an aerospace-grade titanium design 
                                </span>,
                                using the same alloy that spacecrafts use for missions to Mars.
                            </p>
                        </div>

                        <div className="flex-1 flex-center">
                            <p className="feature-text g_text">
                                Titanium has one of the best strength-to-weight ratios of any metal, making these our {" "}
                                <span className="text-[var(--body-color)]">
                                    lightest Pro models ever.
                                </span>,
                                You'll notice the difference the moment you pick one up.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
)};

export default Features
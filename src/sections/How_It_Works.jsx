import { useGSAP } from "@gsap/react"
import { chipImg, frameImg, frameVideo } from "../utils"
import { useRef, useState, useEffect } from "react"
import {PlayIcon as Play} from "lucide-react"
import { animateWithGsap, animateWithScrollTrigger } from "../App"

const How_It_Works = () => {
    const videoRef = useRef();
    const [videoPlaying, setVideoPlaying] = useState(true)

    const animateProps1 = {
        opacity: 1,
        scale: 1,
        duration: 2,
        ease: 'power2.inOut'
    };

    const triggerActions = "restart none none none";

    useGSAP(()=> {
        animateWithScrollTrigger('#chip', animateProps1, {}, triggerActions, '20% bottom');
        animateWithGsap('.g_fadeIn', {opacity:1, y: 0, duration: 2, ease:'power2.inOut'})
    },[])

    const handleVideoState = () => {
        if(videoPlaying) {
            videoRef.current.pause();
        }else {videoRef.current.play()};

        setVideoPlaying(prev => !prev)
    }

  return (
    <section className="common-padding">
        <div className="screen-max-width">
            <div className="flex-center w-full my-20 opacity-0 scale-[180%] will-change-transform" id="chip">
                <img src={chipImg} alt="chip" width={180} height={180}/>
            </div>

            <div className="flex flex-col items-center">
                <h2 className="hiw-title">
                    A17 Pro chip.
                    <br/> A monster win for gaming.
                </h2>

                <p className="hiw-subtitle">
                    It's here. The biggest redesign in the history of Apple GPUs.
                </p>
            </div>

            <div className="mt-10 md:mt-20 mb-14">
                <div className="relative h-full flex-center">
                    <div className="overflow-hidden">
                        <img src={frameImg} alt="frame" className="bg-transparent relative z-10"/>
                    </div>
                    <div className="hiw-video">
                        <video 
                            className="pointer-events-none" 
                            playsInline 
                            preload="none"
                            muted 
                            autoPlay 
                            ref={videoRef}
                            onPlay={() => {setVideoPlaying(true)}}
                            onEnded={() => setVideoPlaying(false)}
                        >
                            <source src={frameVideo} type="video/mp4"/>
                        </video>
                    </div>
                    <div className="absolute w-[95.5%] rounded-[65px] max-lg:rounded-[40px] max-md:rounded-[30px] max-sm:rounded-[20px] bg-transparent h-[91.5%] flex justify-center items-center" onClick={handleVideoState}>
                        <button className={`z-20 lg:size-12 size-10 hover:size-11 justify-center items-center rounded-full bg-black bg-opacity-70 hover:bg-opacity-90 cursor-pointer transition-all duration-800 ${!videoPlaying ? "flex" : "hidden"}`}>
                            <Play stroke="transparent" fill="#aaa" className="hover:fill-white"/>
                        </button>
                    </div>
                </div>
                <p className="text-[var(--gray)] font-semibold text-center mt-3">Honkai: Star Rail</p>
            </div>
            <div className="hiw-text-container">
                <div className="flex-1 flex justify-center flex-col gap-10">
                    <p className="hiw-text will-change-transform g_fadeIn">
                        A17 Pro is an entirely new class of iPhone chip that delivers our {" "}
                        <span className="text-[var(--body-color)]">
                            best graphic performance by far
                        </span>.
                    </p>
                    <p className="hiw-text g_fadeIn">
                        Mobile {" "}
                        <span className="text-[var(--body-color)]">
                            games will look and feel so immersive
                        </span>,
                        with incredible detailed environments and characters
                    </p>
                </div>
                <div className="flex-1 flex justify-center flex-col will-change-transform g_fadeIn">
                    <p className="hiw-text">New</p>
                    <p className="hiw-bigtext">Pro-class GPU</p>
                    <p className="hiw-text">with 6 cores</p>
                </div>
            </div>
        </div>
    </section>
  )
}

export default How_It_Works
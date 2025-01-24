import { useEffect, useRef, useState } from "react"
import { hightlightsSlides } from "../constants"
import gsap from "gsap";
import { pauseImg, playImg, replayImg } from "../utils";
import { useGSAP } from "@gsap/react";
import { animateVideoWithGsap, animateWithGsap } from "../utils/animations";

const VideoCarousel = () => {
    const videoRef = useRef([]);
    const videoSpanRef = useRef([]);
    const videoDivRef = useRef([]);

    const [video, setVideo] = useState({
        isEnd: false,
        startPlay: false,
        videoId: 0,
        isLastVideo: false,
        isPlaying: false
    });

    const {isEnd, startPlay, videoId, isLastVideo, isPlaying} = video;

    const [loadedData, setLoadedData] = useState([])

    const handleLoadedMetaData =(i, e) => setLoadedData(prevData => [...prevData, e]);

    const handleProcess = (type, i) => {
        switch (type) {
            case 'video-end':
                setVideo(prevVideo => ({...prevVideo, isEnd: true, videoId: i + 1}))
                break;
            case 'video-last':
                setVideo(prevVideo => ({...prevVideo, isLastVideo: true}))
                break;
            case 'video-reset':
                setVideo(prevVideo => ({...prevVideo, isLastVideo: false, videoId: 0}))
                break;
            case 'play':
                setVideo(prevVideo => ({...prevVideo, isPlaying: !prevVideo.isPlaying}))
                break;
            case 'pause':
                setVideo(prevVideo => ({...prevVideo, isPlaying: !prevVideo.isPlaying}))
                break;
            default:
                return video;
        }
    }
    
    const triggerActions = 'restart none none none';
    
    const handleVideo = () => setVideo(prevVideo => ({...prevVideo, startPlay: true, isPlaying: true}));

    useGSAP(()=> {
        animateWithGsap("#slider", {
            transform: `translateX(${-100 * videoId}%)`,
            duration: 2,
            ease: 'power2.inOut'
        })
        animateVideoWithGsap("#video", handleVideo, triggerActions);
    },[isEnd, videoId])

    useEffect(()=> {
        let currentProgress = 0;
        let span = videoSpanRef?.current;
        let currentVideoDiv = videoDivRef?.current[videoId]

        if(span[videoId]) {
            let currentSpan = span[videoId]
            //animate the progress of the video
            let anime = gsap.to(currentSpan, {
                onUpdate: () => {
                    const progress = Math.ceil(anime.progress() * 100);

                    if(progress !== currentProgress) {
                        currentProgress = progress;
                    
                        animateWithGsap(currentVideoDiv, {
                            width: window.innerWidth < 760 ? '10vw' : window.innerWidth < 1200 ? '10vw' : '4vw'
                        })
                        animateWithGsap(currentSpan, {
                            width: `${currentProgress}%`,
                            backgroundColor: "white"
                        })
                    }
                },
                
                onComplete: () => {
                    if(isPlaying) {
                        animateWithGsap(currentVideoDiv, {width: '12px'});
                        animateWithGsap(currentSpan, {backgroundColor: "var(--gray-200)" });
                    }
                }
            })

            if(videoId === 0) {
                anime.restart();
            }

            const animeUpdate = ()=> {
                anime.progress(videoRef?.current[videoId]?.currentTime / hightlightsSlides[videoId].videoDuration)
            }

            if(isPlaying) {
                gsap.ticker.add(animeUpdate);
            }else {
                gsap.ticker.remove(animeUpdate);
            }
        }

    },[videoId, startPlay])

    useEffect(()=> {
        if(videoRef?.current === null) return;
        if(loadedData.length > 3) {
            if(!isPlaying) {
                videoRef?.current[videoId].pause();
            }else {
                startPlay && videoRef?.current[videoId].play();
            }
        }
    },[videoId, startPlay, isPlaying, loadedData]);
    
  return (
    <>
      <div className="flex items-center">
        {hightlightsSlides.map((list, index)=> (
            <div key={list.id} id="slider" className="sm:pr-20 pr-10">
                <div className="video-carousel_container">
                    <div className="w-full h-full flex flex-center rounded-3xl overflow-hidden bg-black">
                        <video
                            id="video"
                            playsInline={true}
                            preload="auto"
                            muted
                            ref={(el) => (videoRef.current[index] = el)}
                            onPlay={()=> setVideo(prevVideo => ({
                                ...prevVideo, isPlaying: true
                            }))}
                            onLoadedMetadata={(e) => handleLoadedMetaData(index, e)}
                            onEnded={()=> 
                                index !== 3 ? handleProcess('video-end', index) : handleProcess('video-last')
                            }
                            className={`${list.id === 2 && "translate-x-44"} pointer-events-none`}
                        >
                            <source src={list.video} type="video/mp4"/>
                        </video>
                    </div>
                    <div className="absolute top-12 left-[5%] z-10">
                        {list.textLists.map(text=> (
                            <p key={text} className="md:text-2xl text-xl font-medium text-[#eee]">
                                {text}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        ))}
      </div>
      <div className="relative flex-center mt-10">
        <div className="flex-center h-[3.5rem] max-md:h-11 px-7 bg-[var(--gray-300)] backdrop-blur rounded-full">
            {videoRef?.current?.map((_, index)=> (
                <span 
                    key={index} 
                    ref={(el)=> (videoDivRef.current[index] = el)}
                    className="relative mx-2 w-3 h-3 bg-[var(--gray-200)] rounded-full cursor-pointer"
                >
                    <span 
                        className="absolute h-full w-full rounded-full" 
                        ref={(el)=> (videoSpanRef.current[index] = el)}
                    />
                </span>
            ))}
        </div>
        <button className="control-btn" onClick={isLastVideo ? () => handleProcess('video-reset') : !isPlaying ? () => handleProcess('play') : () => handleProcess("pause") }>
            <img src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg} alt={isLastVideo ? "replay" : !isPlaying ? "play" : "pause"} className="max-md:size-5"/>
        </button>
      </div>
    </>
  )
}

export default VideoCarousel
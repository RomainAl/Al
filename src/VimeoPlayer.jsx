import { useEffect, useRef, useState } from "react";
import Vimeo from "@u-wave/react-vimeo";
import Player from "@vimeo/player";

// export default function VimeoPlayer({ id }) {
//     const playerRef = useRef();
//     let player = {};

//     const handlePause = () => {
//         player.play();
//         // setTimeout(functionRef, 2000);
//       };

//     const handleV = (event) => {
//     // setStateV((volume) => parseFloat(event.target.value));
//         player.setVolume(parseFloat(event.target.value));
//     };
//     const volumeOn = () => {
//         player.setVolume(1.0);
//       };
//     useEffect(() => {
//       let options = {
//         id: id,
//         loop: false,
//         autoplay: false,
//         // controls: false
//       };
  
//       if (playerRef.current !== null) {
//         let player = new Player(playerRef.current, options);
  
//         player.on("play", () => {
//           console.log("play");
//         });
//       }
//     }, []);
  
//     return (
//       <div>
//         <input
//             type="checkbox"
//             id="paused"
//             // checked={paused}
//             onChange={handlePause}
//         />
//         <input
//             type="range"
//             // value={volume}
//             min={0}
//             max={1}
//             step={0.01}
//             onChange={handleV}
//         />
//         <div ref={playerRef}></div>
//       </div>
//     );
//   }


//   export default function VimeoPlayer({ id }) {
//     const playerRef = useRef();
//     let player = {};

//     useEffect(() => {
  
//       if (playerRef.current !== null) {
//         player = new Player(playerRef.current);
  
//         player.on("play", () => {
//             console.log("tatea")
//           });
//       }
//     }, [id]);
//     const handlePause = () => {
//         player.play();
//         // setTimeout(functionRef, 2000);
//     };
//     const volumeOn = () => {
//     player.setVolume(1.0);
//     };
//     const handleV = (event) => {
//     // setStateV((volume) => parseFloat(event.target.value));
//     player.setVolume(parseFloat(event.target.value));
//     };
//     return <>
//             <input
//                 type="checkbox"
//                 id="paused"
//                 // checked={paused}
//                 onChange={handlePause}
//                 />
//                 <input
//                 type="range"
//                 // value={volume}
//                 min={0}
//                 max={1}
//                 step={0.01}
//                 onChange={handleV}
//                 />
//             <div style={{padding:'56.25% 0 0 0',
//                         position:'relative'}}>
//                 <iframe ref={playerRef} src={`https://player.vimeo.com/video/${id}?controls=1`}
//                         style={{position:'absolute',
//                                 top:0,
//                                 left:0,
//                                 width:'100%',
//                                 height:'100%',
//                                 border:'none'}}
//                 ></iframe>
//             </div>
//         </>
//   }

export default function VimeoPlayer({ id, width }) {
    const [paused, setState] = useState(true);
    const [muted, setStateM] = useState(false);
    const [volume, setStateV] = useState(0);
    const handlePause = (event) => {
        setState((paused) => event.target.checked);
        // setTimeout(functionRef, 2000);
      };
      // const functionRef = () => setStateV((volume) => 1.0);
      const handleMute = (event) => {
        setStateM((muted) => event.target.checked);
        console.log(event.target.checked);
      };

    const volumeOn = () => setStateV((volume) => 1.0);
    const volumeOff = () => setStateV((volume) => 0.0);
    return (
        <div>
            {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
  <path d="M3 3.732a1.5 1.5 0 0 1 2.305-1.265l6.706 4.267a1.5 1.5 0 0 1 0 2.531l-6.706 4.268A1.5 1.5 0 0 1 3 12.267V3.732Z" />
</svg>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
  <path d="M4.5 2a.5.5 0 0 0-.5.5v11a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-11a.5.5 0 0 0-.5-.5h-1ZM10.5 2a.5.5 0 0 0-.5.5v11a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-11a.5.5 0 0 0-.5-.5h-1Z" />
</svg> */}





            <input
                type="checkbox"
                id="paused"
                checked={paused}
                onChange={handlePause}
            />
            <input
                type="checkbox"
                id="muted"
                checked={muted}
                onChange={handleMute}
            />
          <Vimeo
            video={id}
            volume={volume}
            background={false}
            paused={paused}
            width={width}
            muted={true}
            autoplay={false}
            onPlay={volumeOn}
            onPause={volumeOff}
          />
        </div>
    );
}

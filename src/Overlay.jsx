import { useState, useEffect, useRef } from "react";
import useGame from "./stores/useGame";
import useScreenSize from "./useScreenSize.jsx"

function Buttons(){
    const tafs = useGame((state)=>state.tafs);
    return <>
        {tafs.map((taf,i)=><div key={i} className="button">{taf.name}</div>)}
    </>
}

function Timeline(){
    
    const screenSize = useScreenSize();
    const tafs = useGame((state)=>state.tafs);
    const reftl_line = useRef();
    const reftl_circles = useRef([]);
    const gototaf = useGame((state) => state.gototaf);

    const goto = (event) => {
        gototaf(event.target.id);
      };

    useEffect(()=>{
            const btns = document.getElementsByClassName("button");
            const offsetY = 0;
            reftl_line.current.setAttribute('x1', btns.item(0).offsetLeft);
            reftl_line.current.setAttribute('x2', btns.item(btns.length-1).offsetLeft+btns.item(btns.length-1).offsetWidth);
            reftl_line.current.setAttribute('y1', btns.item(0).offsetTop-offsetY);
            reftl_line.current.setAttribute('y2', btns.item(0).offsetTop-offsetY);
            for(const [i, c] of reftl_circles.current.entries())
                {
                    c.setAttribute('cx', btns.item(i).offsetLeft + btns.item(i).offsetWidth/2);
                    c.setAttribute('cy', btns.item(0).offsetTop-offsetY);
                }
    }, [screenSize]);


    return <>
        <svg className="timeline">
            <line ref={reftl_line} x1="0" x2="0" y1="0" y2="0" stroke="white" strokeWidth="1" />
            {tafs.map((taf,i)=><circle onClick={goto} ref={(element) => reftl_circles.current[i] = element} key={i} className="tl_circles" id={taf.name} cx = "0" cy = "0" r = "13px"/>)}
        
        </svg>
    </>
}

export default function Overlay() {
    const restart = useGame((state) => state.restart);
    return (
        <div className="overlay">
            <div className="romainal" onClick={restart}>
            ROMAIN <br/>AL.
            </div>
            <div className="artvisuel">
            Artiste
            <br />
            Visuel
            </div>
            <div className="buttons">
                <Buttons/>
            </div>
            <Timeline/>
        </div>
    )
  }
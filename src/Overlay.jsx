import { useState, useEffect, useRef } from "react";
import useGame from "./stores/useGame";
import useScreenSize from "./useScreenSize.jsx";
import { useSpring, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';

function Buttons(){
    const tafs = useGame((state)=>state.tafs);
    return <>
        {tafs.map((taf,i)=><div key={i} className="button">{taf.name}</div>)}
    </>
}

function Timeline(){
    
    const screenSize = useScreenSize();
    const reftl_line = useRef();
    const reftl_circles = useRef([]);
    const btns = document.getElementsByClassName("button");
    const offsetY = 0;

    const {tafs, gototaf, tafcurrent} = useGame();
    const bind = useDrag(({movement: [mx], first, last, memo, touches}) => {
        if (first) {
            memo = [mx,touches, 1, false];
        }
        memo[1] += touches;
        memo[2] += 1;

        if ((Math.abs(mx-memo[0]) > 200)&&(!memo[3])){// && (memo[1]/memo[2]<1) && !memo[3] ){ // TODO MULTI TOUCHES ?
            let ii = (tafcurrent - Math.sign(mx-memo[0]))%tafs.length;
            ii = ii < 0? ii+5 : ii;
            gototaf(ii);
            [...reftl_circles.current].map(c=>c.style.transform = 'scale(1)');
            reftl_circles.current[ii].style.transform = 'scale(1.5)';
            memo[3] = true;
        }
        
        return memo;
    });

    const goto = (event) => {
        gototaf(event.target.getAttribute('data-id'));
        [...reftl_circles.current].map(c=>c.style.transform = 'scale(1)');
        event.target.style.transform = 'scale(1.5)';
      };
  

    useEffect(()=>{

            reftl_line.current.setAttribute('x1', btns.item(0).offsetLeft);
            reftl_line.current.setAttribute('x2', btns.item(btns.length-1).offsetLeft+btns.item(btns.length-1).offsetWidth);
            reftl_line.current.setAttribute('y1', btns.item(0).offsetTop-offsetY);
            reftl_line.current.setAttribute('y2', btns.item(0).offsetTop-offsetY);
            for(const [i, c] of reftl_circles.current.entries())
                {
                    c.setAttribute('cx', btns.item(i).offsetLeft + btns.item(i).offsetWidth/2);
                    c.setAttribute('cy', btns.item(0).offsetTop-offsetY);
                }
            // const icurrentTaf = reftl_circles.current.findIndex(c=>c.id===phase);
            // reftl_TheCircle.current.setAttribute('cx', icurrentTaf==-1? reftl_circles.current[0].getAttribute('cx') : reftl_circles.current[icurrentTaf].getAttribute('cx'));
            // reftl_TheCircle.current.setAttribute('cy', icurrentTaf==-1? reftl_circles.current[0].getAttribute('cy') : reftl_circles.current[icurrentTaf].getAttribute('cy'));

    }, [screenSize]);

    // const reftl_TheCircle = useRef();
    // const [{x, y}, api] = useSpring(() => ({ x: 400, y: 400}));
    
    // useGesture({
    //     onDrag: ({ active, offset: [x, y] }) => {
    //         api.start({ x, y });
    //     },
    //     onHover: ({hovering}) => api.start({r: hovering ? 40 : 30 })
    // }, 
    // {
    //     target: reftl_TheCircle
    // })

    return <>
        <animated.svg className="timeline" {...bind()} style={{ touchAction: 'none'}}>
            <line ref={reftl_line} x1="0" x2="0" y1="0" y2="0" stroke="white" strokeWidth="1" />
            {tafs.map((taf,i)=><circle onClick={goto} ref={(element) => reftl_circles.current[i] = element} key={i} data-id={i} className="tl_circles" id={taf.name} cx = "0" cy = "0" r = "13px"/>)}
            {/* <animated.circle
                ref={reftl_TheCircle}
                className="tl_TheCircle"
                cx={x}
                cy={y}
                r="13px"
                style={{ touchAction: 'none'}}/> */}
        </animated.svg>
    </>
}

export default function Overlay() {
    const {restart} = useGame();
    return (
        <div className="overlay">
            <div className="romainal" onClick={restart}>
            ROMAIN <br/>AL.
            </div>
            <div className="artvisuel">
            visual
            <br />
            artist
            </div>
            <div className="buttons">
                <Buttons/>
            </div>
            <Timeline/>
        </div>
    )
  }
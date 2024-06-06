import { Grid, Glitch, Noise, Vignette, EffectComposer, Bloom, ToneMapping } from '@react-three/postprocessing'
import { GlitchMode, BlendFunction, ToneMappingMode } from 'postprocessing'

export default function PostProd() {
    return (
      <EffectComposer disableNormalPass>
        {/* <WaterEffect factor={0.5} /> */}
        {/* <Glitch
            delay={ [ 1, 5 ] }
            duration={ [ 0.1, 0.9 ] }
            strength={ [ 0.1, 0.4 ] }
            mode={ GlitchMode.SPORADIC }
            ratio={0.85} 
            active={true}
        /> */}
        <Bloom 
            mipmapBlur 
            luminanceThreshold={0} 
            intensity={1}/>
        {/* <BrightnessContrast brightness={0} contrast={0.25} /> */}
        <Noise
            opacity={0.5} 
            blendFunction={ BlendFunction.MULTIPLY }
        />
        {/* <ToneMapping 
            mode={ ToneMappingMode.ACES_FILMIC }  /> */}
        <Vignette
            offset={ 0.3 }
            darkness={ 0.9 }
            blendFunction={ BlendFunction.NORMAL }
        />
      </EffectComposer>
    )
  }
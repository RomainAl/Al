import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import { Vector3 } from 'three';

export default create(subscribeWithSelector((set) =>
{
    return {
        tafs: [
            {   name: 'Performances',
                position: new Vector3(0,0,1)
            }, 
            {   name: 'Documentaries',
                position: new Vector3(1,0,0)
            }, 
            {   name: 'Clips',
                position: new Vector3(0,0,-1)
            }, 
            {   name: 'Teasers',
                position: new Vector3(-1,0,0)
            }, 
            {   name: 'Captations',
                position: new Vector3(0,1,0)
            }],
        speedTransition: 0.8,

        phase: 'Restart',
        position_start: new Vector3(0,0,8),
        position: new Vector3(0,0,8),
        tafcurrent: 0,
        htmlMeshScale: 0.4,

        gototaf: (tafcurrent) =>
            {
                set((state) =>
                {
                    if (tafcurrent != state.tafcurrent)
                        return { phase: 'Navigate', tafcurrent: tafcurrent, position: state.tafs[tafcurrent].position }
                    return {}
                })
            },

        restart: () =>
            {
                set((state) =>
                {
                    return { phase: 'Restart', position:  state.position_start}
                })
            },
    }
}))
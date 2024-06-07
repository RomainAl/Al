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

        phase: 'Restart',
        position: new Vector3(0,0,8),

        gototaf: (name) =>
        {
            set((state) =>
            {
                return { phase: name, position: state.tafs.find(taf=>taf.name===name).position }
            })
        },

        restart: () =>
            {
                set((state) =>
                {
                    return { phase: 'Restart', position: new Vector3(0,0,8) }
                })
            },
    }
}))
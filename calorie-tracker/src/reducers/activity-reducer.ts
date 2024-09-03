import { Activity } from "../types"

export type ActivityActions = {

    type: 'save-activity', payload: { newActivity: Activity }




}

type ActivityState = {

    activities: Activity[]
}
export const initialState: ActivityState = {

    activities: []
}

export const activitiReducer = (

    state: ActivityState = initialState,
    action: ActivityActions
) => {

    if (action.type === 'save-activity') {
        //este codigo maneja la logica para ejecutar state
       return{

        ...state,
        activities:[...state.activities,action.payload.newActivity]
       }

    }
    return state
}
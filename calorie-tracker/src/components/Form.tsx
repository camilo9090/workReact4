
import { useState, ChangeEvent, Dispatch, FormEvent, useEffect } from "react"
import { categories } from "../data/categories"
import { Activity } from "../types"
import { ActivityActions, ActivityState } from "../reducers/activity-reducer"
import { v4 as uuidv4 } from 'uuid'


type FormProps = {

    dispatch: Dispatch<ActivityActions>,
    state: ActivityState
}

const initialState: Activity = {
    id: uuidv4(),
    category: 1,
    name: '',
    calories: 0
}

export default function Form({ dispatch, state }: FormProps) {


    const [activity, setactivity] = useState<Activity>(initialState)

    useEffect(() => {
        if (state.activeId) {
            const selectActivity = 
            state.activities.filter(Stateactivity => Stateactivity.id === state.activeId)[0]
            setactivity(selectActivity)

        }

    }, [state.activeId])
    const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
        //comprueba si es numero o no
        const isNumberField = ['category', 'calories'].includes(e.target.id)


        setactivity({
            ...activity,
            [e.target.id]: isNumberField ? +e.target.value : e.target.value

        })


    }
    const isValidActivity = () => {

        const { name, calories } = activity


        return name.trim() !== '' && calories > 0
    }


    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {

        e.preventDefault()
        dispatch({ type: "save-activity", payload: { newActivity: activity } })

        setactivity({

            ...initialState,
            id: uuidv4()

        })

    }
    return (
        <form
            className="space-y-5 bg-white shadow p-10 rounded-lg"
            onSubmit={handleSubmit}
        >
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="category" className="font-bold">Categorias:</label>
                <select
                    id="category"
                    className="border border-slate-300 p-2 rounded-lg bg-white"
                    value={activity.category}
                    onChange={handleChange}
                >

                    {categories.map(category => (

                        <option
                            key={category.id}
                            value={category.id}
                        >
                            {category.name}</option>
                    ))}
                </select>

            </div>
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="name" className="font-bold">Actividad:</label>
                <input id="name" type="text"
                    className="border border-slate-300 p-2 rounded-lg"
                    placeholder="Ej. Comida,Jugo de Naranja,Ensalada,Ejercicio,Pesas,Etc"
                    value={activity.name}
                    onChange={handleChange}
                />
            </div>
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="calories" className="font-bold">Calorias:</label>
                <input id="calories" type="number"
                    className="border border-slate-300 p-2 rounded-lg"
                    placeholder="Calorias Ej.300 o 500 "
                    value={activity.calories}
                    onChange={handleChange}
                />
            </div>

            <input type="submit"
                className="bg-gray-800 hover:bg-gray-900 w-full 
                p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10"
                value={activity.category === 1 ? 'Guardar Comida' : 'Guardar Ejercicio'}
                disabled={!isValidActivity()} />
        </form>
    )
}

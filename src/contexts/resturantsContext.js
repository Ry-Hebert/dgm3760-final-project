import React, {
    useState,
    useContext,
    createContext,
    useEffect
} from 'react'
import axios from 'axios'
    
const apiURL = ''

const ResturantsContext = createContext({
    resturantsList: [],
})

export const ResturantsContextProvider = (props) => {
    const [resturantsList, setResturantsList] = useState([])

    useEffect(() =>{
        const fetchData = async () =>{
            try {
                const apiRes = await axios.get(apiURL)
                
                const resData = await apiRes.data

                console.log(`This is apiRes: ${apiRes} This is resData: ${resData}`)

                setResturantsList(resData)

            } catch(error){console.log(error)}
        }
        fetchData('resturantsList')
    }, [])

    console.log(`This is the manifest: ${resturantsList}`)
    console.log(resturantsList)

    return (
        <ResturantsContext.Provider value={{ resturantsList }}>
        {props.children}
        </ResturantsContext.Provider>
    )
}

export const useResturnatsContext = () => useContext(ResturantsContext)
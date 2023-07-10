import { useEffect } from "react";
import { useParams } from "react-router-dom";

export function CharacterInfo(){
    const params = useParams();
    useEffect(() => {
        console.log(params)
    }, [params])
    return(
        <div>Hola soy un personaje</div>
    )
}
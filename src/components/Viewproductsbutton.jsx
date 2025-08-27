import { useNavigate } from "react-router-dom"


export default function Viewproductsbutton({text,classname}){
let navigate=useNavigate()

    return (
            <button onClick={()=>navigate('/products')} className={classname}>{text}</button>

    )
}
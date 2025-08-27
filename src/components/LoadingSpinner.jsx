import ClipLoader from "react-spinners/ClipLoader";
export default function LoadingSpinner(){
    return (
         <div className="centered container">
                <ClipLoader className="loading-spinner" color="red" size={100} />  
            </div>
    )
}
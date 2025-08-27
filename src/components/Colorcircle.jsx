export default function Colorcircle({color,className,onClick}){
    let classn='coloredspan '+className
    return (
        <>
            <span onClick={onClick}   className={classn} style={{backgroundColor:color,cursor:'pointer'}}>.</span> 
        </>
    )
}
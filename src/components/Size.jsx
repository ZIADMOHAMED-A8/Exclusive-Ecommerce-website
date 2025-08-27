export default function Size({size,className,...props}){
    let classn=`size ${className || ''}`
    return (
        <span {...props} style={{ cursor: 'pointer'}} className={classn}>{size}</span>        
    )
}

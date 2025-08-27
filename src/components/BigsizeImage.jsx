import speakerImage from '../assets/Frame 600.png'
export default function BigsizeImage(){
    return (
        <div className='container'>
            <img style={{width:'100%'}} src={speakerImage}></img>
        </div>
    )
}
import SectionHeader from "./SectionHeader";
import psImage from '../assets/ps.png'
import perfumeImage from '../assets/perfume.png'
import speakerImage from '../assets/speakers.png'
import womenImage from '../assets/women.png'

export default function Newarrival(){
    return(
        <div style={{marginTop:'100px'}} className="container">
               <SectionHeader  redtext={'Featured'} headertext={'New Arrival'}></SectionHeader>
               <div style={{marginTop:'50px'}} className="Newarrivalcontainer">
                    <div>
                        <img style={{height:'100%', width: '100%'}} src={psImage}></img>
                    </div>
                    <div className="minorarrivalimagescontainer">
                        <div>
                            <img src={womenImage} style={{width:'100%'}}></img>
                        </div>
                        <div className="minorarrivalimages">
                            <img src={speakerImage}></img>
                            <img src={perfumeImage}></img>

                        </div>
                    </div>
               </div>

        </div>
    )
}
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export interface TutorialProps{
    title?: string,
    description?: string
}

const Tutorial: React.FC<TutorialProps> = ({title, description})=>{
    return (
        <Link to={'/'}>
            <div className="card">
                
                <div style={{display:'flex'}}>
                    <div className="card-header-title">{title}</div>
                    <FontAwesomeIcon icon={faXmark}/>
                </div>
                
                <div className="card-content">{description}</div>
                
            </div>
        </Link>
    )
}

export default Tutorial;
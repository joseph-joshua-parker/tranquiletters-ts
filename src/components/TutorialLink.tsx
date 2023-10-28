import { TUTORIAL_KEYS } from "../shared/tutorialData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
interface TutorialLinkProps {
    link: TUTORIAL_KEYS
}

const TutorialLink: React.FC<TutorialLinkProps> = ({link})=>{
    
    return <Link replace={true} style={{marginLeft: '0.75rem', width: '0.75rem', color:'dimgray'}} to={link}>
        <FontAwesomeIcon icon={faQuestion}/>
</Link>
} 

export default TutorialLink;
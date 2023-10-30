import { ReactNode } from 'react';
import './withPanelStyles.css'

interface WithPanelProps {
    children: ReactNode
}

export const WithPanel:React.FC<WithPanelProps> = ({children})=>{
    return (
        <div className="panel-block param center-content vertical">
            <fieldset>
                {children}
            </fieldset>
        </div>
    )
}

export default WithPanel;
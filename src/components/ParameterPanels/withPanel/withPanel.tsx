import { ReactNode } from 'react';
import './withPanelStyles.css'

interface WithPanelProps {
    children: ReactNode
}

export const WithPanel:React.FC<WithPanelProps> = ({children})=>{
    return (
        <div className="panel column is-4">

                <div className="panel-block param center-content vertical">
                    <fieldset>
                        {children}
                    </fieldset>
                </div>
        </div>
    )
}

export default WithPanel;
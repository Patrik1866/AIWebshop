import React from "react";
import "../styles/LoadingBanner.css"

interface LoadingBannerProps {
    message: string;    
}

const LoadingBanner: React.FC<LoadingBannerProps> = ({message}) => {


    return (
        <> 
            <div id="loading-banner-container" className="loading-banner-container">
                <div className="loading-banner">
                    <div className="banner-header">
                        <span>Kérem várjon</span>
                    </div>
                    <div className="banner-content">
                        <span>{message}</span>
                    </div>
                </div>
            </div>
        </>

    )
}

export default LoadingBanner;
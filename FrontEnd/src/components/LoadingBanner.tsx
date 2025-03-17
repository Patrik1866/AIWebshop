import React from "react";

interface LoadingBannerProps {
    message: string;    
}

const LoadingBanner: React.FC<LoadingBannerProps> = ({message}) => {


    return (
        <>
          <div className="fixed inset-0  backdrop-blur-md flex justify-center items-center z-50 animate-fade-in">
            <div className="bg-white rounded-lg shadow-lg p-6 text-center ">
              <div className="text-xl font-bold mb-4">
                <span>Kérem várjon</span>
              </div>
              <div className="text-lg">
                <span>{message}</span>
              </div>
            </div>
          </div>
        </>
      );
}

export default LoadingBanner;
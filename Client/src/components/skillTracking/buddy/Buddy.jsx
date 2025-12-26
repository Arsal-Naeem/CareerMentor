import React, { useState } from "react";

const poseMap = {
  waving: "/buddy.png",
  standing: "/src/assets/mascot/standing.webp",
  laptop: "/src/assets/mascot/laptop.webp",
  explaining: "/src/assets/mascot/explaining.webp",
  explainingBook: "/src/assets/mascot/explainingBook.webp",
  tablet: "/src/assets/mascot/tablet.webp",
  thumbsUp: "/src/assets/mascot/thumbsUp.webp",
};

export const Buddy = ({
  pose = "waving",
  alt = "Lumo",
  className = "",
  size = "large", // small, medium, large, xl
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleImageLoad = () => {
    setIsLoaded(true);
    setHasError(false);
  };

  const handleImageError = () => {
    console.warn(`Failed to load image for pose: ${pose}`);
    setHasError(true);
    setIsLoaded(true);
  };

  // Size configurations
  const sizeClasses = {
    small: "w-32 h-32",
    medium: "w-48 h-48",
    large: "w-64 h-64",
    xl: "w-80 h-80",
  };

  const containerSize = sizeClasses[size] || sizeClasses.large;

  // Fallback component when image fails to load
  const FallbackBuddy = () => (
    <div
      className="w-full h-full rounded-full flex items-center justify-center text-white text-4xl font-bold"
      style={{ backgroundColor: "#5A9BD4" }}
    >
      🤖
    </div>
  );

  return (
    <div
      className={`${containerSize} relative flex items-center justify-center ${className}`}
    >
      {/* Loading state */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "#F3D5B7" }}
          >
            <div
              className="w-8 h-8 rounded-full"
              style={{ backgroundColor: "#E07A5F" }}
            ></div>
          </div>
        </div>
      )}

      {/* Main Buddy Image or Fallback */}
      {hasError ? (
        <FallbackBuddy />
      ) : (
        <img
          src={poseMap[pose]}
          alt={alt}
          className="w-full h-full object-contain transition-opacity duration-300 hover:opacity-90 cursor-pointer filter drop-shadow-lg"
          style={{
            opacity: isLoaded ? 1 : 0,
          }}
          onLoad={handleImageLoad}
          onError={handleImageError}
          draggable={false}
        />
      )}

      {/* Subtle hover effect overlay */}
      <div
        className="absolute inset-0 rounded-full opacity-0 hover:opacity-10 transition-opacity duration-300 pointer-events-none"
        style={{ backgroundColor: "#5A9BD4" }}
      ></div>

      {/* Development mode indicator */}

      <div
        className="absolute bottom-2 left-2 text-white text-xs px-2 py-1 rounded"
        style={{ backgroundColor: "#6C7B7F" }}
      >
        {pose}
      </div>
    </div>
  );
};

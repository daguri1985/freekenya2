import React, { useRef, useState } from 'react';

const VideoPlayer = () => {
  const videoRef = useRef(null); // Ref for the video element
  const [isPlaying, setIsPlaying] = useState(false); // State to track play/pause

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause(); // Pause the video
      } else {
        videoRef.current.play(); // Play the video
        videoRef.current.muted = false; // Unmute the video
      }
      setIsPlaying(!isPlaying); // Toggle the play/pause state
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center min-h-screen bg-gray-100 p-6">
      {/* Video Player */}
      <div className="w-full md:w-1/2 lg:w-2/3 mb-6 md:mb-0 md:mr-6">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="relative">
            <video 
              ref={videoRef} 
              className="w-full h-auto"
              controls // Show default video controls
              muted // Muted by default to allow autoplay
              loop
              poster="/freekenya13.jpg" // Optional: Add a poster frame (thumbnail) for the video
            >
              <source src="/bob.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {/* Custom Play/Pause Button */}
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center">
                <button 
                  className="bg-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:bg-gray-100 transition-all"
                  onClick={handlePlayPause} // Use the handlePlayPause function
                >
                  <svg 
                    className="w-8 h-8 text-gray-700" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                    ></path>
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Title and Description */}
      <div className="w-full md:w-1/2 lg:w-1/3 bg-white rounded-lg shadow-xl p-6">
        <h2 className="text-xl font-bold text-gray-800">2027: A New Era of Leadership</h2>
        <p className="mt-2 text-gray-600">
          Join the movement to reshape the future! In 2027, let’s make history by electing independent candidates as the majority—leaders who prioritize <strong>people over politics</strong>, <strong>progress over promises</strong>, and <strong>action over agendas</strong>. Together, we can build a government that truly represents the voices of the people. The power is in your hands. Are you ready to vote for change? 🗳️✨
        </p>
        <div className="mt-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all">
            Join the Movement
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
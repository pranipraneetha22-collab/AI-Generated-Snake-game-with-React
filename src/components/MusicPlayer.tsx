import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX } from 'lucide-react';

const TRACKS = [
  { 
    id: 1, 
    title: 'DATA_STREAM_01', 
    artist: 'SYS.AUDIO', 
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', 
    cover: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&q=80&w=200&h=200' 
  },
  { 
    id: 2, 
    title: 'CORRUPT_SECTOR', 
    artist: 'SYS.AUDIO', 
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', 
    cover: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=200&h=200' 
  },
  { 
    id: 3, 
    title: 'VOID_PROTOCOL', 
    artist: 'SYS.AUDIO', 
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', 
    cover: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=200&h=200' 
  },
];

export default function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentTrack = TRACKS[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error("Audio playback failed:", error);
          setIsPlaying(false);
        });
      }
    } else if (!isPlaying && audioRef.current) {
      audioRef.current.pause();
    }
  }, [isPlaying, currentTrackIndex]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const skipForward = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    setProgress(0);
  };

  const skipBack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    setProgress(0);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      if (duration) {
        setProgress((current / duration) * 100);
      }
    }
  };

  const handleEnded = () => {
    skipForward();
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current) {
      const bounds = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - bounds.left;
      const percentage = x / bounds.width;
      audioRef.current.currentTime = percentage * audioRef.current.duration;
      setProgress(percentage * 100);
    }
  };

  return (
    <div className="w-full bg-black p-4 flex flex-col gap-6 font-pixel">
      <audio
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />
      
      <div className="flex items-start gap-4 border-b-4 border-[#FF00FF] pb-6">
        <div className="w-20 h-20 shrink-0 border-4 border-[#00FFFF] overflow-hidden relative">
          <img 
            src={currentTrack.cover} 
            alt={currentTrack.title} 
            className={`w-full h-full object-cover filter grayscale contrast-200 ${isPlaying ? 'animate-pulse' : ''}`}
          />
          <div className="absolute inset-0 bg-[#FF00FF] mix-blend-multiply opacity-60"></div>
        </div>
        
        <div className="flex-1 min-w-0 flex flex-col justify-center gap-2">
          <h3 className="text-[#00FFFF] text-xs truncate">
            ID: {currentTrack.title.toUpperCase()}
          </h3>
          <p className="text-[#FF00FF] text-[10px] truncate">
            SRC: {currentTrack.artist.toUpperCase()}
          </p>
          <div className="text-[#00FFFF] text-[10px] animate-pulse">
            {isPlaying ? 'STATUS: ACTIVE' : 'STATUS: IDLE'}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="flex gap-3">
          <button 
            onClick={skipBack}
            className="w-12 h-12 flex items-center justify-center border-4 border-[#00FFFF] text-[#00FFFF] hover:bg-[#00FFFF] hover:text-black active:translate-y-1 transition-colors"
          >
            <span className="text-xs">{'<<'}</span>
          </button>
          
          <button 
            onClick={togglePlay}
            className="w-16 h-12 flex items-center justify-center border-4 border-[#FF00FF] text-[#FF00FF] hover:bg-[#FF00FF] hover:text-black active:translate-y-1 transition-colors"
          >
            <span className="text-xs">{isPlaying ? '||' : '>'}</span>
          </button>
          
          <button 
            onClick={skipForward}
            className="w-12 h-12 flex items-center justify-center border-4 border-[#00FFFF] text-[#00FFFF] hover:bg-[#00FFFF] hover:text-black active:translate-y-1 transition-colors"
          >
            <span className="text-xs">{'>>'}</span>
          </button>
        </div>

        <div className="flex items-center gap-2 flex-1 justify-end">
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className="text-[#FF00FF] hover:text-[#00FFFF] text-[10px]"
          >
            {isMuted || volume === 0 ? 'VOL:0' : 'VOL:1'}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={isMuted ? 0 : volume}
            onChange={(e) => {
              setVolume(parseFloat(e.target.value));
              setIsMuted(false);
            }}
            className="w-24 h-3 bg-black border-2 border-[#00FFFF] appearance-none cursor-pointer accent-[#FF00FF]"
          />
        </div>
      </div>

      {/* Blocky Progress Bar */}
      <div className="flex flex-col gap-2">
        <div 
          className="h-6 border-4 border-[#00FFFF] bg-black cursor-pointer relative flex p-1"
          onClick={handleProgressClick}
        >
          <div 
            className="h-full bg-[#FF00FF] transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-right text-[10px] text-[#00FFFF]">
          MEM_DUMP: {Math.floor(progress)}%
        </div>
      </div>
    </div>
  );
}

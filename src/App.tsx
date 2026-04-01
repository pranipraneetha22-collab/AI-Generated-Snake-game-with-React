import React, { useState } from 'react';
import SnakeGame from './components/SnakeGame';
import MusicPlayer from './components/MusicPlayer';

export default function App() {
  const [score, setScore] = useState(0);

  return (
    <div className="min-h-screen bg-black text-[#00FFFF] font-sans overflow-hidden flex flex-col items-center justify-center p-4 relative screen-tear selection:bg-[#FF00FF] selection:text-black">
      <div className="static-noise"></div>
      <div className="scanlines"></div>

      <div className="z-10 w-full max-w-6xl flex flex-col items-center gap-8 lg:gap-12">
        <header className="text-center w-full flex flex-col items-center border-b-4 border-[#FF00FF] pb-6">
          <h1 className="text-4xl md:text-6xl font-pixel text-[#FF00FF] glitch-text mb-6" data-text="SNAKE_PROTOCOL.EXE">
            SNAKE_PROTOCOL.EXE
          </h1>
          <div className="inline-flex items-center justify-center gap-4 px-6 py-3 border-4 border-[#00FFFF] bg-black">
            <span className="text-sm text-[#FF00FF] font-pixel">DATA.SCORE</span>
            <span className="text-2xl font-pixel text-[#00FFFF]">
              {score.toString().padStart(4, '0')}
            </span>
          </div>
        </header>

        <main className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-8 lg:gap-16 w-full">
          <div className="flex-1 flex justify-center lg:justify-end w-full max-w-[500px]">
            <SnakeGame 
              onScoreUpdate={setScore} 
              onGameOver={() => {}} 
            />
          </div>

          <div className="w-full max-w-[400px] flex flex-col gap-8 items-center lg:items-start">
            <div className="w-full border-4 border-[#00FFFF] p-1 bg-black">
              <div className="bg-[#00FFFF] text-black font-pixel text-xs p-2 mb-2 uppercase">
                MODULE: AUDIO_STREAM
              </div>
              <MusicPlayer />
            </div>
            
            <div className="w-full bg-black border-4 border-[#FF00FF] p-6">
              <h3 className="text-[#FF00FF] font-pixel text-sm mb-6 flex items-center gap-3">
                <span className="w-4 h-4 bg-[#00FFFF] animate-ping"></span>
                SYS.CONTROLS
              </h3>
              <ul className="text-[#00FFFF] text-sm space-y-6 font-pixel leading-loose">
                <li className="flex items-center justify-between border-b-2 border-[#00FFFF]/30 pb-2">
                  <span>VECTOR</span>
                  <span className="text-[#FF00FF]">W A S D</span>
                </li>
                <li className="flex items-center justify-between border-b-2 border-[#00FFFF]/30 pb-2">
                  <span>HALT</span>
                  <span className="text-[#FF00FF]">SPACE</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>REBOOT</span>
                  <span className="text-[#FF00FF]">ENTER</span>
                </li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

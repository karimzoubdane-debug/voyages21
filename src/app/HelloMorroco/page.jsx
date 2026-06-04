"use client";

import { useEffect, useRef, useState } from "react";

const TITLE_TRANSLATIONS = [
  { start: 2.7, end: 4.1, title: "The Blue of Chefchaouen" },
  { start: 4.1, end: 5.45, title: "The Story of Ait Benhaddou" },
  { start: 5.45, end: 6.85, title: "The Grandeur of Casablanca" },
  { start: 6.85, end: 8.3, title: "The Energy of Marrakech" },
  { start: 8.3, end: 10, title: "The Magic of the Sahara" },
  { start: 10, end: 11.25, title: "The Breeze of Essaouira" },
  { start: 11.25, end: 12.55, title: "The Gateway to Tangier" },
  { start: 12.55, end: 13.9, title: "The Sun of Agadir" },
  { start: 13.9, end: 15.2, title: "The Elegance of Riads" },
  { start: 15.2, end: 16.55, title: "Your Haven of Peace" },
  { start: 16.55, end: 17.9, title: "The Flavors of Morocco" },
  { start: 17.9, end: 20.2, title: "Contact us for your 2026 adventure" },
];

export default function HelloMorrocoCover() {
  const [wechatOpen, setWechatOpen] = useState(false);
  const [videoTime, setVideoTime] = useState(0);
  const videoRef = useRef(null);

  useEffect(() => {
    let frameId;
    const tick = () => {
      if (videoRef.current) {
        setVideoTime(videoRef.current.currentTime || 0);
      }
      frameId = requestAnimationFrame(tick);
    };
    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, []);

  const activeTitle = TITLE_TRANSLATIONS.find((item) => videoTime >= item.start && videoTime < item.end);

  return (
    <main className="cover" aria-label="Hello Morocco">
      <div className="videoStage">
        <video
          ref={videoRef}
          className="coverVideo"
          src="/WelcomeChina/assets/hello-morocco-cover.mp4?v=20260604-hello-morocco"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
        <div className="chinaIntro" aria-hidden="true">
          <span>WELCOME CHINA</span>
        </div>
        {activeTitle && (
          <div className="titleTranslation" aria-hidden="true">
            {activeTitle.title}
          </div>
        )}
        <a className="hotspot start" href="/WelcomeChina/" aria-label="La magie commence ici" />
        <button className="hotspot contact" type="button" aria-label="Nous contacter" onClick={() => setWechatOpen(true)} />
      </div>

      {wechatOpen && (
        <div className="wechatModal" role="dialog" aria-modal="true" aria-label="WeChat contact" onClick={() => setWechatOpen(false)}>
          <div className="wechatBox" onClick={(event) => event.stopPropagation()}>
            <button className="wechatClose" type="button" aria-label="Fermer" onClick={() => setWechatOpen(false)}>
              x
            </button>
            <img src="/WelcomeChina/assets/wechat-qr.jpeg" alt="Voyages 21 WeChat QR code" />
          </div>
        </div>
      )}

      <style jsx>{`
        :global(html),
        :global(body) {
          margin: 0;
          min-height: 100%;
          background: #071711;
        }

        :global(body > header),
        :global(body > footer),
        :global(.whatsapp-btn) {
          display: none !important;
        }

        .cover {
          position: fixed;
          inset: 0;
          z-index: 10000;
          min-height: 100vh;
          min-height: 100svh;
          overflow: hidden;
          background: #000;
        }

        .videoStage {
          position: fixed;
          top: 50%;
          left: 50%;
          width: 100vw;
          height: 56.25vw;
          min-height: 100vh;
          min-height: 100svh;
          min-width: 177.7778vh;
          min-width: 177.7778svh;
          transform: translate(-50%, -50%);
        }

        .coverVideo,
        .chinaIntro {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }

        .coverVideo {
          z-index: 1;
          display: block;
          object-fit: cover;
          background: #a80f18;
        }

        .chinaIntro {
          z-index: 4;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #a80f18;
          pointer-events: none;
          animation: chinaIntroFade 2.65s ease forwards;
        }

        .chinaIntro span {
          color: #d8ad3f;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(2.8rem, 7.6vw, 8rem);
          font-weight: 900;
          letter-spacing: 0.08em;
          text-shadow: 0 10px 34px rgba(42, 0, 0, 0.48);
          white-space: nowrap;
        }

        @keyframes chinaIntroFade {
          0%,
          62% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            visibility: hidden;
          }
        }

        .titleTranslation {
          position: absolute;
          z-index: 3;
          left: 50%;
          top: 37.2%;
          width: min(58%, 880px);
          min-height: 74px;
          display: flex;
          align-items: center;
          justify-content: center;
          transform: translateX(-50%);
          padding: 8px 36px;
          border-radius: 999px;
          background: linear-gradient(90deg, rgba(83, 15, 16, 0.78), rgba(21, 58, 45, 0.7));
          color: #fff8ea;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(1.45rem, 3.1vw, 3.4rem);
          font-weight: 800;
          text-align: center;
          line-height: 1;
          text-shadow: 0 5px 22px rgba(0, 0, 0, 0.52);
          pointer-events: none;
        }

        .hotspot {
          position: absolute;
          z-index: 6;
          top: 79%;
          height: 14%;
          border: 0;
          padding: 0;
          background: transparent;
          color: transparent;
          cursor: pointer;
          text-decoration: none;
          outline-offset: 6px;
        }

        .hotspot.start {
          left: 17.8%;
          width: 29.2%;
        }

        .hotspot.contact {
          left: 52.9%;
          width: 29.2%;
        }

        .wechatModal {
          position: fixed;
          inset: 0;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background: rgba(0, 0, 0, 0.18);
        }

        .wechatBox {
          position: relative;
          width: min(330px, 88vw);
          background: #fff;
          border-radius: 10px;
          padding: 12px;
          box-shadow: 0 24px 70px rgba(0, 0, 0, 0.4);
        }

        .wechatBox img {
          width: 100%;
          height: auto;
          display: block;
          border-radius: 6px;
        }

        .wechatClose {
          position: absolute;
          top: -14px;
          right: -14px;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          border: 0;
          background: #fff;
          color: #12382f;
          font-size: 1.1rem;
          font-weight: 900;
          cursor: pointer;
          box-shadow: 0 8px 22px rgba(0, 0, 0, 0.24);
        }

        @media (max-width: 640px) {
          .chinaIntro span {
            font-size: clamp(2rem, 9vw, 4.4rem);
          }

          .titleTranslation {
            top: 36.8%;
            width: 72%;
            min-height: 52px;
            padding: 7px 18px;
            font-size: clamp(1rem, 4.2vw, 1.75rem);
          }

          .hotspot {
            top: 78.5%;
            height: 15%;
          }
        }
      `}</style>
    </main>
  );
}

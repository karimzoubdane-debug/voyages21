"use client";

import { useEffect, useRef, useState } from "react";

export default function HelloMorrocoCover() {
  const [wechatOpen, setWechatOpen] = useState(false);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    const toolbarPatterns = ["vercel toolbar", "vercel-toolbar", "_vercel"];
    const removeToolbar = () => {
      document.querySelectorAll("iframe, button, div, aside").forEach((node) => {
        const text = [
          node.id,
          node.className,
          node.getAttribute("aria-label"),
          node.getAttribute("title"),
          node.getAttribute("src"),
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        if (toolbarPatterns.some((pattern) => text.includes(pattern))) {
          node.remove();
        }
      });
    };
    removeToolbar();
    const observer = new MutationObserver(removeToolbar);
    observer.observe(document.documentElement, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  const toggleSound = () => {
    const nextMuted = !muted;
    setMuted(nextMuted);
    if (videoRef.current) {
      videoRef.current.muted = nextMuted;
      if (!nextMuted) videoRef.current.play().catch(() => {});
    }
  };

  return (
    <main className="cover" aria-label="Hello Morocco">
      <div className="videoStage">
        <video
          ref={videoRef}
          className="coverVideo"
          src="/WelcomeChina/assets/hello-morocco-cover.mp4?v=20260604-new-cover"
          autoPlay
          muted={muted}
          loop
          playsInline
          preload="metadata"
          controls={false}
          webkit-playsinline="true"
          x5-playsinline="true"
          x5-video-player-type="h5-page"
          x5-video-player-fullscreen="false"
        />
        <div className="chinaIntro" aria-hidden="true">
          <span>
            <span>WELCOME</span>
            <span>CHINA</span>
          </span>
        </div>
        <button className="soundToggle" type="button" aria-label={muted ? "Activer le son" : "Couper le son"} onClick={toggleSound}>
          {muted ? "Sound" : "Mute"}
        </button>
        <a className="hotspot start" href="/WelcomeChina/" aria-label="The magic starts here">
          <span>The magic starts here</span>
        </a>
        <button className="hotspot contact" type="button" aria-label="Nous contacter" onClick={() => setWechatOpen(true)} />
      </div>

      {wechatOpen && (
        <div className="wechatModal" role="dialog" aria-modal="true" aria-label="WeChat contact" onClick={() => setWechatOpen(false)}>
          <div className="wechatBox" onClick={(event) => event.stopPropagation()}>
            <button className="wechatClose" type="button" aria-label="Fermer" onClick={() => setWechatOpen(false)}>
              x
            </button>
            <img src="/WelcomeChina/assets/wechat-qr.jpeg" alt="Voyages 21 WeChat QR code" />
            <a className="wechatSave" href="/WelcomeChina/assets/wechat-qr.jpeg" download>
              Save QR / 保存二维码
            </a>
          </div>
        </div>
      )}

      <style jsx>{`
        :global(html),
        :global(body) {
          margin: 0;
          min-height: 100%;
          background: #071711;
          overscroll-behavior: none;
          touch-action: manipulation;
        }

        :global(body > header),
        :global(body > footer),
        :global(.whatsapp-btn),
        :global([data-vercel-toolbar]),
        :global([data-vercel-toolbar-button]),
        :global([id*="vercel-toolbar" i]),
        :global([class*="vercel-toolbar" i]),
        :global(iframe[src*="vercel" i]) {
          display: none !important;
          visibility: hidden !important;
          pointer-events: none !important;
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
          object-position: center center;
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
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.28em;
          color: #d8ad3f;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(2.8rem, 7.6vw, 8rem);
          font-weight: 900;
          letter-spacing: 0.08em;
          text-shadow: 0 10px 34px rgba(42, 0, 0, 0.48);
          white-space: nowrap;
        }

        .chinaIntro span span {
          display: inline-block;
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
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
        }

        .hotspot span {
          display: none;
        }

        .hotspot.start {
          left: 17.8%;
          width: 29.2%;
        }

        .hotspot.contact {
          left: 52.9%;
          width: 29.2%;
        }

        .soundToggle {
          position: absolute;
          z-index: 7;
          right: 18px;
          top: 18px;
          min-width: 72px;
          height: 36px;
          border: 1px solid rgba(255, 255, 255, 0.48);
          border-radius: 999px;
          background: rgba(10, 18, 15, 0.58);
          color: #fff8ea;
          font-family: Arial, sans-serif;
          font-size: 0.76rem;
          font-weight: 800;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
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
          -webkit-backdrop-filter: blur(2px);
          backdrop-filter: blur(2px);
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

        .wechatSave {
          display: block;
          margin-top: 10px;
          padding: 12px 14px;
          border-radius: 8px;
          background: #12382f;
          color: #fff;
          font-family: Arial, sans-serif;
          font-size: 0.95rem;
          font-weight: 800;
          text-align: center;
          text-decoration: none;
        }

        @media (max-width: 640px) {
          .videoStage {
            width: 100vw;
            height: 56.25vw;
            min-height: 100vh;
            min-height: 100svh;
            min-width: 177.7778vh;
            min-width: 177.7778svh;
          }

          .coverVideo {
            object-fit: cover;
            object-position: 50% 50%;
          }

          .chinaIntro {
            position: fixed;
          }

          .chinaIntro span {
            flex-direction: column;
            gap: 0;
            font-size: clamp(2.5rem, 14vw, 5.7rem);
            line-height: 0.95;
            white-space: normal;
          }

          .hotspot.start {
            left: 50%;
            top: auto;
            bottom: max(28px, env(safe-area-inset-bottom));
            width: min(280px, 78vw);
            height: 46px;
            transform: translateX(-50%);
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border: 1px solid rgba(216, 173, 63, 0.78);
            border-radius: 999px;
            background: rgba(168, 15, 24, 0.86);
            color: #fff8ea;
            box-shadow: 0 14px 38px rgba(0, 0, 0, 0.28);
            backdrop-filter: blur(3px);
          }

          .hotspot.start span {
            display: block;
            font-family: Georgia, "Times New Roman", serif;
            font-size: 1rem;
            font-weight: 800;
            letter-spacing: 0.02em;
          }

          .hotspot.contact {
            display: none;
          }

          .soundToggle {
            top: calc(50% - 28.125vw + 8px);
            right: 10px;
            min-width: 56px;
            height: 30px;
            font-size: 0.66rem;
          }

          .wechatModal {
            align-items: flex-end;
            padding: 16px;
          }

          .wechatBox {
            width: min(360px, 94vw);
            padding: 14px;
            border-radius: 12px;
          }

          .wechatClose {
            top: -12px;
            right: -8px;
            width: 38px;
            height: 38px;
          }
        }
      `}</style>
    </main>
  );
}

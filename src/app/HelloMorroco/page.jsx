"use client";

import { useState } from "react";

export default function HelloMorrocoCover() {
  const [wechatOpen, setWechatOpen] = useState(false);

  return (
    <main className="cover" aria-label="Hello Morocco">
      <div className="videoStage">
        <div className="introTitle" aria-hidden="true">WELCOME CHINA</div>
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

        .introTitle {
          position: absolute;
          z-index: 3;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          color: #fff8ea;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(2.6rem, 7vw, 7.5rem);
          font-weight: 800;
          letter-spacing: 0.08em;
          white-space: nowrap;
          text-shadow: 0 12px 42px rgba(0, 0, 0, 0.58);
          pointer-events: none;
          opacity: 0;
          animation: welcomeChinaFade 4.4s ease forwards;
          animation-delay: 0.5s;
        }

        @keyframes welcomeChinaFade {
          0% {
            opacity: 0;
            transform: translate(-50%, -47%);
          }
          18% {
            opacity: 1;
            transform: translate(-50%, -50%);
          }
          58% {
            opacity: 1;
            transform: translate(-50%, -50%);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -53%);
          }
        }

        .hotspot {
          position: absolute;
          z-index: 2;
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
          .hotspot {
            top: 78.5%;
            height: 15%;
          }
        }
      `}</style>
    </main>
  );
}

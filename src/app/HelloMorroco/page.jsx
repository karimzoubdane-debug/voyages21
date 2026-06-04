"use client";

import { useState } from "react";

export default function HelloMorrocoCover() {
  const [wechatOpen, setWechatOpen] = useState(false);

  return (
    <main className="cover" aria-label="Hello Morocco">
      <video
        className="coverVideo"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      >
        <source src="/WelcomeChina/assets/hello-morocco-cover.mp4" type="video/mp4" />
      </video>

      <div className="veil" />

      <section className="magazine">
        <div className="kicker">Voyages 21 presente</div>
        <h1>Hello Morocco</h1>
        <p>Luxury Morocco circuits crafted for Chinese travelers</p>
        <div className="actions">
          <a className="primary" href="/WelcomeChina/">
            La magie commence ici
          </a>
          <button className="secondary" type="button" onClick={() => setWechatOpen(true)}>
            Nous contacter
          </button>
        </div>
      </section>

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

        .cover {
          position: relative;
          min-height: 100vh;
          overflow: hidden;
          color: #fff8ea;
          font-family: "DM Sans", Arial, sans-serif;
          display: flex;
          align-items: stretch;
          justify-content: center;
        }

        .coverVideo {
          position: fixed;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          background: #071711;
        }

        .veil {
          position: fixed;
          inset: 0;
          background:
            linear-gradient(90deg, rgba(7, 23, 17, 0.84) 0%, rgba(127, 16, 22, 0.38) 44%, rgba(7, 23, 17, 0.36) 100%),
            linear-gradient(180deg, rgba(0, 0, 0, 0.14) 0%, rgba(0, 0, 0, 0.62) 100%);
          pointer-events: none;
        }

        .magazine {
          position: relative;
          z-index: 1;
          width: min(1120px, calc(100% - 40px));
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          align-items: flex-start;
          padding: 52px 0 58px;
        }

        .kicker {
          font-size: 0.78rem;
          line-height: 1;
          text-transform: uppercase;
          letter-spacing: 0.24em;
          color: #f4d56a;
          font-weight: 800;
          margin-bottom: 14px;
        }

        h1 {
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(3.5rem, 11vw, 8.8rem);
          line-height: 0.88;
          margin: 0;
          max-width: 780px;
          text-transform: uppercase;
          letter-spacing: 0;
          text-shadow: 0 10px 34px rgba(0, 0, 0, 0.5);
        }

        p {
          font-size: clamp(1rem, 2vw, 1.35rem);
          max-width: 620px;
          margin: 20px 0 28px;
          color: rgba(255, 248, 234, 0.9);
          font-weight: 700;
        }

        .actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .primary,
        .secondary {
          min-height: 48px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          padding: 0 22px;
          font: inherit;
          font-weight: 900;
          text-decoration: none;
          cursor: pointer;
          border: 1px solid rgba(255, 248, 234, 0.62);
          box-shadow: 0 12px 34px rgba(0, 0, 0, 0.26);
        }

        .primary {
          background: #d6a936;
          color: #0b251f;
          border-color: #f4d56a;
        }

        .secondary {
          background: rgba(7, 23, 17, 0.46);
          color: #fff8ea;
          backdrop-filter: blur(8px);
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
          .magazine {
            width: min(100% - 28px, 420px);
            padding-bottom: 34px;
          }

          .actions {
            width: 100%;
          }

          .primary,
          .secondary {
            width: 100%;
          }
        }
      `}</style>
    </main>
  );
}

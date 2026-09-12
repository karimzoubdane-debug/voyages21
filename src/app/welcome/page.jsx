"use client";

export default function HelloMorrocoCover() {
  return (
    <main className="cover" aria-label="Hello Morocco">
      <video
        className="coverVideo"
        src="/welcome-morocco/assets/hello-morocco-cover.mp4?v=20260605-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        controls={false}
        webkit-playsinline="true"
        x5-playsinline="true"
        x5-video-player-type="h5-page"
        x5-video-player-fullscreen="false"
      />

      <a className="magicButton" href="/welcome-morocco/" aria-label="Open WelcomeChina brochure">
        Click me to start the magic
      </a>

      <style jsx>{`
        :global(html),
        :global(body) {
          margin: 0;
          min-height: 100%;
          background: #000;
          overscroll-behavior: none;
          touch-action: manipulation;
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

        .coverVideo {
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

        .magicButton {
          position: fixed;
          z-index: 4;
          left: 50%;
          bottom: max(34px, env(safe-area-inset-bottom));
          transform: translateX(-50%);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: min(360px, 82vw);
          min-height: 52px;
          padding: 0 1.45rem;
          border: 1px solid rgba(216, 173, 63, 0.86);
          border-radius: 999px;
          background: linear-gradient(135deg, rgba(168, 15, 24, 0.92), rgba(18, 56, 47, 0.88));
          color: #fff8ea;
          box-shadow: 0 18px 48px rgba(0, 0, 0, 0.32);
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(1rem, 2vw, 1.22rem);
          font-weight: 800;
          letter-spacing: 0.02em;
          text-align: center;
          text-decoration: none;
          -webkit-tap-highlight-color: transparent;
        }

        .magicButton:hover {
          background: linear-gradient(135deg, rgba(186, 25, 33, 0.96), rgba(18, 70, 56, 0.92));
        }

        @media (max-width: 640px) {
          .magicButton {
            min-width: min(310px, 82vw);
            min-height: 48px;
            bottom: max(26px, env(safe-area-inset-bottom));
            font-size: 0.98rem;
          }
        }
      `}</style>
    </main>
  );
}

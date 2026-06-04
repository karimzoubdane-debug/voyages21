"use client";

export default function HelloMorrocoCover() {
  return (
    <main className="cover" aria-label="Hello Morocco">
      <div className="videoStage">
        <div className="chinaIntro">
          <span>WELCOME CHINA</span>
        </div>
      </div>

      <style jsx>{`
        :global(html),
        :global(body) {
          margin: 0;
          min-height: 100%;
          background: #a80f18;
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
          background: #a80f18;
        }

        .videoStage {
          position: fixed;
          inset: 0;
          width: 100vw;
          height: 100vh;
          height: 100svh;
        }

        .chinaIntro {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }

        .chinaIntro {
          display: flex;
          align-items: center;
          justify-content: center;
          background: #a80f18;
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

        @media (max-width: 640px) {
          .chinaIntro span {
            font-size: clamp(2rem, 9vw, 4.4rem);
          }
        }
      `}</style>
    </main>
  );
}

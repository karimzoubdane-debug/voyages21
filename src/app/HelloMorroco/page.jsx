"use client";

export default function HelloMorrocoCover() {
  return (
    <main className="cover" aria-label="Hello Morocco">
      <div className="chinaIntro">
        <span>
          <span>WELCOME</span>
          <span>CHINA</span>
        </span>
      </div>

      <style jsx>{`
        :global(html),
        :global(body) {
          margin: 0;
          min-height: 100%;
          background: #a80f18;
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
          background: #a80f18;
        }

        .chinaIntro {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          background: #a80f18;
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

        @media (max-width: 640px) {
          .chinaIntro span {
            flex-direction: column;
            gap: 0;
            font-size: clamp(2.5rem, 14vw, 5.7rem);
            line-height: 0.95;
            white-space: normal;
          }
        }
      `}</style>
    </main>
  );
}

import "./globals.css";

export const metadata = {
  title: "Espace personnel",
  description: "Assistant IA personnel",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}

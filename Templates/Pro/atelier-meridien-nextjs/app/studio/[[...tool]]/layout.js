/* =========================================================================
   Layout racine dédié à /studio.
   Next.js supporte plusieurs "root layouts" en utilisant des groupes de
   routes : le site (app/(site)/layout.js) et le Studio (ici) ont chacun
   leur propre <html>/<body>, complètement indépendants. Sans ça, le header,
   le bandeau et le footer du site marketing s'affichaient au-dessus du
   Studio et gênaient l'interface d'édition.
   ========================================================================= */
export const metadata = {
  title: 'Studio — Atelier Méridien',
  robots: { index: false, follow: false },
};

export default function StudioLayout({ children }) {
  return (
    <html lang="fr">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}

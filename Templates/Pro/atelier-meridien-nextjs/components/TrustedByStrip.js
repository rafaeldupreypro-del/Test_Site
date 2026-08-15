/**
 * Bandeau de preuve sociale : réutilise les noms de maîtrise d'ouvrage déjà
 * renseignés sur les projets (aucune saisie supplémentaire nécessaire).
 * N'affiche rien tant qu'il n'y a pas au moins 2 noms distincts.
 */
export default function TrustedByStrip({ clients }) {
  if (!clients || clients.length < 2) return null;

  return (
    <section className="trusted-by">
      <div className="container">
        <p className="trusted-by__label">Ils nous ont fait confiance</p>
        <div className="trusted-by__row">
          {clients.map((name) => (
            <span className="trusted-by__item" key={name}>{name}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

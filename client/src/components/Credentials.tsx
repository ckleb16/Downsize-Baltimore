export type Credential = {
  name: string;
  logo?: string;
};

type CredentialsProps = {
  credentials: Credential[];
};

export function Credentials({ credentials }: CredentialsProps) {
  const hasLogos = credentials.some((credential) => credential.logo);
  const credentialColumns = [
    credentials.filter((_, index) => index % 2 === 0),
    credentials.filter((_, index) => index % 2 === 1),
  ];

  return (
    <div className="credentials" aria-label="Mary's credentials and specialties">
      <p className="credentials__eyebrow">Credentials &amp; specialties</p>
      {hasLogos ? (
        <div className="credentials__logos">
          {credentials.map((credential) => credential.logo && (
            <img key={credential.name} src={credential.logo} alt={credential.name} title={credential.name} />
          ))}
        </div>
      ) : (
        // TODO(assets): credential logos pending from client.
        <div className="credentials__grid credentials__grid--balanced">
          {credentialColumns.map((column, columnIndex) => (
            <div className="credentials__column" key={columnIndex}>
              {column.map((credential) => <span key={credential.name}>{credential.name}</span>)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

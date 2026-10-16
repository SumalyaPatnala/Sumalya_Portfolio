import { Container } from "@/components/Container";

export function PageHeader({
  kicker,
  title,
  lede,
}: {
  kicker: string;
  title: string;
  lede?: string;
}) {
  return (
    <Container className="pt-10 pb-8 sm:pt-16 sm:pb-10">
      <p className="kicker">{kicker}</p>
      <h1 className="display mt-3 max-w-4xl text-balance text-3xl sm:text-5xl">
        {title}
      </h1>
      {lede ? (
        <p className="mt-4 max-w-2xl text-base text-fg-muted sm:text-lg">{lede}</p>
      ) : null}
    </Container>
  );
}

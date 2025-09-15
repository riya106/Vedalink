import Link from "next/link";

const NotFound = () => {

  return (
    <section className="container py-24 text-center">
      <h1 className="text-5xl font-extrabold tracking-tight">404</h1>
      <p className="mt-2 text-lg text-muted-foreground">This page doesn’t exist.</p>
      <Link href="/" className="mt-6 inline-block rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow hover:opacity-95">
        Back to Home
      </Link>
    </section>
  );
};

export default NotFound;

import Head from "next/head";

interface MetaProps {
  title?: string;
  description?: string;
}

const Meta = ({
  title = "CrowdCare",
  description = "Real-time hospital crowd insights. Smarter care starts here.",
}: MetaProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="UTF-8" />
    </Head>
  );
};

export default Meta;

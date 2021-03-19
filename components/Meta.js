import Head from "next/head";

const Meta = ({ title = "DevShev", keywords = "", description = "" }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" description={description} />
      <meta name="keywords" description={keywords} />
    </Head>
  );
};

export default Meta;

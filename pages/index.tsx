import Container from '@material-ui/core/Container';
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import getGraduates from 'lib/utils/getGraduates';
import { Graduate } from 'lib/types/Graduate';
import FormContent from 'components/FormContent';
import { Box } from '@material-ui/core';

export const getStaticProps: GetStaticProps<{ graduates: Graduate[] }> = async () => {
  const graduates = await getGraduates();

  return {
    props: {
      graduates,
    },
    revalidate: 600,
  };
};

const MainPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  graduates,
}) => (
  <Container maxWidth="md">
    <Box p={2}>
      <FormContent graduates={graduates} />
    </Box>
  </Container>
);

export default MainPage;

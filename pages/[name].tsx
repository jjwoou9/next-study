import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import type { Store } from '../types/store';
import styles from '../styles/detail.module.scss';
import DetailHeader from '../components/home/DetailHeader';
import DetailContent from '../components/home/DetailContent';
import { useRouter } from 'next/router';
import useCurrentStore from '../hooks/useCurrentStore';
import { NextSeo } from 'next-seo';

interface Props {
  store: Store;
}

const StoreDetail: NextPage<Props> = ({ store }) => {
  const expanded = true;

  const router = useRouter();
  const { setCurrentStore } = useCurrentStore();

  const goToMap = () => {
    setCurrentStore(store);
    router.push(`
      /?zoom=15&lat=${store.coordinates[0]}&lng=${store.coordinates[1]}
    `);
  };

  return (
    <>
      <NextSeo
        title={store.name}
        description="Next.js 시작하기 강의를 위한 매장 상세 페이지입니다."
        canonical={`https://inflearn-nextjs.vercel.app/${store.name}`}
        openGraph={{
          url: `https://inflearn-nextjs.vercel.app/${store.name}`,
        }}
      />
      <div className={`${styles.detailSection} ${styles.expanded}`}>
        <DetailHeader
          currentStore={store}
          expanded={expanded}
          onClickArrow={goToMap}
        />
        <DetailContent currentStore={store} expanded={expanded} />
      </div>
    </>
  );
};
export default StoreDetail;

/** https://nextjs.org/docs/basic-features/data-fetching/get-static-paths */
export const getStaticPaths: GetStaticPaths = async () => {
  const stores = (await import('../public/stores.json')).default;
  const paths = stores.map((store) => ({ params: { name: store.name } }));

  return { paths, fallback: false }; //true : false : "blocking"
  //false : 빌드 타임에 모두 만들고 찾을 수 없는 경로면 404
  //true : 빌드 타임에 경로 생성. 바로 404로 띄우지는 않음. => getStaticProps를 호출 하고 없을 때 404 호출
  //"blocking" : 등록되지 않은 url은 바로 404가 아니라 true 처럼 getStatic Props를 호출. true와 달리 경로 이동 전 까지 UI를 block 시킵니다.
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const stores = (await import('../public/stores.json')).default;
  const store = stores.find((store) => store.name === params?.name);

  return { props: { store } };
};

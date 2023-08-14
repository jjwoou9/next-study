import React, { Fragment } from 'react'
import Header from '../components/common/Header'
import styles from '../styles/header.module.scss'
import Link from 'next/link';
import { AiOutlineShareAlt } from 'react-icons/ai';
import { VscFeedback } from 'react-icons/vsc';
import MapSection from '@/components/home/MapSection';

export default function feedback() {
  return (
    <Fragment>
         <Header rightElements={[
          <button onClick={() => {
            alert("복사");
          }}
          className={styles.box}
          style={{marginRight: 8}}
          key='button'>
             <AiOutlineShareAlt size={20} color="#444444" />
          </button>,
          <Link href="/feedback" className={styles.box} key="link">
            <VscFeedback size={20} />
          </Link>

         ]} />
         
        <main style={{width: '100%', height: '100%'}}>
          <MapSection/>
        </main>
    </Fragment>
  );
}

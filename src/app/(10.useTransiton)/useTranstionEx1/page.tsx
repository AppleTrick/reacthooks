'use client';

import { Suspense, useState, useTransition } from 'react';
import TabButton from './TabButton';
import AboutTab from './AboutTab';
import ContactTab from './ContactTab';
import PostsTab from './PostsTab';

const TabContainer = () => {
  //   const [isPending, startTransition] = useTransition();
  const [tab, setTab] = useState('about');

  //   const selectTab = (nextTab: string) => {
  //     startTransition(() => {
  //       setTab(nextTab);
  //     });
  //   };
  // 하위 컴포넌트에도 사용가능하다.

  return (
    <>
      <Suspense fallback={<h1>🌀 Loading...</h1>}>
        <TabButton isActive={tab === 'about'} onClick={() => setTab('about')}>
          About
        </TabButton>
        <TabButton isActive={tab === 'posts'} onClick={() => setTab('posts')}>
          Posts (slow)
        </TabButton>
        <TabButton isActive={tab === 'contact'} onClick={() => setTab('contact')}>
          Contact
        </TabButton>
        <hr />
        {tab === 'about' && <AboutTab />}
        {tab === 'posts' && <PostsTab />}
        {tab === 'contact' && <ContactTab />}
      </Suspense>
    </>
  );
};

export default TabContainer;

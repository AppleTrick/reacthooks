const PostsTab = () => {
  // 한 번 로깅 합니다. 실제 속도 저하는 SlowPost 컴포넌트 내부에 있습니다.
  console.log('[ARTIFICIALLY SLOW] Rendering 500 <SlowPost />');

  let items = [];
  for (let i = 0; i < 500; i++) {
    items.push(<SlowPost key={i} index={i} />);
  }

  return (
    <div>
      <ul className="items">{items}</ul>
    </div>
  );
};

export default PostsTab;

const SlowPost = ({ index }: { index: number }) => {
  let startTime = performance.now();
  while (performance.now() - startTime < 10) {
    // 항목당 1 ms 동안 아무것도 하지 않음으로써 매우 느린 코드를 대리 실행합니다.
  }

  return <li className="item">Post #{index + 1}</li>;
};

import { useEffect, useState } from 'react';

interface CreateBoxStyleProps {
  backgroundColor: string;
  width: string;
  height: string;
}

interface BoxProps {
  createBoxStyle: () => CreateBoxStyleProps;
}

const Box = ({ createBoxStyle }: BoxProps) => {
  const [style, setStyle] = useState<CreateBoxStyleProps>({ backgroundColor: '', width: '', height: '' });

  useEffect(() => {
    console.log('박스 크기 변경하기');
    setStyle(createBoxStyle());
  }, [createBoxStyle]);

  return <div style={style}></div>;
};

export default Box;

import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React from 'react';
const GlassModelThreeD = dynamic(() => import("../../components/googleViewer"), {ssr: false})

interface IIndexProps {

}

const Index: React.FunctionComponent<IIndexProps> = ({ }) => {
  const routing = useRouter()

  return (
    <div className=' w-full flex mt-8 flex-col items-center h-[90vh]'>
        <GlassModelThreeD glassSrc={"/glassModel/glass_final.gltf"}/>
      {/* <iframe allowFullScreen className='w-full h-screen max-w-[680px] max-h-[680px] rounded-lg border-2' src={`https://api.optics4less.com/360/#/${routing.query.glassId}`} /> */}
    </div>
  );
};

export default Index;

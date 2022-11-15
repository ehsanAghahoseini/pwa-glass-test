import "@google/model-viewer";
import React from 'react';

interface IGlassModelThreeDProps {
    glassSrc: string
}

const GlassModelThreeD: React.FunctionComponent<IGlassModelThreeDProps> = ({ glassSrc }) => {

    return (
        <>
        {/* @ts-ignore */}
            <model-viewer
                id={"interaction"}
                src={glassSrc}
                style={{width:"80%",height:"100vh", margin:"auto",padding:"1rem"}}
                poster={"/60-tour.gif"}
                auto-rotate
                ar-scale={"fixed"}
                // disable-zoom 
                camera-controls
                camera-orbit={"20deg 70deg 103%"}
                shadow-intensity={"3"}
                stage-light-intensity={"15"}
                environment-intensity={"2"}
                alt={"rule 3d"}
                auto-rotate-delay={"200"}
                max-field-of-view={"70deg"}
                min-field-of-view={"70deg"}
                data-js-focus-visible
                >
                <div id="progress" slot="progress-bar">
                    <div className="bar">
                    </div>
                </div>
                {/* @ts-ignore */}
            </model-viewer>
        </>
    );
};

export default GlassModelThreeD;

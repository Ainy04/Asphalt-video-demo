import { Composition } from "remotion";
import { AsphaltVideo } from "./AsphaltVideo";

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="AsphaltVideo"
        component={AsphaltVideo}
        durationInFrames={690}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};

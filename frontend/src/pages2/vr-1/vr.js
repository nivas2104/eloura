import React from "react";
import { useParams } from "react-router-dom";
import 'aframe';

const VRScene = () => {
  const { place } = useParams();

  const images = {
    paris: "/vr/paris.jpg",
    tokyo: "/vr/tokyo.jpg"
  };

  const image = images[place];

  return (
    <a-scene>
      <a-sky src={image} rotation="0 -130 0"></a-sky>
    </a-scene>
  );
};

export default VRScene;
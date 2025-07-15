import React, { Suspense, useState } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, Stars, Html } from "@react-three/drei";
import * as THREE from "three";
import earth_texture from "./2k_earth_daymap.jpg"; // Make sure this image is in the same folder

// 🔁 Convert lat/lon to 3D vector on a sphere
function latLongToVector3(lat, lon, radius) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return [x, y, z];
}

// 📍 Marker component
const Marker = ({ position, label, onClick }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <mesh
      position={position}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[0.02, 16, 16]} />
      <meshStandardMaterial color={hovered ? "orange" : "red"} />
      {hovered && (
        <Html distanceFactor={10}>
          <div
            style={{
              color: "white",
              background: "rgba(0,0,0,0.6)",
              padding: "2px 6px",
              borderRadius: "6px",
              fontSize: "12px"
            }}
          >
            {label}
          </div>
        </Html>
      )}
    </mesh>
  );
};

// 🌍 Globe component with markers
const Globe = ({ onMarkerClick }) => {
  const earthTexture = useLoader(THREE.TextureLoader, earth_texture);

  const markers = [
    {
      lat: 28.6139,
      lon: 77.209,
      label: "New Delhi",
      video: "https://www.youtube.com/embed/2Ygw2jDtBgo",

    },
    {
      lat: 40.7128,
      lon: -74.0060,
      label: "New York",
      video: "https://www.youtube.com/embed/2Lq86MKesG4",
    },
    {
      lat: 35.6895,
      lon: 139.6917,
      label: "Tokyo",
      video: "https://www.youtube.com/embed/kyN623RzFe0",
    },
    {
      lat: 51.5074,
      lon: -0.1278,
      label: "London",
      video: "https://www.youtube.com/embed/SNx8B_oE8IY",
    },
    {
      lat: 48.8566,
      lon: 2.3522,
      label: "Paris",
      video: "https://www.youtube.com/embed/EkshFcLESPU",
    },
    {
      lat: -33.8688,
      lon: 151.2093,
      label: "Sydney",
      video: "https://www.youtube.com/embed/GqnCZNGkdfc",
    },
    {
      lat: 34.0522,
      lon: -118.2437,
      label: "Los Angeles",
      video: "https://www.youtube.com/embed/JBYi3T93wnE",
    },
    {
      lat: 40.7306,
      lon: -73.9352,
      label: "Brooklyn",
      video: "https://www.youtube.com/embed/IiMrU-dw41M",
    },
    {
      lat: 55.7558,
      lon: 37.6173,
      label: "Moscow",
      video: "https://www.youtube.com/embed/5fyVCocJoks",
    },
    {
      lat: 39.9042,
      lon: 116.4074,
      label: "Beijing",
      video: "https://www.youtube.com/embed/sz3fegsBRN4",
    },
    {
      lat: 52.3676,
      lon: 4.9041,
      label: "Amsterdam",
      video: "https://www.youtube.com/embed/ViQPRjS3O48",
    },
    {
      lat: 19.4326,
      lon: -99.1332,
      label: "Mexico City",
      video: "https://www.youtube.com/embed/-xFB2vQknEQ",
    },
    {
      lat: 39.7392,
      lon: -104.9903,
      label: "Denver",
      video: "https://www.youtube.com/embed/BQ8TcovpYEo",
    },
    {
      lat: 25.7617,
      lon: -80.1918,
      label: "Miami",
      video: "https://www.youtube.com/embed/q0IOUfvp6ws",
    },
    {
      lat: 41.9028,
      lon: 12.4964,
      label: "Rome",
      video: "https://www.youtube.com/embed/wryj9uWv038",
    },
    {
      lat: 37.7749,
      lon: -122.4194,
      label: "San Francisco",
      video: "https://www.youtube.com/embed/",
    },
    {
      lat: 28.6129,
      lon: 77.2295,
      label: "New Delhi",
      video: "https://www.youtube.com/embed/2Ygw2jDtBgo",
    },
    {
      lat: 27.1751,
      lon: 78.0421,
      label: "Taj Mahal, Agra",
      video: "https://www.youtube.com/embed/8HV1JVgqPM0",
    },
    {
      lat: 26.9124,
      lon: 75.7873,
      label: "Jaipur",
      video: "https://www.youtube.com/embed/skJVCmI4LM4",
    },
    {
      lat: 15.2993,
      lon: 74.1240,
      label: "Goa",
      video: "https://www.youtube.com/embed/ofK6wlMPYMg",
    },
    {
      lat: 11.2588,
      lon: 75.7804,
      label: "Kerala",
      video: "https://www.youtube.com/embed/AP7MPrsQ-KE",
    },
    {
      lat: 32.2432,
      lon: 77.1892,
      label: "Manali",
      video: "https://www.youtube.com/embed/FdHPsokVDYA",
    },
    {
      lat: 34.0837,
      lon: 74.7973,
      label: "Srinagar",
      video: "https://www.youtube.com/embed/Ai98Tfw0WWs",
    },
    {
      lat: 13.0827,
      lon: 80.2707,
      label: "Chennai",
      video: "https://www.youtube.com/embed/xtr46REUZq0",
    }
  ];

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[1, 1, 2]} intensity={1} />

      {/* Earth Sphere */}
      <mesh>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial map={earthTexture} />
      </mesh>

      {/* Markers */}
      {markers.map((marker, index) => (
        <Marker
          key={index}
          position={latLongToVector3(marker.lat, marker.lon, 1.01)}
          label={marker.label}
          onClick={() => onMarkerClick(marker.video)}
        />
      ))}

      {/* Stars */}
      <Stars radius={100} depth={50} count={5000} factor={4} fade />
    </>
  );
};

// 🎬 Main Explore Component
const Explore = () => {
  const [videoUrl, setVideoUrl] = useState(null);

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <Canvas camera={{ position: [0, 0, 3], fov: 75 }} style={{ background: "black" }}>
        <Suspense fallback={null}>
          <Globe onMarkerClick={setVideoUrl} />
        </Suspense>
        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          zoomSpeed={0.5}
          rotateSpeed={0.4}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
      
      {/* Video Modal */}
      {videoUrl && (
        <div
          style={{
            position: "absolute",
            top: 20,
            right: 20,
            background: "#000",
            padding: "10px",
            zIndex: 999,
            borderRadius: "10px",
            maxWidth: "90vw"
          }}
        >
          <button
            onClick={() => setVideoUrl(null)}
            style={{
              background: "red",
              color: "white",
              border: "none",
              borderRadius: "4px",
              padding: "4px 8px",
              float: "right",
              cursor: "pointer",
            }}
          >
            ✖
          </button>
          <iframe
            width="400"
            height="600"
            src={videoUrl}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ marginTop: "10px", borderRadius: "8px" }}
          ></iframe>
          
        </div>
      )}
    </div>
  );
};

export default Explore;

import Particles from "@tsparticles/react";
import { loadFull } from "tsparticles";
import type { Engine } from "tsparticles-engine";
import { useCallback } from "react";

const NeuroBackground = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      id="neuro-background"
      className="absolute inset-0 -z-10"
      init={particlesInit}
      options={{
        background: { color: "transparent" },
        fullScreen: { enable: false },
        particles: {
          number: { value: 40 },
          color: { value: "#7e22ce" },
          links: {
            enable: true,
            color: "#7e22ce",
            distance: 120,
            opacity: 0.3,
          },
          move: { enable: true, speed: 1, outModes: "bounce" },
          size: { value: 2 },
        },
        detectRetina: true,
      }}
    />
  );
};

export default NeuroBackground;


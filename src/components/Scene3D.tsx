import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Grid } from '@react-three/drei';
import { PanneauBois } from '@/models/PanneauBois';

/**
 * Composant principal de la scène 3D
 * Configure l'environnement, l'éclairage et les contrôles
 */
export function Scene3D() {
  return (
    <div className="w-full h-full bg-gradient-to-b from-slate-100 to-slate-200">
      <Canvas
        camera={{ 
          position: [2, 2, 2], 
          fov: 50,
          near: 0.1,
          far: 1000
        }}
        shadows
      >
        {/* Environnement et éclairage */}
        <Environment preset="warehouse" />
        <ambientLight intensity={0.4} />
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />

        {/* Grille de référence */}
        <Grid
          infiniteGrid
          size={1}
          divisions={10}
          color="#666666"
          sectionColor="#999999"
          fadeStrength={0.5}
          fadeDistance={30}
        />

        {/* Panneau de bois principal */}
        <PanneauBois position={[0, 0, 0]} />

        {/* Contrôles de la caméra */}
        <OrbitControls
          enablePan
          enableZoom
          enableRotate
          minDistance={1}
          maxDistance={10}
          target={[0, 0, 0]}
        />
      </Canvas>
    </div>
  );
}
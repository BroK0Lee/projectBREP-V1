import { useEffect, useRef, useState } from 'react';
import { useFrame, type ThreeEvent } from '@react-three/fiber';
import { Mesh, LineSegments, BoxGeometry, BufferGeometry } from 'three';
import { useConfigurateurStore } from '@/store/configurateurStore';
import { genererPanneauBois } from '@/brep/panneauboisBREP';

/**
 * Props du composant PanneauBois
 */
interface PanneauBoisProps {
  position?: [number, number, number];
}

/**
 * Composant 3D représentant un panneau de bois
 * Utilise une géométrie de boîte avec détection des arêtes
 */
export function PanneauBois({ position = [0, 0, 0] }: PanneauBoisProps) {
  const meshRef = useRef<Mesh>(null);
  const edgesRef = useRef<LineSegments>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [geomBREP, setGeomBREP] = useState<BufferGeometry | null>(null);

  const { dimensions, areteSelectionnee, selectionnerArete, ouvrirModal } =
    useConfigurateurStore();

  // Conversion des dimensions mm vers unités Three.js (facteur 0.001)
  const longueur = dimensions.longueur * 0.001;
  const largeur = dimensions.largeur * 0.001;
  const epaisseur = dimensions.epaisseur * 0.001;

  // Génère la géométrie BREP lorsqu'une dimension change
  useEffect(() => {
    genererPanneauBois({
      longueur: dimensions.longueur,
      largeur: dimensions.largeur,
      epaisseur: dimensions.epaisseur,
    })
      .then((geo) => setGeomBREP(geo))
      .catch((err) => console.error(err));
  }, [dimensions]);

  /**
   * Gestionnaire de clic sur le panneau
   * Détecte quelle arête a été cliquée via raycast
   */
  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();

    // Pour le MVP, on simule la sélection d'une arête
    // Dans une version future, on utilisera le raycasting précis
    const areteId = `arete_${Math.floor(Math.random() * 12)}`;
    selectionnerArete(areteId);
    ouvrirModal('chanfrein');
  };

  /**
   * Animation légère du panneau (rotation sur lui-même)
   */
  useFrame((state) => {
    if (meshRef.current && !areteSelectionnee) {
      meshRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <group position={position}>
      {/* Panneau principal */}
      <mesh
        ref={meshRef}
        onClick={handleClick}
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
        geometry={geomBREP ?? undefined}
      >
        {!geomBREP && <boxGeometry args={[longueur, largeur, epaisseur]} />}
        <meshLambertMaterial
          color={isHovered ? '#d2691e' : '#daa520'}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Contours des arêtes */}
      <lineSegments ref={edgesRef}>
        <edgesGeometry args={[new BoxGeometry(longueur, largeur, epaisseur)]} />
        <lineBasicMaterial
          color={areteSelectionnee ? '#ff4444' : '#8b4513'}
          linewidth={areteSelectionnee ? 3 : 1}
        />
      </lineSegments>

      {/* Points de repère pour les dimensions */}
      <group visible={isHovered}>
        {/* Marqueurs des coins */}
        {[
          [-longueur / 2, -largeur / 2, -epaisseur / 2],
          [longueur / 2, -largeur / 2, -epaisseur / 2],
          [longueur / 2, largeur / 2, -epaisseur / 2],
          [-longueur / 2, largeur / 2, -epaisseur / 2],
        ].map((pos, index) => (
          <mesh key={index} position={pos as [number, number, number]}>
            <sphereGeometry args={[0.005]} />
            <meshBasicMaterial color="#ff0000" />
          </mesh>
        ))}
      </group>
    </group>
  );
}

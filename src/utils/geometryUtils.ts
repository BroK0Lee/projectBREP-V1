import { Vector3, BufferGeometry } from 'three';

/**
 * Utilitaires pour les calculs géométriques et BREP
 */

/**
 * Convertit des millimètres en unités Three.js
 */
export function mmToUnits(mm: number): number {
  return mm * 0.001;
}

/**
 * Convertit des unités Three.js en millimètres
 */
export function unitsToMm(units: number): number {
  return units * 1000;
}

/**
 * Calcule la distance entre deux points 3D
 */
export function distanceEntrePoints(p1: Vector3, p2: Vector3): number {
  return p1.distanceTo(p2);
}

/**
 * Génère un identifiant unique pour les arêtes
 * Basé sur les coordonnées des points de début et fin
 */
export function genererIdArete(debut: Vector3, fin: Vector3): string {
  const precision = 1000; // Précision pour éviter les erreurs de flottants
  
  const x1 = Math.round(debut.x * precision);
  const y1 = Math.round(debut.y * precision);
  const z1 = Math.round(debut.z * precision);
  
  const x2 = Math.round(fin.x * precision);
  const y2 = Math.round(fin.y * precision);
  const z2 = Math.round(fin.z * precision);
  
  return `edge_${x1}_${y1}_${z1}_${x2}_${y2}_${z2}`;
}

/**
 * Extrait les arêtes d'une géométrie
 * Retourne un tableau d'arêtes avec leurs identifiants
 */
export function extraireAretes(geometry: BufferGeometry) {
  void geometry;
  // Cette fonction sera étendue dans les versions futures
  // pour une extraction précise des arêtes BREP
  const aretes: Array<{
    id: string;
    debut: Vector3;
    fin: Vector3;
    longueur: number;
  }> = [];
  
  // Implémentation simplifiée pour le MVP
  // Dans une version complète, on utiliserait OpenCascade
  
  return aretes;
}

/**
 * Calcule les paramètres pour un chanfrein
 */
export function calculerParametresChanfrein(
  largeur: number,
  angle: number
): {
  distance1: number;
  distance2: number;
} {
  const angleRad = (angle * Math.PI) / 180;
  const distance1 = largeur / Math.tan(angleRad / 2);
  const distance2 = largeur / Math.sin(angleRad / 2);
  
  return { distance1, distance2 };
}

/**
 * Valide les paramètres d'un congé
 */
export function validerParametresConge(rayon: number, longueurArete: number): boolean {
  return rayon > 0 && rayon < longueurArete / 2;
}
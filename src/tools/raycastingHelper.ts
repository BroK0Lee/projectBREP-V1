import { Raycaster, Vector2, Vector3, Camera, Object3D, Intersection } from 'three';

/**
 * Helper pour la détection d'arêtes par raycasting
 * Facilite l'interaction avec les éléments 3D
 */
export class RaycastingHelper {
  private raycaster: Raycaster;
  private pointer: Vector2;

  constructor() {
    this.raycaster = new Raycaster();
    this.pointer = new Vector2();
    
    // Configuration spécifique pour la détection d'arêtes
    this.raycaster.params.Line = { threshold: 0.01 };
    this.raycaster.params.Points = { threshold: 0.01 };
  }

  /**
   * Met à jour la position du pointeur depuis un événement mouse
   */
  updatePointer(event: MouseEvent, domElement: HTMLElement): void {
    const rect = domElement.getBoundingClientRect();
    
    this.pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  }

  /**
   * Lance un rayon et détecte les intersections
   */
  detectIntersections(
    camera: Camera,
    objects: Object3D[]
  ): Intersection[] {
    this.raycaster.setFromCamera(this.pointer, camera);
    return this.raycaster.intersectObjects(objects, true);
  }

  /**
   * Détecte spécifiquement les arêtes les plus proches
   * Filtre les résultats pour ne garder que les LineSegments
   */
  detectAretes(
    camera: Camera,
    objects: Object3D[]
  ): Intersection[] {
    const intersections = this.detectIntersections(camera, objects);
    
    // Filtre pour ne garder que les objets de type Line/LineSegments
    return intersections.filter(
      (intersection) => 
        intersection.object.type === 'LineSegments' || 
        intersection.object.type === 'Line'
    );
  }

  /**
   * Calcule l'arête la plus proche du point d'intersection
   */
  getAreteProche(intersections: Intersection[]): Intersection | null {
    if (intersections.length === 0) return null;
    
    // Retourne l'intersection la plus proche (première dans le tableau trié)
    return intersections[0];
  }

  /**
   * Génère un identifiant d'arête basé sur la géométrie
   */
  genererIdArete(intersection: Intersection): string {
    const { object, point } = intersection;
    
    // Création d'un ID basé sur l'objet et la position
    const objectId = object.id;
    const x = Math.round(point.x * 1000);
    const y = Math.round(point.y * 1000);
    const z = Math.round(point.z * 1000);
    
    return `edge_${objectId}_${x}_${y}_${z}`;
  }
}

/**
 * Instance globale du helper (singleton)
 */
export const raycastingHelper = new RaycastingHelper();
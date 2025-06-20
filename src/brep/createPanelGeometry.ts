import { BufferGeometry } from 'three';
import { genererPanneauBois, PanneauDimensions } from './panneauboisBREP';

/**
 * Enveloppe simplifiée pour générer la géométrie d'un panneau bois.
 * Permet d'abstraire la génération BREP via le worker.
 * @param dims Dimensions du panneau en millimètres
 */
export async function createPanelGeometry(
  dims: PanneauDimensions
): Promise<BufferGeometry> {
  return genererPanneauBois(dims);
}

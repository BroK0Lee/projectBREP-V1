import { BufferGeometry, Float32BufferAttribute } from 'three';
import { getWorker, whenWorkerReady } from './CascadeWorker';

export interface PanneauDimensions {
  longueur: number;
  largeur: number;
  epaisseur: number;
}

/**
 * Génère la géométrie BREP d'un panneau de bois via Cascade Studio.
 * @param dims Dimensions du panneau en millimètres
 */
export async function genererPanneauBois(
  dims: PanneauDimensions
): Promise<BufferGeometry> {
  await whenWorkerReady();
  const worker = getWorker();
  const code = `Box(${dims.longueur}, ${dims.largeur}, ${dims.epaisseur}, true);`;

  return new Promise((resolve, reject) => {
    const onMessage = (ev: MessageEvent) => {
      if (ev.data?.type === 'combineAndRenderShapes') {
        worker.removeEventListener('message', onMessage);
        try {
          const [[facelist]] = ev.data.payload as [[any[], any[]], unknown];
          const geometry = createBufferGeometry(facelist);
          resolve(geometry);
        } catch (err) {
          reject(err);
        }
      }
    };

    worker.addEventListener('message', onMessage);

    worker.postMessage({
      type: 'Evaluate',
      payload: { code, GUIState: {} },
    });

    worker.postMessage({
      type: 'combineAndRenderShapes',
      payload: { maxDeviation: 0.1, sceneOptions: {} },
    });
  });
}

/**
 * Convertit la liste de faces retournée par Cascade Studio en BufferGeometry.
 */
function createBufferGeometry(faces: any[]): BufferGeometry {
  const vertices: number[] = [];
  const normals: number[] = [];
  const triangles: number[] = [];
  const uvs: number[] = [];
  const colors: number[] = [];
  let vInd = 0;
  let globalFaceIndex = 0;

  faces.forEach((face) => {
    vertices.push(...face.vertex_coord);
    normals.push(...face.normal_coord);
    uvs.push(...face.uv_coord);

    for (let i = 0; i < face.tri_indexes.length; i += 3) {
      triangles.push(
        face.tri_indexes[i] + vInd,
        face.tri_indexes[i + 1] + vInd,
        face.tri_indexes[i + 2] + vInd
      );
    }

    for (let i = 0; i < face.vertex_coord.length; i += 3) {
      colors.push(face.face_index, globalFaceIndex, 0);
    }

    globalFaceIndex++;
    vInd += face.vertex_coord.length / 3;
  });

  const geometry = new BufferGeometry();
  geometry.setIndex(triangles);
  geometry.setAttribute('position', new Float32BufferAttribute(vertices, 3));
  geometry.setAttribute('normal', new Float32BufferAttribute(normals, 3));
  geometry.setAttribute('color', new Float32BufferAttribute(colors, 3));
  geometry.setAttribute('uv', new Float32BufferAttribute(uvs, 2));
  geometry.setAttribute('uv2', new Float32BufferAttribute(uvs, 2));
  geometry.computeBoundingSphere();
  geometry.computeBoundingBox();
  return geometry;
}

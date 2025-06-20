import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

/**
 * Interface pour les dimensions du panneau (en millimètres)
 */
export interface DimensionsPanneau {
  longueur: number;
  largeur: number;
  epaisseur: number;
}

/**
 * Interface pour définir une opération sur une arête
 */
export interface OperationArete {
  id: string;
  areteId: string;
  type: 'chanfrein' | 'conge';
  valeur: number; // en millimètres
  angle?: number; // pour les chanfreins
}

/**
 * Interface pour l'état principal du configurateur
 */
export interface ConfigurateurState {
  // État du panneau
  dimensions: DimensionsPanneau;
  operations: OperationArete[];
  
  // État de l'interface
  areteSelectionnee: string | null;
  modalOuverte: boolean;
  typeOperationModal: 'chanfrein' | 'conge' | null;
  
  // Actions
  setDimensions: (dimensions: Partial<DimensionsPanneau>) => void;
  ajouterOperation: (operation: Omit<OperationArete, 'id'>) => void;
  supprimerOperation: (operationId: string) => void;
  modifierOperation: (operationId: string, modification: Partial<OperationArete>) => void;
  
  // Actions d'interface
  selectionnerArete: (areteId: string) => void;
  deselectionnerArete: () => void;
  ouvrirModal: (type: 'chanfrein' | 'conge') => void;
  fermerModal: () => void;
}

/**
 * Store principal du configurateur utilisant Zustand
 * Gère l'état des dimensions, opérations et interface utilisateur
 */
export const useConfigurateurStore = create<ConfigurateurState>()(
  devtools(
    (set, get) => ({
      // État initial
      dimensions: {
        longueur: 800,
        largeur: 600,
        epaisseur: 18,
      },
      operations: [],
      areteSelectionnee: null,
      modalOuverte: false,
      typeOperationModal: null,

      // Actions pour les données
      setDimensions: (nouvelles) =>
        set((state) => ({
          dimensions: { ...state.dimensions, ...nouvelles },
        })),

      ajouterOperation: (operation) =>
        set((state) => ({
          operations: [
            ...state.operations,
            { ...operation, id: `op_${Date.now()}` },
          ],
        })),

      supprimerOperation: (operationId) =>
        set((state) => ({
          operations: state.operations.filter((op) => op.id !== operationId),
        })),

      modifierOperation: (operationId, modification) =>
        set((state) => ({
          operations: state.operations.map((op) =>
            op.id === operationId ? { ...op, ...modification } : op
          ),
        })),

      // Actions d'interface
      selectionnerArete: (areteId) =>
        set({
          areteSelectionnee: areteId,
        }),

      deselectionnerArete: () =>
        set({
          areteSelectionnee: null,
          modalOuverte: false,
          typeOperationModal: null,
        }),

      ouvrirModal: (type) =>
        set({
          modalOuverte: true,
          typeOperationModal: type,
        }),

      fermerModal: () =>
        set({
          modalOuverte: false,
          typeOperationModal: null,
        }),
    }),
    {
      name: 'configurateur-store',
    }
  )
);
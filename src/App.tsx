import { Scene3D } from '@/components/Scene3D';
import { PanneauControle } from '@/components/PanneauControle';
import { ModalOperationArete } from '@/modals/ModalOperationArete';
import { Toaster } from '@/components/ui/sonner';
import './App.css';

/**
 * Composant principal de l'application
 * Layout en deux colonnes : scène 3D + panneau de contrôle
 */
function App() {
  return (
    <div className="h-screen flex bg-gray-50">
      {/* Zone principale avec la scène 3D */}
      <div className="flex-1 flex flex-col">
        {/* En-tête */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Configurateur 3D - Panneaux Bois
              </h1>
              <p className="text-sm text-gray-600">
                Cliquez sur une arête pour ajouter un chanfrein ou un congé
              </p>
            </div>
            <div className="text-sm text-gray-500">
              Version MVP - BREP avec OpenCascade
            </div>
          </div>
        </header>

        {/* Scène 3D */}
        <main className="flex-1">
          <Scene3D />
        </main>
      </div>

      {/* Panneau de contrôle latéral */}
      <PanneauControle />

      {/* Modals */}
      <ModalOperationArete />

      {/* Notifications */}
      <Toaster />
    </div>
  );
}

export default App;
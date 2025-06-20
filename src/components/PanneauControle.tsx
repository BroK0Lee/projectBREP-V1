import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useConfigurateurStore } from '@/store/configurateurStore';
import { Ruler, Settings2, Download } from 'lucide-react';

/**
 * Panneau de contrôle latéral pour configurer les dimensions
 * et afficher les opérations appliquées
 */
export function PanneauControle() {
  const { dimensions, operations, setDimensions } = useConfigurateurStore();

  /**
   * Mise à jour d'une dimension spécifique
   */
  const handleDimensionChange = (
    key: keyof typeof dimensions,
    value: string
  ) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue > 0) {
      setDimensions({ [key]: numValue });
    }
  };

  return (
    <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto">
      <div className="p-6 space-y-6">
        {/* En-tête */}
        <div className="flex items-center gap-2">
          <Settings2 className="h-5 w-5 text-amber-600" />
          <h2 className="text-lg font-semibold text-gray-900">
            Configuration
          </h2>
        </div>

        {/* Dimensions du panneau */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Ruler className="h-4 w-4" />
              Dimensions (mm)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              <div>
                <Label htmlFor="longueur">Longueur</Label>
                <Input
                  id="longueur"
                  type="number"
                  value={dimensions.longueur}
                  onChange={(e) =>
                    handleDimensionChange('longueur', e.target.value)
                  }
                  min="10"
                  max="3000"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="largeur">Largeur</Label>
                <Input
                  id="largeur"
                  type="number"
                  value={dimensions.largeur}
                  onChange={(e) =>
                    handleDimensionChange('largeur', e.target.value)
                  }
                  min="10"
                  max="2000"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="epaisseur">Épaisseur</Label>
                <Input
                  id="epaisseur"
                  type="number"
                  value={dimensions.epaisseur}
                  onChange={(e) =>
                    handleDimensionChange('epaisseur', e.target.value)
                  }
                  min="3"
                  max="100"
                  className="mt-1"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Separator />

        {/* Opérations appliquées */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">
              Opérations ({operations.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {operations.length === 0 ? (
              <p className="text-sm text-gray-500 italic">
                Cliquez sur une arête du panneau pour ajouter un chanfrein ou un congé
              </p>
            ) : (
              <div className="space-y-2">
                {operations.map((op) => (
                  <div
                    key={op.id}
                    className="flex items-center justify-between p-2 bg-gray-50 rounded"
                  >
                    <div>
                      <span className="font-medium capitalize">
                        {op.type}
                      </span>
                      <span className="text-gray-600 ml-2">
                        {op.valeur}mm
                      </span>
                    </div>
                    <Button variant="ghost" size="sm">
                      ×
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Separator />

        {/* Actions d'export */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Export</CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Exporter STEP
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
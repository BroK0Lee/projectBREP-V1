import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useConfigurateurStore } from '@/store/configurateurStore';

/**
 * Modal pour configurer une opération sur une arête
 * Permet de choisir entre chanfrein et congé avec paramètres
 */
export function ModalOperationArete() {
  const {
    modalOuverte,
    typeOperationModal,
    areteSelectionnee,
    fermerModal,
    ajouterOperation,
  } = useConfigurateurStore();

  const [typeOperation, setTypeOperation] = useState<'chanfrein' | 'conge'>(
    typeOperationModal || 'chanfrein'
  );
  const [valeur, setValeur] = useState<string>('2');
  const [angle, setAngle] = useState<string>('45');

  /**
   * Validation et ajout de l'opération
   */
  const handleConfirmer = () => {
    if (!areteSelectionnee) return;

    const valeurNum = parseFloat(valeur);
    const angleNum = parseFloat(angle);

    if (isNaN(valeurNum) || valeurNum <= 0) {
      return; // Validation basique
    }

    ajouterOperation({
      areteId: areteSelectionnee,
      type: typeOperation,
      valeur: valeurNum,
      ...(typeOperation === 'chanfrein' && { angle: angleNum }),
    });

    fermerModal();
    resetForm();
  };

  /**
   * Remise à zéro du formulaire
   */
  const resetForm = () => {
    setValeur('2');
    setAngle('45');
  };

  /**
   * Annulation et fermeture
   */
  const handleAnnuler = () => {
    fermerModal();
    resetForm();
  };

  return (
    <Dialog open={modalOuverte} onOpenChange={handleAnnuler}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Configuration de l'arête</DialogTitle>
          <DialogDescription>
            Choisissez le type d'opération et ses paramètres pour cette arête
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Choix du type d'opération */}
          <div className="space-y-3">
            <Label>Type d'opération</Label>
            <RadioGroup
              value={typeOperation}
              onValueChange={(value) =>
                setTypeOperation(value as 'chanfrein' | 'conge')
              }
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="chanfrein" id="chanfrein" />
                <Label htmlFor="chanfrein">Chanfrein</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="conge" id="conge" />
                <Label htmlFor="conge">Congé</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Paramètre principal : taille */}
          <div className="space-y-2">
            <Label htmlFor="valeur">
              {typeOperation === 'chanfrein' ? 'Largeur' : 'Rayon'} (mm)
            </Label>
            <Input
              id="valeur"
              type="number"
              value={valeur}
              onChange={(e) => setValeur(e.target.value)}
              min="0.1"
              max="50"
              step="0.1"
              placeholder="2.0"
            />
          </div>

          {/* Paramètre spécifique aux chanfreins */}
          {typeOperation === 'chanfrein' && (
            <div className="space-y-2">
              <Label htmlFor="angle">Angle (degrés)</Label>
              <Input
                id="angle"
                type="number"
                value={angle}
                onChange={(e) => setAngle(e.target.value)}
                min="1"
                max="89"
                step="1"
                placeholder="45"
              />
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleAnnuler}>
            Annuler
          </Button>
          <Button onClick={handleConfirmer}>Confirmer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
// src/brep/CascadeWorker.ts
// --------------------------------------------------
// Helper pour le lancement du Web Worker Cascade Studio
// --------------------------------------------------
// 1. Crée **une seule** instance de Worker pour toute l'application
// 2. Exporte `getWorker()` qui renvoie toujours la même instance
// 3. Exporte `whenWorkerReady` pour attendre le message
//    `startupCallback` indiquant la fin de l'initialisation d'OpenCascade
// --------------------------------------------------

/**
 * Format du message `startupCallback` envoyé par Cascade Studio
 * lorsque le moteur WASM est prêt.
 */
interface StartupCallback {
  type: 'startupCallback';
  // autres propriétés ignorées pour l'instant
}

/**
 * Conteneur interne conservant l'unique instance de Worker
 * et la promesse résolue à la fin de l'initialisation.
 */
class CascadeWorkerSingleton {
  /** Instance mise en cache du Worker */
  private static worker: Worker | null = null;

  /** Promesse résolue dès que le worker envoie `startupCallback` */
  private static readyPromise: Promise<void> | null = null;

  /**
   * Création du worker (une seule fois) et initialisation de la promesse.
   */
  private static create() {
    if (this.worker) return;

    // Le fichier se trouve dans le dossier public/ et est chargé via une URL
    this.worker = new Worker(
      '/cascade-studio/js/CADWorker/CascadeStudioMainWorker.js',
      { type: 'module' }
    );

    // Mise en place de la promesse résolue à la réception
    // du message `startupCallback`
    this.readyPromise = new Promise<void>((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error('Initialisation du worker Cascade Studio expirée.'));
      }, 20000); // sécurité de 20 secondes

      const onMessage = (ev: MessageEvent<unknown>) => {
        const data = ev.data as Partial<StartupCallback> | undefined;
        if (data?.type === 'startupCallback') {
          clearTimeout(timeout);
          this.worker?.removeEventListener('message', onMessage);
          resolve();
        }
      };

      this.worker.addEventListener('message', onMessage);
    });
  }

  /**
   * Retourne le Worker (créé si nécessaire). Les appels peuvent attendre
   * `whenReady` pour s'assurer que le moteur OCCT est prêt.
   */
  public static get workerInstance(): Worker {
    this.create();
    return this.worker!;
  }

  /** Promesse résolue quand le worker est opérationnel */
  public static get whenReady(): Promise<void> {
    this.create();
    return this.readyPromise!;
  }
}

// ---------------------------------------------------------------------------
// API publique utilisée par le reste du projet
// ---------------------------------------------------------------------------

/**
 * Renvoie l'instance (singleton) du worker Cascade Studio.
 */
export function getWorker(): Worker {
  return CascadeWorkerSingleton.workerInstance;
}

/**
 * Promesse résolue quand le moteur WASM de Cascade Studio est prêt.
 */
export function whenWorkerReady(): Promise<void> {
  return CascadeWorkerSingleton.whenReady;
}

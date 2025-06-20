**AGENTS.md**  
**Projet : Configurateur 3D de panneaux bois avec modélisation BREP**

---

### 🔍 **Objectif du projet**
Créer une application web permettant à un utilisateur de configurer un panneau en bois (forme, dimensions, découpes, finitions) avec une modélisation 3D BREP précise, une interface intuitive, et des exports pour la fabrication (STEP, STL, etc).

---

### 📈 **Public cible**
- Artisans/menuisiers
- Particuliers bricoleurs
- Industriels de la fabrication bois

---

### 🌐 **Langue du projet**
- Interface et documentation en **français**

---

### 🏋️ Fonctionnalités principales 
- Définition des dimensions du panneau (L x l x épaisseur)
- Ajout de découpes (perçages, formes rectangulaires, irrégulières)
- Positionnement précis des découpes (coordonnées, répétition)
- Application de **chanfreins** ou **congés** sur les arêtes
- Export en **STEP**, **STL**, **GLTF**

---

### 🛠️ Stack technique (validée)
| Domaine               | Technologie choisie              |
|-----------------------|----------------------------------|
| Frontend UI           | React + Vite + Zustand + Tailwind / ShadCN UI |
| Moteur BREP           | Cascade Studio (OpenCascade en WASM) |
| Rendu 3D              | Three.js + React Three Fiber     |
| Interaction arête    | Raycaster, OutlinePass            |
| Export fabrication    | STEP, STL (via OCCT)              |

---

### 🎛️ UX spécifique 
- L'utilisateur peut **cliquer sur une arête** du modèle 3D pour ouvrir un **modal de configuration** (chanfrein ou congé)
- Toutes les unités sont en **millimètres**
- Interface claire, moderne, compatible desktop et tablette

---

### 🧐 Interaction avec les LLM / Agents IA
- **Langue de réponse** : Français
- **Style de réponse attendu** : Structuré, concis, orienté action (code, explication courte, clair)
- **Format préféré pour le code** : TypeScript / TSX (si React), Markdown pour explication
- Les agents IA peuvent modifier tout type de fichier si la demande le justifie
- Les agents IA **ne doivent pas modifier** : `vite.config.ts`, fichiers de configuration CI sans demande explicite
- Toute fonction ajoutée doit être documentée brièvement en JSDoc
- Le fichier `main.tsx` doit rester **compact, lisible et factorisé au maximum**
- Le code doit être **commenté en français**, de façon claire pour la compréhension et la maintenance

---

### 🎓 Normes de qualité attendues
- **Prettier** pour le formatage automatique du code (respect des conventions)
- **ESLint** pour les bonnes pratiques et détection d'erreurs
- Mise en place de **tests unitaires** (vitest, testing-library, ou autre)
- Prise en charge future de tests d'intégration (optionnel)

---

### 🚀 Vision long terme
- Ajout d'un module de devis / estimation prix
- Historique de configuration utilisateur
- Interface multi-profil : artisan / client final / distributeur

---


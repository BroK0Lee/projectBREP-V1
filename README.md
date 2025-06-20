# Configurateur 3D de Panneaux Bois

Une application web moderne pour configurer des panneaux en bois avec modélisation BREP (Boundary Representation) et interface 3D interactive.

## 🚀 Fonctionnalités

- **Interface 3D interactive** avec Three.js et React Three Fiber
- **Détection d'arêtes** par raycasting pour interactions précises
- **Configuration de chanfreins et congés** via modals intuitives
- **Gestion d'état centralisée** avec Zustand
- **Design moderne** avec ShadCN UI et Tailwind CSS
- **Architecture modulaire** et évolutive
- **Tests unitaires** avec Vitest

## 🛠️ Stack Technique

- **Frontend**: React 18 + TypeScript + Vite
- **3D**: Three.js + React Three Fiber + Drei
- **État**: Zustand avec DevTools
- **UI**: ShadCN UI + Tailwind CSS + Lucide Icons
- **Tests**: Vitest + Testing Library
- **Linting**: ESLint + Prettier

## 📦 Installation

```bash
# Installation des dépendances
npm install

# Lancement du serveur de développement
npm run dev

# Lancement des tests
npm run test

# Build pour la production
npm run build
```

## 🏗️ Architecture

```
src/
├── components/          # Composants UI réutilisables
│   ├── Scene3D.tsx     # Scène 3D principale
│   └── PanneauControle.tsx # Panneau de configuration
├── modals/             # Modals et dialogs
│   └── ModalOperationArete.tsx
├── models/             # Modèles 3D
│   └── PanneauBois.tsx
├── store/              # Gestion d'état Zustand
│   └── configurateurStore.ts
├── tools/              # Outils et helpers
│   └── raycastingHelper.ts
├── utils/              # Utilitaires
│   └── geometryUtils.ts
└── test/               # Tests unitaires
```

## 🎯 Utilisation

1. **Ajuster les dimensions** du panneau via le panneau de contrôle
2. **Cliquer sur une arête** du modèle 3D pour ouvrir le modal de configuration
3. **Choisir le type d'opération** (chanfrein ou congé) et ses paramètres
4. **Visualiser les modifications** en temps réel
5. **Exporter le modèle** (STEP - fonctionnalité à venir)

## 🔧 Développement

### Scripts disponibles

- `npm run dev` - Serveur de développement
- `npm run build` - Build de production
- `npm run test` - Tests unitaires
- `npm run test:ui` - Interface graphique des tests
- `npm run lint` - Vérification ESLint
- `npm run format` - Formatage Prettier

### Standards de code

- **Commentaires en français** pour la compréhension métier
- **Architecture modulaire** avec séparation des responsabilités
- **Tests unitaires** pour les fonctionnalités critiques
- **TypeScript strict** pour la sûreté du code

## 🚧 Feuille de route

### Version actuelle (MVP)
- ✅ Interface 3D de base
- ✅ Détection d'arêtes simplifiée
- ✅ Configuration chanfreins/congés
- ✅ Gestion d'état Zustand

### Prochaines versions
- 🔄 Intégration OpenCascade WebAssembly
- 🔄 Raycasting précis des arêtes BREP
- 🔄 Export STEP/STL/GLTF
- 🔄 Historique des opérations
- 🔄 Présets de matériaux
- 🔄 Mode collaboration temps réel

## 🤝 Contribution

1. Fork du projet
2. Création d'une branche feature (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit des modifications (`git commit -m 'Ajout nouvelle fonctionnalité'`)
4. Push vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouverture d'une Pull Request

## 📝 License

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Support

Pour toute question ou suggestion :
- Ouvrir une issue sur GitHub
- Contact via le fichier AGENTS.md pour les spécifications détaillées
#!/bin/bash

#1. Build Vite
echo "➡️ Build de l'application..."
npm install
npm run build || { echo "❌ Build échoué"; exit 1; }

# 2. Copie vers le serveur
echo "➡️ Copie des fichiers vers le serveur..."
scp -r dist/client/* debian@147.135.130.132:/var/www/backoffice_dedale_dev/ || { echo "❌ SCP échoué"; exit 1; }

# 3. Redémarrage Apache (optionnel, si besoin)
echo "➡️ Redémarrage Apache (si modifié)"
ssh debian@147.135.130.132 'sudo systemctl reload apache2'

echo "✅ Déploiement terminé avec succès."


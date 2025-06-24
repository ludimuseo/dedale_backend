import { FC } from 'react'

const AccessiblePage: FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <header className="bg-blue-600 py-3 text-center text-white">
        <h1 className="text-4xl font-bold">
          Documentation sur l'Accessibilité (A11Y)
        </h1>
        <nav className="mt-4">
          <ul className="flex justify-center space-x-6">
            <li>
              <a href="#html-semantique" className="hover:underline">
                HTML Sémantique
              </a>
            </li>
            <li>
              <a href="#navigation-clavier" className="hover:underline">
                Navigation Clavier
              </a>
            </li>
            <li>
              <a href="#contraste-visuel" className="hover:underline">
                Contraste et Visuel
              </a>
            </li>
            <li>
              <a href="#aria" className="hover:underline">
                ARIA
              </a>
            </li>
            <li>
              <a href="#formulaires" className="hover:underline">
                Formulaires
              </a>
            </li>
            <li>
              <a href="#react-native" className="hover:underline">
                React Native
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section id="html-semantique" className="mb-8">
          <h2 className="mb-4 text-2xl font-bold">
            HTML Sémantique et Structures Correctes
          </h2>
          <p className="mb-4">
            Utilisez des balises HTML natives plutôt que des {`<div>`} et{' '}
            {`<span>`}inutiles. Les titres{`<h1>`} à {` <h6>`} doivent être
            ordonnés (éviter de sauter des niveaux).
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-200 p-4">
            {`❌ Mauvais :
                                <div class="button" onclick="submitForm()">Envoyer</div>

                                ✅ Correct :
                                <button type="submit">Envoyer</button>`}
          </pre>
        </section>

        <section id="navigation-clavier" className="mb-8">
          <h2 className="mb-4 text-2xl font-bold">
            Navigation Clavier et Focus
          </h2>
          <p className="mb-4">
            Tous les éléments interactifs doivent être accessibles au clavier
            (TAB, ENTER, ESPACE). Le focus doit être bien visible
            (`:focus-visible` pour éviter les outlines moches).
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-200 p-4">
            {`❌ Mauvais :
                                button:focus {
                                outline: none;
                            }

                        ✅ Correct :
                                button:focus-visible {
                                    outline: 3px solid #FF9800;
                                    outline-offset: 4px;
                                }`}
          </pre>
        </section>

        <section id="contraste-visuel" className="mb-8">
          <h2 className="mb-4 text-2xl font-bold">
            Contraste et Accessibilité Visuelle
          </h2>
          <p className="mb-4">
            Vérifier le contraste avec WebAIM Contrast Checker. Éviter
            d’utiliser uniquement la couleur pour transmettre une information
            (ajouter du texte ou des icônes).
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-200 p-4">
            {`❌ Mauvais :
                                <p style="color: red;">Erreur dans le formulaire</p>

                            ✅ Correct :
                                <p style="color: red;">
                                <span role="img" aria-label="Erreur">⚠</span> Erreur dans le formulaire
                                </p>`}
          </pre>
        </section>

        <section id="aria" className="mb-8">
          <h2 className="mb-4 text-2xl font-bold">
            ARIA et Technologies d’Assistance
          </h2>
          <p className="mb-4">
            Ne pas utiliser ARIA inutilement si HTML natif suffit. Utiliser
            `aria-label`, `aria-labelledby`, `aria-describedby` pour améliorer
            la compréhension.
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-200 p-4">
            {`❌ Mauvais :
                                <div onclick="submitForm()" role="button">Envoyer</div>

                            ✅ Correct :
                                <button type="submit" aria-label="Envoyer le formulaire">Envoyer</button>`}
          </pre>
        </section>

        <section id="formulaires" className="mb-8">
          <h2 className="mb-4 text-2xl font-bold">
            Accessibilité des Formulaires
          </h2>
          <p className="mb-4">
            Tous les champs doivent avoir un {`<label>`} associé. Utiliser
            `aria-required="true"` pour indiquer un champ obligatoire si le
            label ne le précise pas.
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-200 p-4">
            {`❌ Mauvais :
                            <input type="text" placeholder="Nom">

                            ✅ Correct :
                                <label for="name">Nom</label>
                                <input type="text" id="name" required>`}
          </pre>
        </section>

        <section id="react-native" className="mb-8">
          <h2 className="mb-4 text-2xl font-bold">
            Accessibilité en React Native
          </h2>
          <p className="mb-4">
            Utiliser `accessibilityLabel` pour les boutons et images
            importantes. S’assurer que les éléments interactifs sont bien
            focusables (`accessible={true}`).
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-200 p-4">
            {`❌ Mauvais :
                            <TouchableOpacity onPress={submitForm}>
                            <Text>Envoyer</Text>
                            </TouchableOpacity>

                            ✅ Correct :
                                <TouchableOpacity
                                    accessible={true}
                                    accessibilityLabel="Envoyer le formulaire"
                                    accessibilityRole="button"
                                    onPress={submitForm}
                                >
                                <Text>Envoyer</Text>
                                </TouchableOpacity>`}
          </pre>
        </section>
      </main>
      <footer className="bg-blue-600 py-4 text-center text-white">
        <p>&copy; 2023 Documentation Accessible.</p>
      </footer>
    </div>
  )
}

export { AccessiblePage }

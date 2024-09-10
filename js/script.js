
$('#search-btn').on('click', function() {
    const pokemonId = $('#pokemon-id').val();
    const $pokemonContainer = $('#pokemon-container');
    const $errorMessage = $('#error-message');

    // Réinitialiser l'état d'affichage
    $pokemonContainer.addClass('hidden');
    $errorMessage.addClass('hidden');

    // Vérification de la validité de l'ID
    if (pokemonId < 1 || pokemonId > 893 || isNaN(pokemonId)) {
        $errorMessage.text('ID invalide. Veuillez entrer un nombre entre 1 et 893.');
        $errorMessage.removeClass('hidden');
        return;
    }

    // Appel à l'API PokéAPI pour récupérer les détails du Pokémon
    $.getJSON(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`)
        .done(function(data) {
            const pokemonName = data.names.find(name => name.language.name === 'fr').name;
            const captureRate = data.capture_rate;
            const description = data.flavor_text_entries.find(entry => entry.language.name === 'fr').flavor_text;
            const family = data.genera.find(genus => genus.language.name === 'fr').genus;
            const pokemonColor = data.color.name; // Couleur principale du Pokémon

            // Formater l'ID pour correspondre à l'URL de l'image (trois chiffres)
            const formattedId = pokemonId.padStart(3, '0');
            const pokemonImage = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${formattedId}.png`;

            // Mise à jour de l'interface utilisateur
            $('#pokemon-name').text(`#${pokemonId} ${pokemonName}`);
            $('#pokemon-image').attr('src', pokemonImage);
            $('#pokemon-description').text(description);
            $('#capture-rate').text(`Taux de capture : ${captureRate}`);
            $('#pokemon-family').text(`Famille : ${family}`);

            // Changer la couleur de la bordure pour qu'elle corresponde à la couleur du Pokémon
            $pokemonContainer.css({
                'border-color': pokemonColor,
                'border-style': 'solid',
                'border-width': '5px'
            });

            // Afficher les détails du Pokémon
            $pokemonContainer.removeClass('hidden');
        })
        .fail(function(error) {
            console.error('Erreur lors de la récupération des données:', error);
            $errorMessage.text('Une erreur est survenue. Veuillez réessayer.');
            $errorMessage.removeClass('hidden');
        });
});

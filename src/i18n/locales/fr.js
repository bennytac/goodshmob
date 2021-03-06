export default {
    app : {
        update: {
            title: "Mise à jour",
            label : "Mise à jour de goodsh.it. Un peu de patience..."
        }
    },
    "tabs": {
        home: {
            title: "Mes listes"
        },
        network: {
            title: "Fil d'actualité"
        },
        category_search: {
            title: "Explorer"
        }
    },
    lineups: {
        search: {
            placeholder: "Rechercher",
            empty: "Pas de résultat",
            empty_add: "Nous n'avons rien trouvé ! <br><a href='%{link}'>Ajoute</a> tes premiers <br>coups de cœur !",
        },
        filter: {
            empty: "Pas de résultat",
            deepsearch: "Chercher dans toutes mes listes",
            lineup_search: "Saisir des mots-clés pour trouver des listes auxquelles contribuer",
        },
        goodsh : {
            title: "À ranger plus tard"
        },
        mine : {
            title: "Mes listes"
        },
        others: {
            title: "Autres listes"
        },
        empty_screen: "Retrouve ici tous tes goodsh.\nTap '+' pour en ajouter un."
    },
    no_spam: {
        dialog_title: "Les 3 grands principes de goodsh.it",
        dialog_body: "- Tes goodsh ne sont visibles **QUE** par toi et ton réseau\n\n" +
        "- Quand tu enregistres un goodsh, tes contacts ne sont **PAS** notifiés\n\n" +
        "- Pour un goodsh **COMPLÈTEMENT** privé, active le cadenas",
        dialog_button: 'OK',
    },
    tips: {
        visibility: {
            title: "Visibilité",
            text: "Tes goodsh ne sont visibles que par toi et ton réseau",
            button: "OK"
        },
        noise: {
            title: "Notification",
            text: "Quand tu enregistres un goodsh, tes contacts ne sont pas notifiés",
            button: "OK"
        },
        full_private: {
            title: "Privé",
            text: "Pour un goodsh complètement privé, active le cadenas",
            button: "OK"
        },
        invite: {
            title: "Inviter",
            text: "Invite tes amis pour voir leurs coups de cœur et envies",
            button: "Inviter"
        },
    },
    home: {
        wizard: {
            action_button_label : "Ajouter un coup de cœur\nou une envie.",
            action_button_body : "Livre, film, série, resto, musique...",
        },
        tabs: {
            my_goodsh: "Mes listes",
            my_interests: "Listes collaboratives",
        }
    },
    search: {
        _: "Rechercher",
        deep: "Recherche étendue",
        in_items: "Saisir le nom à enregistrer",
        in_network: "Rechercher dans mon réseau",
        in_users: "Rechercher quelqu'un",
        in_my_contacts: "Rechercher dans mes contacts",
        in_my_lists: "Rechercher dans mes listes",
        in_his_lists: "Rechercher dans ses listes",
        by: "par",
        category: {
            "me": "Moi",
            "friends": "Mes amis",
            "all": "Tous",
            "more_details": "Appuyer pour plus de détails",
            "missing_permission": "Vous devez autoriser la géolocalisation pour chercher autour de vous",
            "missing_location": "Sélectionnez un lieu pour chercher autour de vous",
            "settings_permission": "Rendez-vous dans les paramètres pour autoriser la géolocalisation",
            retry: "Réessayer",
            authorize: "Autoriser la géolocalisation"
        }
    },
    "shared":{
        "goodsh_saved":"Enregistré",
        "add":"Ajouter",
        "link_copied":"Lien copié ✓",
    },
    "activity_item": {
        header: {
            in: "%{adder} dans %{lineup}",
            added_somewhere: "l'a ajouté",
            to: "%{from} a envoyé %{what} à %{to}",
            ask: "%{asker} a besoin de recos !",
            answer: "%{answerer} a répondu à '%{what}'",
            comment: "%{commenter} a commenté %{what}",
            like: "%{liker} a aimé %{what}",
        },
        buttons:{
            "comment": {
                zero: "DONNER SON AVIS",
                one: "DONNER SON AVIS (1)",
                other: "DONNER SON AVIS (%{count})"
            },
            "share":"ENVOYER LE LIEN",
            "save":"ENREGISTRER",
            "unsave":"SUPPRIMER",
            "see":"VOIR",
            "buy":"ACHETER",
            "answer": {
                zero: "RÉPONDRE",
                one: "RÉPONDRE (1)",
                other: "RÉPONDRE (%{count})"
            },
            "modified_list": "Liste renommée",
            "deleted_list": "Liste effacée"
        }
    },
    "activity_screen":{
        "comments":{
            "no_comments":"Un avis ? Une suggestion ? Une question ?",
            "user_answered":"a commenté",
            "has_commented": {
                zero: "%{first} a commenté",
                one: "%{first} et %{second} ont commenté",
                other: "%{first} et %{count} autres ont commenté"
            },
            "has_commented_this": {
                zero: "%{first} a commenté",
                one: "%{first} et %{second} ont commenté",
                other: "%{first} et %{count} autres ont commenté"
            },
            "has_commented_this_as_well": {
                zero: "%{first} a aussi commenté",
                one: "%{first} et %{second} ont aussi commenté",
                other: "%{first} et %{count} autres ont aussi commenté"
            },
            "see_theirs_comments": {
                zero: "Voir ses commentaires.",
                one: "Voir ses commentaires.",
                other: "Voir leurs commentaires."
            }
        }
    },
    "login_screen":{
        "facebook_signin":"SE CONNECTER AVEC FACEBOOK",
        "no_publication":"goodsh.it ne publie rien sur Facebook.",
        "account_kit_signin":"Se connecter sans Facebook",
        "definition":{
            "example":"##Bouquin, restaurant, film, série, artiste,\nlieu, musique, gadget, fringue, vin, …"
        },
        "value_proposal":"##Marre d’oublier les recommandations\nqu’on te fait ?",
        "slider_intro_1": "L’app où \n" + "<bold>tu stockes</bold> tout \n" + "ce que <bold>tu aimes</bold>",
        "slider_intro_2": "<bold><black>Créé</black></bold>\ndes listes collaboratives\navec",
        "slider_intro_3": "<bold><black>Contribue</black></bold>\naux listes\nqui t’intéressent",
        "slider_intro_4": "<bold><black>Crée des listes</black></bold>\ncollaboratives\navec tes",
        "slider_intro_4_bis": "<bold>Amis</bold>,\nfamille,\ncollègues,\nfans,\n...\n",
        "credentials": "Keep all you love",
        "button_start": "Commencer",
        "button_next": "Suivant",
        "button_skip": "Passer"
    },
    "popular_screen":{
        "title": "Enregistrer vos premières envies",
        "main_explanation": "En choisissant parmi le palmarès du moment :",
        "empty": "No popular items found",
        item_selected: {
            zero: "Sélectionner des envies",
            one: "Ajouter 1 élément",
            other: "Ajouter %{count} éléments"
        },
        "button_skip": "Passer",
        "button_next": "Ajouter",
    },
    "profile_screen":{
        "title":"Feedback",
        "subtitle":"##Comment tu la trouves ? Tu la kiffes ? Qu'est-ce qui manque cruellement ? On a très envie de savoir...",
    },
    "edit_profile_screen":{
        "title": "Complétez votre profil",
    },
    "detail_screen":{
        "related_activities_title": "Autres activités"
    },
    "create_list_controller":{
        "title":"+ Nouvelle liste",
        "subtitle":"##Pour y ranger plein de trucs top et les partager si je veux",
        "placeholder":"Sois créatif !",
        "action":"Créer une nouvelle liste",
        "created":"Liste créée",
        "visible":"Visible par mon réseau",
        "unvisible":"Visible que par moi",
        "add_description":"Ajouter un petit mot",
        "choose_list":"Choisir une liste",
        "choose_another_list":"Choisir une autre liste",
        "all_list" : "Toutes mes listes",
        "add_to_list": "Ajouter à"
    },
    "search_bar":{
        "me_placeholder":"Rechercher dans mes listes",
        "network_placeholder":"Rechercher dans mon réseau",
        "lineup_placeholder":"Chercher des listes auxquelles contribuer",
        "places_placeholder":"Chercher restaurants, des bars ...",
        "users_placeholder":"Chercher des utilisateurs"
    },
    "network_search_tabs":{
        "savings":"LISTES",
        "users":"MEMBRES"
    },
    "community":{
        "screens": {
            "friends":"Ma communauté",
            "notifications":"Notifications",
        },
        "empty_screen": "Découvre ici les actus de tes contacts."
    },
    "contacts":{
        "empty_screen": "Inviter des contacts à mettre en commun des coups de cœur et envies avec moi",
        "empty_search": "Pas de résultat trouvé",
        "empty_screen_button": "Voir mes contacts téléphoniques",
    },
    "my_interests_screen":{
        "empty_screen": "Explore les listes de tes amis, et suis les plus intéressantes !",
        "search_lists_title": "Recherche de liste"
    },
    "comments_screen":{
        "title": "Commentaires"
    },
    "search_screen":{
        "title": "Rechercher"
    },
    "search_item_screen":{
        "title": "Ajouter",
        "tabs": {
            "consumer_goods":"LIVRE\n&\nAUTRE",
            "places":"LIEU",
            "movies":"FILM\n&\nSERIE",
            "musics":"SON",
            savings: "Listes",
            users: "Membres",
        },
        "placeholder": {
            "consumer_goods":"livre, cadeau, gadget,\nchaussures, vin, jouet...",
            "places":"restaurant, café,\nboutique, hôtel, musée,\nville, plage, lieu touristique...",
            "movies":"film, série, documentaire, émission... ",
            "musics":"titre, artiste, album...",
            "savings": "Saisir des mots-clés pour trouver des listes",
            "users": "Chercher des membres à suivre",

        },
        "searchbar_placeholder": {
            "consumer_goods": "Rechercher",
            "places": "Rechercher",
            "movies": "Rechercher",
            "musics": "Rechercher",
            "savings": "Rechercher",
            "users": "Rechercher",
        },
        blank: {
            users: "Trouver des membres à suivre"
        },
        "search_options":  {
            "around_me": "Autour de moi"
        }
    },
    "activity_comments_screen":{
        "add_comment_placeholder":"Répondre"
    },
    "send_screen":{
        "add_description_placeholder": "Ajouter une note à l'envoi",
        "sent": "Envoyé",
        actions: {
            send: "Envoyer",
            sending: "envoi en cours",
            send_ok: "✓  envoyé",
            send_ko: "Réessayer",
        }
    },
    "interactions":{
        "saving":"a enregistré %{what}",
        "comment":"a commenté %{what}",
        "comment_ask":"a répondu à '%{what}'",
        "like":"dit YEAAH! à %{what}",
        "list":"a créé la liste %{what}",
        "post":"a posté %{what}",
        "sending":"t’a envoyé %{item_title}",
        "invitation":"Connexion réussie avec %{you}",
        "you":"toi",
        "empty_screen":"Quand on aime on partage."
    },
    util: {
        time: {
            since_seconds: "à l'instant",
            since_minutes: {
                zero: "",
                one: "Il y a 1 minute",
                other: "Il y a %{count} minutes"
            },
            since_hours: {
                zero: "",
                one: "Il y a 1 heure",
                other: "Il y a %{count} heures"
            },
            since_days: {
                zero: "",
                one: "Il y a 1 jour",
                other: "Il y a %{count} jours"
            },
            since_months: {
                zero: "",
                one: "Il y a 1 mois",
                other: "Il y a %{count} mois"
            },
            since_years: {
                zero: "",
                one: "Il y a 1 an",
                other: "Il y a %{count} ans"
            },
        }
    },
    loadmore: "Chargement",
    send_message: "Je t'envoie ceci de goodsh.it : l'app où tu stockes tout ce que tu aimes.",
    send_object: "te recommande %{what} - via goodsh.it",

    invite_message: "Je t'invite à contribuer à \"%{what}\".",
    invite_object: "inviter à contribuer à \"%{what}\"",


    goodsh_url: "https:\/\/goodsh.it\/",
    friends: {
        empty_screen: "Invite des amis.",
        buttons: {
            connect: "Connecter",
            disconnect: "Déconnecter",
        },
        messages: {
            connect: "connecté",
            disconnect: "déconnecté",
        },
        alert: {
            title: "Déconnexion",
            label: "Êtes-vous sûr de vouloir vous déconnecter ?"
        }
    },
    follow: {
        alert: {
            title_unfollow: "Ne plus contribuer à cette liste",
            label: "Êtes-vous sûr de vouloir ne plus contribuer à cette liste ?",
        },
        messages: {
            unfollowed: "Vous n'êtes plus membre contributeur de cette liste",
            followed: "Vous êtes maintenant membre contributeur de cette liste"
        }
    },
    unsave_screen: {
        unsave_button: {
            idle: "Supprimer",
            sending: "Suppression...",
            ok: "Supprimé",
            ko: "Ré-essayer",
        }
    },
    empty_lineup_cry: "Pas grand chose d'intéressant ici !",
    empty_lineup_add: "Cette liste est vide\n <a href='%{link}'>ajoute</a> ce que tu aimes !",
    activity_action_bar: {
        goodsh_deleted: "Goodsh supprimé",
        goodsh_deleted_undo: "Restaurer",
        goodsh_bookmarked: "Goodsh ajouté dans %{lineup}",
        goodsh_bookmarked_change_lineup: "Changer",
        comment: {
            title: "Commentaires"
        },
        response: {
            title: "Réponses"
        }
    },
    "more_activities": {
        zero: "",
        one: "%{count} activité supplémentaire",
        other: "%{count} activités supplémentaires",
    },
    "there_are_activities": {
        zero: "",
        one: "Il y a",
        other: "Il y a",
    },
    add_item_screen: {
        title: "Choisir une liste"
    },
    home_search_screen: {
        saving: {
            title: "Détails",
        },
        community: {
            title: "Mon réseau",
        }
    },
    actions: {
        ok: "Ok",
        add: "Ajouter",
        delete: "Supprimer",
        change: "Modifier",
        change_title: "Modifier le titre",
        edit_saving_menu: "Éditer ce goodsh",
        contact_list_options: "Options des contacts",
        share: "Partager",
        share_list: "Partager cette liste",
        change_description: "Modifier la description",
        sync_contact_list: "Synchroniser la liste",
        move: "Déplacer",
        change_name: "Changer le nom de cette liste",
        undo: "Annuler",
        cancel: "Annuler",
        buy: "Acheter",
        send: "Envoyer",
        create: "Créer",
        try_again: "Réessayer",
        ask_friend: "Poser une question à mon réseau",
        logout: "Déconnexion",
        follow: "Contribuer",
        followed: "Contributeur",
        unfollow: "Ne plus contribuer",
        connect: "Se connecter",
        connected: "Connectés",
        terms: "Conditions d'utilisation",
        copy_link: "Copier le lien",
        send_to_goodsher: "Envoyer à un contact",
        skip: "Passer",
        ask: "Demander à mon réseau",
        ask_button: "Ask",
        invite: "Inviter des amis",
        load_more: "Charger la suite",
        unsave: "Enregistré",
        save: "Enregistrer",

    },
    common: {
        empty_feed_generic: "Quand on aime on partage.\nCrée ton réseau de contacts.",
        api: {
            generic_error: "Oups... Prolème de connexion."
        }
    },
    ask: {
        sent: "Demande envoyée",
        cancel: "Annuler la demande ?",
        minimal_length: "La question doit faire au moins 10 caractères."
    },
    share_goodsh: {
        title: "Viens goodsher avec moi.",
        message: "Je t'invite sur goodsh.it : l'app où tu stockes tout ce que tu aimes. https://goodsh.it/",
    },
    loading: {
        error: "Oups... Problème avec internet. ",
        offline: "Vous n'êtes pas connecté. ",
    },
    alert: {
        delete: {
            title: "Enlever de mes listes",
            label: "Confirmer ?"
        },
        position: {
            title: "Lieux autour de moi",
            message: "Pour trouver les lieux autour de vous, activer la localisation",
            button: "Activer"
        }
    },
    dev: {
        label: "Menu de développement",
        title: "DevMenu"
    },
    congrats: {
        generic: "C'est fait ;)"
    },
    errors: {
        unavailable: 'Le contenu n\'est pas disponible',
        generic: "Oups... Il y a quelquechose qui cloche"
    },
    form: {
        label: {
            last_name: 'Nom',
            first_name: 'Prénom'
        },
        warning: {
            fill_all_fields: 'Veuillez remplir tous les champs',

        },
        description: {
            user_name: 'Veuillez indiquer votre nom'
        }
    },
    user_sheet: {
        goodsh_count: "Goodshs",
        lineup_count: "Listes",
        friend_count: "Contacts",
    },
    current_location: "Autour de moi",
    by: "par %{who}",
    search_here: "Rechercher dans cette zone",
    invite: "Inviter",
    skip: "Passer",
    save_congratz: "<big>Félicitations !!!</big>\n<bold>%{item_title}</bold> a été enregistré dans la <bold>%{list_name}</bold>\n\nN'hésite pas à partager tes pépites avec tes amis !",
    invite_button: {
        zero: "Inviter",
        one: "Inviter %{name}",
        other: "Inviter %{count} contacts"
    },
    invite_contacts: "Inviter des contacts",
    share_app: "Partager",
    with_your_friends: "avec vos amis",
    explore: {
        friends: {
            empty: "<a href='%{link}'>Invite</a> tes amis pour voir leurs coups de cœur et envies",
        }
    },
    lineup_medals: {
        elements: {
            zero: "élément",
            one: "élément",
            other: "éléments"
        },
        followers: {
            zero: "contributeur",
            one: "contributeur",
            other: "contributeurs"
        },
    },
    user_medals: {
        lists: {
            zero: "%{count} liste",
            one: "%{count} liste",
            other: "%{count} listes"
        },
        elements: {
            zero: "%{count} élément",
            one: "%{count} élément",
            other: "%{count} éléments"
        },
        friends: {
            zero: "abonné(e)",
            one: "abonné(e)",
            other: "abonné(e)s"
        },
    },
    friends_empty: "Find your friends \nand enjoy goodsh.it together",
    focus_contribute_title: "Contribuez aux listes de vos amis!",
    focus_contribute_text: "Vous pouvez maintenant facilement contribuer aux listes de vos amis ! Essayez !",
    my_connections: "Mes connexions",
    invite_lineup: "inviter",
    invite_lineup_title: "Inviter à contribuer",

}

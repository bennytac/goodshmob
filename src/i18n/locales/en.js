export default {
    app : {
        update: {
            title: "Update",
            label : "Updating your app, please be patient..."
        }
    },
    "tabs": {
        home: {
            title: "My lists"
        },
        network: {
            title: "News feed"
        },
        category_search: {
            title: "Explore"
        }
    },
    lineups: {
        search: {
            placeholder: "Search",
            empty: "No result",
            empty_add: "Nothing to display ! <a href='%{link}'>Add your first items</a>",
        },
        filter: {
            empty: "Search in my lists on the server",
            deepsearch: "Search in all my lists",
            lineup_search: "Tap keywords for interesting lists to follow",
        },
        goodsh : {
            title: "Catch-all Box"
        },
        mine : {
            title: "My lists"
        },
        others: {
            title: "Other lists"
        },
        empty_screen: "All your goodsh in one place.\nTap '+' to save a new one."
    },
    no_spam: {
        dialog_title: "The 3 pillars of goodsh.it",
        dialog_body: "- Your goodsh are **ONLY** visible by you and your friends\n\n" +
        "- When you save a goodsh, we **DON'T** notify your contacts\n\n" +
        "- For a fully private goodsh, tap the lock\n\n",
        dialog_button: 'OK',
    },
    tips: {
        visibility: {
            title: "Visibility",
            text: "Your goodsh are only visible by you and your friends",
            button: "OK"
        },
        noise: {
            title: "Notification",
            text: "When you save a goodsh, we don't notify your contacts",
            button: "OK"
        },
        full_private: {
            title: "Privacy",
            text: "For a fully private goodsh, tap the lock",
            button: "OK"
        },
        invite: {
            title: "Invite",
            text: "Invite your friends to see their coups de cœur",
            button: "Invite"
        },
    },
    home: {
        wizard: {
            action_button_label : "Add a coup de cœur\nor a wish",
            action_button_body : "Book, movie, tvshow, restaurant, music...",
        },
        tabs: {
            my_goodsh: "My lists",
            my_interests: "Collaborative lists",
        }
    },
    search:{
        _: "Search",
        deep: "Deep search",
        in_items: "Find anything",
        in_network: "Search in my network",
        in_users: "Find users",
        in_my_contacts: "Rechercher dans mes contacts",
        in_my_lists: "Search in my lists",
        in_his_lists: "Search",
        by: "by",
        category: {
            "me": "Me",
            "friends": "My friends",
            "all": "All",
            "more_details": "Press for more details",
            missing_permission: "You must authorize geolocation to search around you",
            missing_location: "Select a place to start a search",
            settings_permission: "Open settings and enable geolocation",
            retry: "Retry",
            authorize: "Authorize geolocation"
        }
    },
    "shared":{
        "goodsh_saved":"Saved",
        "add":"Add",
        "link_copied":"Link copied ✓",
    },
    "activity_item":{
        header: {
            in: "%{adder} added %{what} in %{lineup}",
            added_somewhere: "added it",
            to: "%{from} sent %{what} to %{to}",
            ask: "%{asker} needs some tips!",
            answer: "%{answerer} anszered '%{what}'",
            comment: "%{commenter} a commenté %{what}",
            like: "%{liker} a aimé %{what}",
        },
        buttons:{
            "comment": {
                zero: "COMMENT",
                one: "COMMENT (1)",
                other: "COMMENT (%{count})"
            },

            "share":"SEND THE LINK",
            "save":"SAVE",
            "unsave":"DELETE",
            "see":"VIEW",
            "buy":"BUY",
            "answer": {
                zero: "ANSWER",
                one: "ANSWER (1)",
                other: "ANSWER (%{count})"
            },
            "modified_list": "List renamed",
            "deleted_list": "List deleted"
        }
    },
    "activity_screen":{
        "comments":{
            "no_comments":"Any idea? Suggestion? Question?",
            "user_answered":"replied",
            "has_commented": {
                zero: "%{first} commented",
                one: "%{first} and %{second} commented",
                other: "%{first} and %{count} more commented"
            },
            "has_commented_this": {
                zero: "%{first} commented",
                one: "%{first} et %{second} commented",
                other: "%{first} et %{count} more commented"
            },
            "has_commented_this_as_well": {
                zero: "%{first} commented also",
                one: "%{first} et %{second} commented also",
                other: "%{first} et %{count} more commented also"
            },
            "see_theirs_comments": {
                zero: "See their comments.",
                one: "See their comments.",
                other: "See their comments."
            }
        }
    },
    "login_screen":{
        "facebook_signin":"SIGN IN WITH FACEBOOK",
        "no_publication":"goodsh.it does not post anything on Facebook.",
        "account_kit_signin":"Sign in without Facebook",
        "definition":{
            "example":"##Bouquin, restaurant, film, série, artiste,lieu, musique, gadget, fringue, vin, …"
        },
        "value_proposal":"##I was said it is\n" +"very good.\n" + "Not to forget it\n" + "I stored it\n" + "in",
        "slider_intro_1": "The app to\n" + "<bold>keep</bold> \n" + "all you <bold>love</bold>",
        "slider_intro_2": "<bold><black>Create</black></bold>\nlists\namong",
        "slider_intro_3": "<bold><black>Contribute</black></bold>\nto lists\nthat interest you",
        "slider_intro_4": "<bold><black>Share</black></bold>\nyour coups de cœurs\nwith anyone you want",
        "slider_intro_4_bis": "<bold>Friends</bold>,\nfamily,\nworkmates,\nfans,\n...\n",
        "credentials": "Keep all you love",
        "button_start": "Start",
        "button_next": "Next",
        "button_skip": "Skip"
    },
    "popular_screen":{
        "title": "Add your first wishs",
        "main_explanation": "By choosing among the best of this week:",
        "empty": "No popular items found",
        item_selected: {
            zero: "Select some wishes",
            one: "Add 1 item",
            other: "Add %{count} items"
        },
        "button_skip": "Skip",
        "button_next": "Add",
    },
    "profile_screen":{
        "title":"Feedback",
        "subtitle":"##Is this what you've been dreaming of? How good do you feel? What's badly missing? We can't wait to know…"
    },
    "edit_profile_screen":{
        "title": "Complete your profile",
    },
    "detail_screen":{
        "related_activities_title": "Related activities"
    },
    "create_list_controller":{
        "title":"+ New list",
        "subtitle":"##Be creative;)",
        "placeholder":"Be creative;)",
        "action":"Add new list",
        "created":"New list added",
        "visible":"Visible by network",
        "unvisible":"Visible only by me",
        "add_description":"Add a note",
        "choose_list":"Choose a list",
        "choose_another_list":"Choose another list",
        "all_list": "All my lists",
        "add_to_list": "Add to"
    },
    "search_bar":{
        "me_placeholder":"Search in your lists",
        "network_placeholder": "Browse your network",
        "lineup_placeholder": "Search lists to follow",
        "places_placeholder":"Search for restaurants, bars...",
        "users_placeholder":"Search for users",
    },
    "network_search_tabs":{
        "savings":"LISTS",
        "users":"MEMBERS"
    },
    "community":{
        "screens": {
            "friends":"My community",
            "notifications":"Notifications",
        },
        "empty_screen": "The goodsh of your friends are here.\nInvite them to share your tips with them."
    },
    "contacts":{
        "empty_screen": "You haven't imported your contacts yet.",
        "empty_search": "No result found",
        "empty_screen_button": "Import",
    },
    "my_interests_screen":{
        "empty_screen": "You will find every list you follow here.\nExplore your friends lists, and find them here !",
        "search_lists_title": "List search"
    },
    "comments_screen":{
        "title": "Comments"
    },
    "search_screen":{
        "title": "Search"
    },
    "search_item_screen":{
        "title": "Add",
        "tabs": {
            "consumer_goods":"BOOK & OTHER",
            "places":"PLACE",
            "movies":"MOVIE & TV",
            "musics":"MUSIC",
            savings: "Lists",
            users: "Members",
        },
        "placeholder": {
            "consumer_goods":"books, gifts, shoes,\nwine, games, products...",
            "places":"restaurants, cafés,\nshops, hotels, museums,\ncities, beaches, places to visit...",
            "movies":"movies, TV shows",
            "musics":"tracks, artists, albums",
            "savings": "Tap keywords for interesting lists",
            "users": "Search for users to follow",
        },
        "searchbar_placeholder": {
            "consumer_goods": "Search",
            "places": "Search",
            "movies": "Search",
            "musics": "Search",
            "savings": "Search",
            "users": "Search",
        },
        blank: {
            users: "Find users to follow"
        },
        "search_options":  {
            "around_me": "Around me"
        }
    },
    "activity_comments_screen":{
        "add_comment_placeholder":"Reply"
    },
    "send_screen":{
        "add_description_placeholder": "Ajouter une note à l'envoi",
        "sent": "Sent",
        actions: {
            send: "Send",
            sending: "sending",
            send_ok: "sent",
            send_ko: "Retry",
        }
    },
    "interactions":{
        "saving":"saved %{what}",
        "comment":"commented %{what}",
        "comment_ask":"replied on '%{what}'",
        "like":"said YEAAH! to %{what}",
        "list":"created the list %{what}",
        "post":"posted %{what}",
        "sending":"sent %{what} to you",
        "invitation":"Connexion successful with %{you}",
        "you":"you",
        "empty_screen": "If you love it, share it.",
    },
    util: {
        time: {
            since_seconds: "just now",
            since_minutes: {
                zero: "",
                one: "1 minute ago",
                other: "%{count} minutes ago"
            },
            since_hours: {
                zero: "",
                one: "1 hour ago",
                other: "%{count} hours ago"
            },
            since_days: {
                zero: "",
                one: "1 day ago",
                other: "%{count} days ago"
            },
            since_months: {
                zero: "",
                one: "1 month ago",
                other: "%{count} months ago"
            },
            since_years: {
                zero: "",
                one: "1 year ago",
                other: "%{count} years ago"
            },
        }
    },
    loadmore: "Loading",
    send_message: "I send it to you from goodsh.it : the app to keep all you love.",
    send_object: "recommend you %{what} - via goodsh.it",

    invite_message: "I would like to invite you to contribute to %{what}.",
    invite_object: "invite you to contribute to %{what} - via goodsh.it",


    goodsh_url: "https:\/\/goodsh.it\/",
    friends: {
        empty_screen: "Fully enjoy goodsh.it by inviting your friends.",
        buttons: {
            connect: "Connect",
            disconnect: "Disconnect",
        },
        messages: {
            connect: "connected",
            disconnect: "disconnected",
        },
        alert: {
            title: "Disconnection",
            label: "Are you sure?"
        }
    },
    follow: {
        alert: {
            title_unfollow: "Stop contributions",
            label: "Are you sure ?",
        },
        messages: {
            unfollowed: "You are not a editor on this list anymore",
            followed: "You are now a contributor on this list"
        }
    },
    unsave_screen: {
        unsave_button: {
            idle: "Delete",
            sending: "Deleting...",
            ok: "Deleted",
            ko: "Retry",
        }
    },
    empty_lineup_cry: "Nothing interesting here!",
    empty_lineup_add: "This list is empty\n <a href='%{link}'>add</a> what you love!",
    activity_action_bar: {
        goodsh_deleted: "Goodsh deleted",
        goodsh_deleted_undo: "Undo",
        goodsh_bookmarked: "Goodsh added in %{lineup}",
        goodsh_bookmarked_change_lineup: "Change",
        comment: {
            title: "Comments"
        },
        response: {
            title: "Replies"
        }
    },
    "more_activities": {
        zero: "",
        one: "%{count} more activity",
        other: "%{count} more activities",
    },
    "there_are_activities": {
        zero: "",
        one: "There is",
        other: "There are",
    },
    add_item_screen: {
        title: "Select list"
    },
    home_search_screen: {
        saving: {
            title: "Details",
        },
        community: {
            title: "My network",
        }
    },
    loading: {
        error: "D@#m$%n, loading error.",
        offline: "You are not connected to the internet. ",
    },
    actions: {
        ok: "Ok",
        add: "Add",
        delete: "Delete",
        change: "Change",
        change_title: "Change title",
        edit_saving_menu: "Edit this goodsh",
        contact_list_options: "Contacts options",
        share: "Share",
        share_list: "Share this list",
        change_description: "Change the description",
        sync_contact_list: "Synchronise list",
        move: "Change list",
        change_name: "Rename this list",
        undo: "Undo",
        cancel: "Cancel",
        buy: "Buy",
        send: "Send",
        create: "Create",
        try_again: "Try Again",
        ask_friend: "Ask my network",
        logout: "Logout",
        follow: "Contribute",
        followed: "Contributor",
        unfollow: "Stop contribution",
        connect: "Connect",
        connected: "Connected",
        terms: "Terms and personal data",
        copy_link: "Copy link",
        send_to_goodsher: "Send to another\nuser",
        skip: "Skip",
        ask: "Ask my network",
        ask_button: "Ask",
        invite: "Invite a friend",
        load_more: "Load more",
        unsave: "Saved",
        save: "Save",
    },
    common: {
        empty_feed_generic: "If you love it, share it.\nWhy don't you invite some friends to goodsh?",
        api: {
            generic_error: "Oops... Problem with the internet."
        }
    },
    ask: {
        sent: "Request sent",
        cancel: "Cancel the request ?",
        minimal_length: "The question must be at least 10 characters."

    },
    share_goodsh: {
        title: "Come goodsh with me",
        message: "I invite you on goodsh.it: the app to keep all you love. https://goodsh.it/"
    },
    alert: {
        delete: {
            title: "Delete",
            label: "Are you sure?"
        },
        position: {
            title: "Places around me",
            message: "To find the places around you, activate your location",
            button: "Activate"
        }
    },
    dev: {
        label: "Development menu",
        title: "DevMenu"
    },
    congrats: {
        generic: "Done;)"
    },
    errors: {
        unavailable: 'Content not available',
        generic: "Oops... Something went wrong"
    },
    form: {
        label: {
            last_name: 'Last name',
            first_name: 'First name'
        },
        warning: {
            fill_all_fields: 'Please fill all the fields',
        },
        description: {
            user_name: 'Please fill in your first and last name'
        }
    },
    user_sheet: {
        goodsh_count: "Goodshs",
        lineup_count: "Lists",
        friend_count: "Contacts",
    },
    "current_location": "Around me",
    by: "by %{who}",
    search_here: "Search here",
    invite: "Invite",
    skip: "Skip",
    save_congratz: "<big>Félicitations !!!</big>\n%<bold>{item_title}</bold> a été enregistré dans la <bold>%{list_name}</bold>\n\nN'hésite pas à partager tes pépites avec tes amis !",
    invite_button: {
        zero: "Invite",
        one: "Invite %{name}",
        other: "Invite %{count} contacts"
    },
    invite_contacts: "Inviter des contacts",
    share_app: "Share",
    with_your_friends: "with your friends",
    lineup_medals: {
        elements: {
            zero: "element",
            one: "element",
            other: "elements"
        },
        followers: {
            zero: "contributor",
            one: "contributor",
            other: "contributors"
        },
    },
    user_medals: {
        lists: {
            zero: "%{count} list",
            one: "%{count} list",
            other: "%{count} lists"
        },
        elements: {
            zero: "%{count} element",
            one: "%{count} element",
            other: "%{count} elements"
        },
        friends: {
            zero: "follower",
            one: "follower",
            other: "followers"
        },
    },
    friends_empty: "Find your friends \nand enjoy goodsh.it together",
    focus_contribute_title: "Contribuez aux listes de vos amis!",
    focus_contribute_text: "Vous pouvez maintenant facilement contribuer aux listes de vos amis ! Essayez !",
    my_connections: "My connections",
    invite_lineup: "invite",
    invite_lineup_title: "Invite to contribute",
}

// Back-end URL.
export const backend_url = process.env.REACT_APP_API_URL;

// Header constants.
// desktop-links
export const navLinks = [
    {
        id: "home",
        title: "Home",
        path: "/",
        icon: "home",
    },
    {
        id: "search",
        title: "Search",
        path: "#",
        icon: "search",
        function: "search"
    },
    {
        id: "post",
        title: "Post",
        path: "/post",
        icon: "post",
    },
    {
        id: "profile",
        title: "Profile",
        path: "/profile",
        icon: "profile"
    }, 
];

// mobile-links
export const mobLinks = [    
    {
        id: "home",
        title: "Home",
        path: "/",
        icon: "home",
    },
    {
        id: "post",
        title: "Post",
        path: "/post",
        icon: "post",
    },
    {
        id: "settings",
        title: "Settings",
        path: "/settings",
        icon: "settings",
    }       
];

export const socialLinks = [
    {
        id: "github",
        name: "Github",
        icon: "github",
        link: "https://github.com/rmaci3l"
    },
    {
        id: "email",
        name: "E-mail",
        icon: "email",
        link: "mailto:"
    },
    {
        id: "youtube",
        name: "Youtube",
        icon: "youtube",
        link: "https://youtube.com"
    },
    {
        id: "twitter",
        name: "Twitter",
        icon: "twitter",
        link: "https://x.com"
    }
]

// Settings page constants.
// settings-options.
export const configLinks = [    
    {
        id: "Edit Profile",
        type: "account",
        path: "edit",
        icon: "editprofile"
    },
    {
        id: "Notifications",
        type: "account",
        path: "notifications",
        icon: "notifications"
    },    
    {
        id: "Privacy",
        type: "account",
        path: "privacy",
        icon: "privacy"
    },
    {
        id: "Activity",
        type: "account",
        path: "activity",
        icon: "activity"
    },
    {
        id: "Language",
        type: "interface",
        path: "language",
        icon: "language"
    },
    {
        id: "Theme",
        type: "interface",
        path: "theme",
        icon: "theme"
    },
    {
        id: "Report an Issue",
        type: "support",
        path: "report",
        icon: "report"
    },    
    {
        id: "About Us",
        type: "support",
        path: "about",
        icon: "about"
    },    
];

// settings-language
export const countries = [
    // {
    //     id: "en-us",
    //     name: "English, US",
    //     flag: "us"
    // },
    {
        id: "en-uk",
        name: "English, UK",
        flag: "gb"
    },
    {
        id: "de",
        name: "Deutsch",
        flag: "de"
    },
    {
        id: "fr",
        name: "Français",
        flag: "fr"
    },
    {
        id: "jp",
        name: "日本語",
        flag: "jp"
    },
    {
        id: "pt-br",
        name: "Português do Brasil",
        flag: "br"
    },
    {
        id: "pt-pt",
        name: "Português",
        flag: "pt"
    },
    {
        id: "es",
        name: "Español",
        flag: "es"
    },
    {
        id: "zh-cn",
        name: "中文",
        flag: "cn"
    },
    {
        id:"cat-land",
        name: "Meowlish (Holy Land of Cats)",
        flag: "xk"
    }
]

//settings-notifications
export const notification_settings = [
    {
        name: "Notificate new Followers",
        description: "Enable notifications when someone follows your profile.",
        id: "form-follow",
        register: 'enable-follow',
    },
    {
        name: "Enable Post Reactions",
        description: "Enable notifications when someone interacts with one of your posts.",
        id: "form-reactions",
        register: 'enable-postreact',
    },
    {
        name: "View Friends New Content",
        description: "Shows notifications whenever someone you follow creates a new content.",
        id: "form-friends",
        register: 'enable-friendscontent',
    }
]

//settings-privacy
export const privacy_settings = [
    {
        name: "Private Profile",
        description: "Make your profile private so no one can see your content.",
        id: "form-private",
        register: 'enable-private',
    },
    {
        name: "Allow Foreign Likes",
        description: "Allow users that you're not friends with to like your content.",
        id: "form-foreign",
        register: 'enable-foreign',
    },
]

//settings-activity
export const activity_settings = [
    {
        name: "Share your Activity",
        description: "Enable another users to be notified when you post new content.",
        id: "form-activity",
        register: 'enable-activity',
    },
]

//settings-themes
export const themes = [
    // {
    //     id: "grey-dark",
    //     name: "Grey Dark",
    //     color: "grey-dark",
    // },
    {
        id: "cool-white",
        name: "Cool White",
        color: "from-white-light to-white-medium",
    },
    {
        id: "purple-nyan",
        name: "Purrple Nyan",
        color: "from-indigo-500 to-indigo-700",
    },
]

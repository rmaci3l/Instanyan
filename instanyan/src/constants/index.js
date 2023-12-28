import {  faComment, faHeart, faShare } from '@fortawesome/free-solid-svg-icons';


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
        path: "",
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


export const configLinks = [    
    {
        id: "Edit Profile",
        type: "account",
        path: "edit"
    },
    {
        id: "Language",
        type: "account",
        path: "language"
    },
    {
        id: "Activity",
        type: "account",
        path: "activity"
    },
    {
        id: "Notifications",
        type: "account",
        path: "notifications"
    },
    {
        id: "About",
        type: "company",
        path: "about"
    },
    {
        id: "Help",
        type: "company",
        path: "help"
    },
    {
        id: "Report an Issue",
        type: "company",
        path: "report"
    },        
    {
        id: "Log-out",
        type: "action",
        path: ""
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
        path: "https://x.com"
    }
]

export const postIcons = [faHeart, faComment, faShare];

export const postTemplate = [
    {
        postid: "1",
        author:"username1",
        type:"image",
        path: "../assets/templates/username1/posts/1.jpg",
        caption: "Me and the boys on the beach. Was sunny asf and I got I bit of sunburn. Welp."
    },
    {
        postid: "2",
        author:"username1",
        type:"image",
        path: "../assets/templates/username1/posts/2.jpg",
        caption: "Today the workout was INSANE! No pain, no pain!"
    },
    {
        postid: "3",
        author:"username2",
        type:"image",
        path: "../assets/templates/username2/posts/1.jpg",
        caption: "On the mall with the girls (cats) as you can see. So happy to be there!"
    },
    {
        postid: "4",
        author:"username2",
        type:"image",
        path: "../assets/templates/username2/posts/2.jpg",
        caption: "Did a lot of stuff today at work!"
    }        
];

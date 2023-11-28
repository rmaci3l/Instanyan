import { faBell, faCat, faComment, faGear, faHeart, faHouse, faPaw, faSearch, faShare } from '@fortawesome/free-solid-svg-icons';


export const navLinks = [
    {
        id: "home",
        title: "Home",
        path: "/",
        icon: faHouse,
    },
    {
        id: "search",
        title: "Search",
        path: "/",
        icon: faSearch,
    },
    {
        id: "post",
        title: "Post",
        path: "/post",
        icon: faPaw,
    },
    {
        id: "profile",
        title: "Profile",
        path: "/profile",
        icon: faCat,
    },
    {
        id: "notifications",
        title: "Notifications",
        path: "/",
        icon: faBell,
    },  
    {
        id: "configuration",
        title: "Configuration",
        path: "/settings",
        icon: faGear,
    }  
];

export const postIcons = [faHeart, faComment, faShare];

export const userTemplate = [
    {
        id: "username1",
        name: "John",
        second_name: "Doe",
        avatar: "../assets/templates/username1/profile.jpg",
        followers: 3214,                
    },
    {
        id: "username2",
        name: "Marie",
        second_name: "Sue",
        avatar: "../assets/templates/username2/profile.jpg",
        followers: 1234,                
    }    
];

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
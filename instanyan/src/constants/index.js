import { faBell, faCat, faComment, faGear, faHeart, faHouse, faPaw, faSearch, faShare } from '@fortawesome/free-solid-svg-icons';


export const navLinks = [
    {
        id: "home",
        title: "Home",
        icon: faHouse,
    },
    {
        id: "search",
        title: "Search",
        icon: faSearch,
    },
    {
        id: "post",
        title: "Post",
        icon: faPaw,
    },
    {
        id: "profile",
        title: "Profile",
        icon: faCat,
    },
    {
        id: "notifications",
        title: "Notifications",
        icon: faBell,
    },  
    {
        id: "configuration",
        title: "Configuration",
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
]
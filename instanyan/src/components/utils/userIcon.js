import { HiOutlineHome, HiUserCircle, HiCheckBadge, HiHeart, HiOutlinePaintBrush, HiOutlineLockClosed, HiOutlineExclamationCircle, HiOutlineQuestionMarkCircle, HiOutlineChartBar, HiOutlineInformationCircle, HiEnvelope, HiOutlinePencil , HiArrowPath, HiArrowUpTray, HiOutlineUserCircle, HiOutlineUser, HiMagnifyingGlass, HiOutlineBell, HiOutlinePlusCircle, HiOutlineCog6Tooth, HiArrowLeftOnRectangle } from 'react-icons/hi2'
import { HiOutlineTranslate } from 'react-icons/hi';
import { FaGithub, FaYoutube, FaTwitter } from 'react-icons/fa6'


const iconMapping = {
    home: HiOutlineHome,
    user: HiOutlineUser,
    search: HiMagnifyingGlass,
    notifications: HiOutlineBell,
    post: HiOutlinePlusCircle,
    settings: HiOutlineCog6Tooth,
    logout: HiArrowLeftOnRectangle,
    profile: HiOutlineUserCircle,
    upload: HiArrowUpTray,
    email: HiEnvelope,
    github: FaGithub,
    youtube: FaYoutube,
    twitter: FaTwitter,
    edit: HiArrowPath,
    editprofile: HiOutlinePencil,
    language: HiOutlineTranslate,    
    activity: HiOutlineChartBar,
    about: HiOutlineInformationCircle,
    help: HiOutlineQuestionMarkCircle,
    report: HiOutlineExclamationCircle,
    theme: HiOutlinePaintBrush,
    privacy: HiOutlineLockClosed,
    follow: HiUserCircle,
    following: HiCheckBadge,
    heart: HiHeart,

};

const UserIcon = ({ iconName }) => {
    const IconComponent = iconMapping[iconName];

    return IconComponent ? <IconComponent /> : null;
}

export default UserIcon;
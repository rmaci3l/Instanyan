import { HiOutlineHome, HiOutlineUserCircle, HiOutlineUser, HiMagnifyingGlass, HiBell, HiOutlinePlusCircle, HiOutlineCog6Tooth, HiArrowLeftOnRectangle } from 'react-icons/hi2'

const iconMapping = {
    home: HiOutlineHome,
    user: HiOutlineUser,
    search: HiMagnifyingGlass,
    notifications: HiBell,
    post: HiOutlinePlusCircle,
    settings: HiOutlineCog6Tooth,
    logout: HiArrowLeftOnRectangle,
    profile: HiOutlineUserCircle,
};

const UserIcon = ({ iconName }) => {
    const IconComponent = iconMapping[iconName];

    return IconComponent ? <IconComponent /> : null;
}

export default UserIcon;
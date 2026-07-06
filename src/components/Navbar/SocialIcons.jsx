import { Icons, ICON_PROPS, ICON_SIZES } from "../../constants/icons";

const SocialIcons = ({ name }) => {
    const icons = {
        facebook: Icons.Facebook,
        instagram: Icons.Instagram,
        youtube: Icons.Youtube,
        linkedin: Icons.Linkedin,
        twitter: Icons.Twitter,
        whatsapp: Icons.MessageCircle,
    };

    const Icon =
        icons[name?.toLowerCase()] ||
        Icons.Globe ||
        Icons.MessageCircle;

    return (
        <Icon
            {...ICON_PROPS}
            size={ICON_SIZES.small}
        />
    );
};

export default SocialIcons;
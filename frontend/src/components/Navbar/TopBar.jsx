import { Icons, ICON_PROPS, ICON_SIZES } from "../../constants/icons";
import SocialIcons from "./SocialIcons";

const TopBar = ({
    header = {},
    socials = [],
}) => {

    return (
        <div className="topbar">
            <div className="container">
                <div className="topbar-inner">

                    <div className="topbar-left">

                        {header?.phone_number && (
                            <a
                                href={`tel:${header.phone_number}`}
                                className="topbar-item"
                            >
                                <Icons.Phone
                                    {...ICON_PROPS}
                                    size={ICON_SIZES.small}
                                />
                                <span>
                                    {header.phone_number}
                                </span>
                            </a>
                        )}

                        {header?.email && (
                            <a
                                href={`mailto:${header.email}`}
                                className="topbar-item"
                            >
                                <Icons.Mail
                                    {...ICON_PROPS}
                                    size={ICON_SIZES.small}
                                />
                                <span>
                                    {header.email}
                                </span>
                            </a>
                        )}

                        {header?.location && (
                            <div className="topbar-item">
                                <Icons.MapPin
                                    {...ICON_PROPS}
                                    size={ICON_SIZES.small}
                                />
                                <span>
                                    {header.location}
                                </span>
                            </div>
                        )}

                    </div>

                    <div className="topbar-right">

                        {socials?.length > 0 && (
                            <>
                                <span className="topbar-follow">
                                    Follow Us
                                </span>

                                <div className="topbar-social">

                                    {socials.map((social) => (
                                        <a
                                            key={social.id}
                                            href={social.platform_link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="topbar-social-link"
                                            title={social.platform_name}
                                        >
                                            <SocialIcons
                                                name={social.platform_name}
                                            />
                                        </a>
                                    ))}

                                </div>
                            </>
                        )}

                    </div>

                </div>
            </div>
        </div>
    );
};

export default TopBar;
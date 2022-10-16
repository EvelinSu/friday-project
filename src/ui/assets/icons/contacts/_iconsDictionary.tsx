import FacebookIcon from "./FacebookIcon";
import GitHubIcon from "./GitHubIcon";
import InstagramIcon from "./InstagramIcon";
import MainLinkIcon from "./MainLinkIcon";
import TwitterIcon from "./TwitterIcon";
import VkIcon from "./VkIcon";
import WebsiteIcon from "./WebsiteIcon";
import YouTubeIcon from "./YouTubeIcon";

type TIconsDictionary = {
    [Key: string]: any
}

export const iconsDictionary: TIconsDictionary = {
    facebook: <FacebookIcon/>,
    github: <GitHubIcon/>,
    instagram: <InstagramIcon/>,
    mainLink: <MainLinkIcon/>,
    twitter: <TwitterIcon/>,
    vk: <VkIcon/>,
    website: <WebsiteIcon/>,
    youtube: <YouTubeIcon/>,
}
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGithub,
  faLinkedin,
  faHtml5,
  faCss3Alt,
  faJsSquare,
} from '@fortawesome/free-brands-svg-icons';

const ICONS = {
  github: faGithub,
  linkedin: faLinkedin,
  html5: faHtml5,
  'css3-alt': faCss3Alt,
  'js-square': faJsSquare,
};

const Icon = ({ name, ...props }) => {
  const icon = ICONS[name];
  if (!icon) return null;
  return <FontAwesomeIcon icon={icon} {...props} />;
};

export default Icon;

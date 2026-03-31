import {
  BsLightningCharge,
  BsCpu,
  BsPlug,
  BsDisplay,
  BsUsbSymbol,
  BsToggles,
  BsGear,
  BsBox,
  BsTools,
  BsTruck,
  BsWifi,
  BsBattery,
  BsMemory,
  BsSpeaker,
} from 'react-icons/bs';
import {
  HiOutlineCollection,
  HiOutlineBadgeCheck,
  HiOutlineLightBulb,
  HiOutlineCurrencyRupee,
  HiOutlineShieldCheck,
  HiOutlineUserGroup,
  HiOutlineTrendingUp,
  HiOutlineHeart,
  HiOutlineStar,
  HiOutlineClock,
  HiOutlineGlobe,
  HiOutlineSupport,
  HiOutlineChip,
  HiOutlineTruck,
} from 'react-icons/hi';

export const iconMap = {
  BsLightningCharge,
  BsCpu,
  BsPlug,
  BsDisplay,
  BsUsbSymbol,
  BsToggles,
  BsGear,
  BsBox,
  BsTools,
  BsTruck,
  BsWifi,
  BsBattery,
  BsMemory,
  BsSpeaker,
  HiOutlineCollection,
  HiOutlineBadgeCheck,
  HiOutlineLightBulb,
  HiOutlineCurrencyRupee,
  HiOutlineShieldCheck,
  HiOutlineUserGroup,
  HiOutlineTrendingUp,
  HiOutlineHeart,
  HiOutlineStar,
  HiOutlineClock,
  HiOutlineGlobe,
  HiOutlineSupport,
  HiOutlineChip,
  HiOutlineTruck,
};

export type IconName = keyof typeof iconMap;

export const iconNames = Object.keys(iconMap) as IconName[];

export const IconRenderer = ({ name, ...props }: { name: string } & Record<string, unknown>) => {
  const Icon = iconMap[name as IconName];
  return Icon ? <Icon {...props} /> : null;
};

import * as LucideIcons from "lucide-react";

const DynamicIcon = ({ name, ...props }) => {

  const Icon = LucideIcons[name] || LucideIcons.CircleHelp;
  return <Icon aria-hidden="true" {...props} />;
};

export default DynamicIcon;

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserAvatarProps {
  userName: string;
  src?: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ userName, src }) => {
  return (
    <Avatar className="w-10 h-10">
      {src && <AvatarImage src={src} />}
      <AvatarFallback className="bg-[#052350] text-white font-semibold">
        {userName.slice(0, 2).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;

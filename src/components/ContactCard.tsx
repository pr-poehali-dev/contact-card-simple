import React from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Phone, Mail, MapPin } from "lucide-react";

export interface ContactCardProps {
  name: string;
  position?: string;
  email?: string;
  phone?: string;
  address?: string;
  avatarUrl?: string;
  className?: string;
}

const ContactCard: React.FC<ContactCardProps> = ({
  name,
  position,
  email,
  phone,
  address,
  avatarUrl,
  className,
}) => {
  return (
    <Card className={`hover:shadow-lg hover:shadow-indigo-500/10 transition-shadow duration-300 bg-gray-800/60 border-gray-700 ${className}`}>
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-14 w-14 border-2 border-indigo-500/30">
          {avatarUrl ? (
            <AvatarImage src={avatarUrl} alt={name} />
          ) : (
            <AvatarFallback className="text-lg bg-indigo-900/30 text-indigo-300">
              {name.split(" ").map(part => part[0]).join("").slice(0, 2).toUpperCase()}
            </AvatarFallback>
          )}
        </Avatar>
        <div>
          <CardTitle className="text-gray-100">{name}</CardTitle>
          {position && <CardDescription className="text-gray-400">{position}</CardDescription>}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {phone && (
          <div className="flex items-center gap-2 text-gray-300">
            <Phone size={18} className="text-indigo-400" />
            <span>{phone}</span>
          </div>
        )}
        {email && (
          <div className="flex items-center gap-2 text-gray-300">
            <Mail size={18} className="text-indigo-400" />
            <span>{email}</span>
          </div>
        )}
        {address && (
          <div className="flex items-center gap-2 text-gray-300">
            <MapPin size={18} className="text-indigo-400" />
            <span>{address}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ContactCard;

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
    <Card className={`hover:shadow-lg hover:shadow-red-500/20 transition-shadow duration-300 bg-red-900/60 border-red-700/70 ${className}`}>
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-14 w-14 border-2 border-red-500/30">
          {avatarUrl ? (
            <AvatarImage src={avatarUrl} alt={name} />
          ) : (
            <AvatarFallback className="text-lg bg-red-950 text-red-200">
              {name.split(" ").map(part => part[0]).join("").slice(0, 2).toUpperCase()}
            </AvatarFallback>
          )}
        </Avatar>
        <div>
          <CardTitle className="text-red-50">{name}</CardTitle>
          {position && <CardDescription className="text-red-200/70">{position}</CardDescription>}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {phone && (
          <div className="flex items-center gap-2 text-red-100">
            <Phone size={18} className="text-red-300" />
            <span>{phone}</span>
          </div>
        )}
        {email && (
          <div className="flex items-center gap-2 text-red-100">
            <Mail size={18} className="text-red-300" />
            <span>{email}</span>
          </div>
        )}
        {address && (
          <div className="flex items-center gap-2 text-red-100">
            <MapPin size={18} className="text-red-300" />
            <span>{address}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ContactCard;

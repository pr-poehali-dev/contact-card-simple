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
    <Card className={className}>
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-14 w-14">
          {avatarUrl ? (
            <AvatarImage src={avatarUrl} alt={name} />
          ) : (
            <AvatarFallback className="text-lg">
              {name.split(" ").map(part => part[0]).join("").slice(0, 2).toUpperCase()}
            </AvatarFallback>
          )}
        </Avatar>
        <div>
          <CardTitle>{name}</CardTitle>
          {position && <CardDescription>{position}</CardDescription>}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {phone && (
          <div className="flex items-center gap-2">
            <Phone size={18} className="text-muted-foreground" />
            <span>{phone}</span>
          </div>
        )}
        {email && (
          <div className="flex items-center gap-2">
            <Mail size={18} className="text-muted-foreground" />
            <span>{email}</span>
          </div>
        )}
        {address && (
          <div className="flex items-center gap-2">
            <MapPin size={18} className="text-muted-foreground" />
            <span>{address}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ContactCard;


'use client';

import React, { useState, useRef } from 'react';
import {
  User,
  ChevronRight,
  Package,
  MapPin,
  CreditCard,
  Heart,
  Tag,
  Gift,
  Phone,
  MessageCircle,
  HelpCircle,
  Bell,
  Sun,
  Moon,
  Globe,
  Info,
  LogOut,
  Edit,
  Wallet,
  MessageSquare,
  FileQuestion,
  Save,
  X,
  Camera
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import Link from 'next/link';
import { BottomNav } from '@/components/freshoz/bottom-nav';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';


export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [profile, setProfile] = useState({
      name: "Pravin Mishra",
      phone: "9097882555",
      email: "pravin@example.com",
      avatar: "" // Initially no avatar
  });

  const [editedProfile, setEditedProfile] = useState(profile);

  const handleEdit = () => {
    setEditedProfile(profile);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
    toast({
        title: "Profile Updated",
        description: "Your profile information has been saved successfully.",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setEditedProfile(prev => ({ ...prev, [name]: value }));
  }

  const handleAvatarClick = () => {
      fileInputRef.current?.click();
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
          const file = e.target.files[0];
          const reader = new FileReader();
          reader.onloadend = () => {
              setEditedProfile(prev => ({ ...prev, avatar: reader.result as string }));
              // In a real app, you would upload this file to Firebase Storage
              // and save the URL. For now, we use the base64 data URI.
          };
          reader.readAsDataURL(file);
      }
  }
  
  const getInitials = (name: string) => {
    const parts = name.split(' ');
    if (parts.length > 1 && parts[0] && parts[parts.length - 1]) {
        return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return name ? name.charAt(0).toUpperCase() : '';
  }

  const menuItems = [
      {
          title: "My Orders",
          icon: Package,
          items: [
              { label: "View All Orders", href: "/orders" },
          ]
      },
       {
          title: "My Wallet",
          icon: Wallet,
          items: [
              { label: "Current Balance", value: "₹500.00" },
              { label: "View Wallet", href: "/wallet" }
          ]
      },
      {
          title: "My Addresses",
          icon: MapPin,
          items: [
              { label: "Home: L-146, Ladali Bhawan...", action: "Edit" },
              { label: "Add New Address", action: "Add" },
          ]
      },
      {
          title: "Payments & Wallet",
          icon: CreditCard,
          items: [
              { label: "Wallet Balance", value: "₹0" },
              { label: "Saved UPI", value: "9097882555@upi" },
          ]
      },
      {
          title: "Coupons & Rewards",
          icon: Tag,
          items: [
              { label: "View Active Coupons" },
              { label: "Refer & Earn" },
          ]
      },
      {
          title: "Help & Support",
          icon: HelpCircle,
          items: [
              { label: "Contact Us", href: "tel:9097882555", icon: Phone },
              { label: "Chat on WhatsApp", href: "https://wa.me/9097882555", icon: MessageSquare },
              { label: "FAQs", href: "/faq", icon: FileQuestion },
              { label: "Report an Issue" },
          ]
      },
       {
          title: "App Settings",
          icon: Bell,
          items: [
              { label: "Notifications", component: <Switch defaultChecked /> },
              { label: "Dark Mode", component: <Switch /> },
              { label: "Language", value: "English" },
              { label: "Delivery PIN", value: "813213" },
          ]
      }
  ];

  const legalItems = [
    { label: "About Us", href: "/about" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
  ];

  const currentAvatar = isEditing ? editedProfile.avatar : profile.avatar;
  const currentName = isEditing ? editedProfile.name : profile.name;

  return (
    <div className="flex min-h-screen flex-col bg-muted/20">
      <header className="bg-background">
        <div className="container mx-auto px-4 py-6">
            <div className="flex items-center gap-4">
                <div className="relative">
                    <Avatar className="h-20 w-20 border-2 border-primary">
                        <AvatarImage src={currentAvatar} alt={currentName} data-ai-hint="user avatar" />
                        <AvatarFallback className="bg-green-600 text-white font-bold text-2xl">
                           {getInitials(currentName)}
                        </AvatarFallback>
                    </Avatar>
                     {isEditing && (
                        <>
                            <button 
                                onClick={handleAvatarClick}
                                className="absolute bottom-0 right-0 h-7 w-7 bg-primary text-primary-foreground rounded-full flex items-center justify-center border-2 border-background"
                                aria-label="Change profile picture"
                            >
                                <Camera className="h-4 w-4" />
                            </button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                className="hidden"
                                accept="image/*"
                            />
                        </>
                    )}
                </div>
                <div className="flex-1">
                    {isEditing ? (
                        <div className="space-y-2">
                             <Input name="name" value={editedProfile.name} onChange={handleChange} className="text-2xl font-bold h-10 p-2" />
                             <Input name="phone" value={editedProfile.phone} onChange={handleChange} className="text-muted-foreground" />
                        </div>
                    ) : (
                        <div>
                            <h1 className="text-2xl font-bold">{profile.name}</h1>
                            <p className="text-muted-foreground">{profile.phone}</p>
                        </div>
                    )}
                </div>
                 {isEditing ? (
                     <div className="flex gap-2">
                        <Button variant="default" size="icon" onClick={handleSave} aria-label="Save changes">
                            <Save className="h-5 w-5" />
                        </Button>
                         <Button variant="ghost" size="icon" onClick={handleCancel} aria-label="Cancel changes">
                            <X className="h-5 w-5" />
                        </Button>
                     </div>
                 ) : (
                    <Button variant="outline" size="icon" className="ml-auto" onClick={handleEdit} aria-label="Edit profile">
                        <Edit className="h-5 w-5" />
                    </Button>
                 )}
            </div>
        </div>
      </header>

      <main className="flex-1 pb-24">
        <div className="container mx-auto px-2 py-4 sm:px-4">
          <div className="space-y-4">
            
            {menuItems.map(section => (
                <Card key={section.title}>
                    <CardHeader>
                         <CardTitle className="flex items-center gap-2 text-lg">
                            <section.icon className="h-5 w-5 text-primary" />
                            {section.title}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 p-4 pt-0">
                        {section.items.map((item, index) => (
                             <React.Fragment key={index}>
                                <div className="flex items-center justify-between py-2">
                                  <div className="flex items-center gap-2">
                                    {item.icon && <item.icon className="h-5 w-5 text-muted-foreground" />}
                                    <span className="font-medium">{item.label}</span>
                                  </div>
                                    {item.href ? (
                                        <Link href={item.href} target={item.href.startsWith('http') || item.href.startsWith('tel:') ? '_blank' : '_self'}><ChevronRight className="h-5 w-5 text-muted-foreground" /></Link>
                                    ) : item.value ? (
                                        <span className="text-muted-foreground">{item.value}</span>
                                    ) : item.action ? (
                                        <Button variant="link" className="p-0 h-auto">{item.action}</Button>
                                    ) : item.component ? (
                                        item.component
                                    ) : (
                                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                                    )}
                                </div>
                                {index < section.items.length - 1 && <Separator />}
                             </React.Fragment>
                        ))}
                    </CardContent>
                </Card>
            ))}

             <Card>
                <CardHeader>
                     <CardTitle className="flex items-center gap-2 text-lg">
                        <Info className="h-5 w-5 text-primary" />
                        Legal &amp; Info
                    </CardTitle>
                </CardHeader>
                 <CardContent className="space-y-2 p-4 pt-0">
                    {legalItems.map((item, index) => (
                         <React.Fragment key={index}>
                            <Link href={item.href} className="block">
                                <div className="flex items-center justify-between py-2">
                                    <span className="font-medium">{item.label}</span>
                                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                                </div>
                            </Link>
                            {index < legalItems.length - 1 && <Separator />}
                        </React.Fragment>
                    ))}
                 </CardContent>
            </Card>

            <div className="p-4">
                 <Button variant="destructive" className="w-full h-12 text-lg">
                    <LogOut className="mr-2 h-5 w-5" />
                    Log Out
                </Button>
            </div>
          </div>
        </div>
      </main>
      
      <BottomNav />
    </div>
  );
}

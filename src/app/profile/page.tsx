
'use client';

import * as React from 'react';
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
  MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import Link from 'next/link';
import { BottomNav } from '@/components/freshoz/bottom-nav';

export default function ProfilePage() {
  const userName = "Pravin Mishra";
  const userPhone = "9097882555";
  
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
              { label: "FAQs" },
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

  return (
    <div className="flex min-h-screen flex-col bg-muted/20">
      <header className="bg-background">
        <div className="container mx-auto px-4 py-6">
            <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20 border-2 border-primary">
                    <AvatarImage src="https://placehold.co/100x100.png" alt={userName} data-ai-hint="user avatar" />
                    <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                    <h1 className="text-2xl font-bold">{userName}</h1>
                    <p className="text-muted-foreground">{userPhone}</p>
                </div>
                 <Button variant="outline" size="icon" className="ml-auto">
                    <Edit className="h-5 w-5" />
                </Button>
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
                                        <Link href={item.href} target={item.href.startsWith('http') ? '_blank' : '_self'}><ChevronRight className="h-5 w-5 text-muted-foreground" /></Link>
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
                        Legal & Info
                    </CardTitle>
                </CardHeader>
                 <CardContent className="space-y-2 p-4 pt-0">
                    <div className="flex items-center justify-between py-2"><span className="font-medium">Terms & Conditions</span><ChevronRight className="h-5 w-5 text-muted-foreground" /></div>
                    <Separator />
                    <div className="flex items-center justify-between py-2"><span className="font-medium">Privacy Policy</span><ChevronRight className="h-5 w-5 text-muted-foreground" /></div>
                    <Separator />
                    <div className="flex items-center justify-between py-2"><span className="font-medium">About Freshoz</span><ChevronRight className="h-5 w-5 text-muted-foreground" /></div>
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

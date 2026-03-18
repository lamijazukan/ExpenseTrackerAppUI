"use client";

import { useEffect, useState } from "react";
import { Globe, DollarSign, User, Save } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { getUserProfile } from "../api/userProfileService";

export default function SettingsPage() {
  const [language, setLanguage] = useState("");
  const [currency, setCurrency] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

 useEffect(() => {
  getUserProfile().then((data) => {
    setName(data.username);
    setEmail(data.email);
    setLanguage(data.language);
    setCurrency(data.currency);
  });
}, []);


  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage your profile and preferences.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-border bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-card-foreground">
              <User className="h-5 w-5 text-olive" />
              Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="name" className="text-card-foreground text-sm">
                Full Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-border bg-muted text-card-foreground"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="settingsEmail"
                className="text-card-foreground text-sm"
              >
                Email
              </Label>
              <Input
                id="settingsEmail"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-border bg-muted text-card-foreground"
              />
            </div>
            <Button className="mt-2 bg-olive text-olive-foreground hover:bg-olive/90 w-fit font-semibold">
              <Save className="mr-2 h-4 w-4" />
              Save Profile
            </Button>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-card-foreground">
              <Globe className="h-5 w-5 text-olive" />
              Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label className="text-card-foreground text-sm">Language</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="border-border bg-muted text-card-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="border-border bg-card text-card-foreground">
                  <SelectItem value="En">En</SelectItem>
                  <SelectItem value="Bs">Bs</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-card-foreground text-sm">Currency</Label>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger className="border-border bg-muted text-card-foreground">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-olive" />
                    <SelectValue />
                  </div>
                </SelectTrigger>
                <SelectContent className="border-border bg-card text-card-foreground">
                  <SelectItem value="USD">USD ($)</SelectItem>
                  <SelectItem value="BAM">BAM (KM)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="mt-2 bg-olive text-olive-foreground hover:bg-olive/90 w-fit font-semibold">
              <Save className="mr-2 h-4 w-4" />
              Save Preferences
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

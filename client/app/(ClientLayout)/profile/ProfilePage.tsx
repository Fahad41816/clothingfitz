"use client"

import { useState } from "react"  
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Camera, Save } from "lucide-react"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="min-h-screen flex flex-col"> 

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-balance">My Profile</h1>
            <p className="text-muted-foreground mt-1">Manage your account information and preferences</p>
          </div>

          <Card className="mb-6">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src="/diverse-user-avatars.png" alt="Profile" />
                    <AvatarFallback>NF</AvatarFallback>
                  </Avatar>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full shadow-md"
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex-1">
                  <CardTitle>Nahidul Islam Fahad</CardTitle>
                  <CardDescription>nahidulislamfahad6@gmail.com</CardDescription>
                </div>
                <Button onClick={() => setIsEditing(!isEditing)}>{isEditing ? "Cancel" : "Edit Profile"}</Button>
              </div>
            </CardHeader>
          </Card>

          <Tabs defaultValue="personal" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="shipping">Shipping Address</TabsTrigger>
              <TabsTrigger value="billing">Billing Address</TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal details here</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="Nahidul" defaultValue="Nahidul" disabled={!isEditing} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Fahad" defaultValue="Islam Fahad" disabled={!isEditing} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue="nahidulislamfahad6@gmail.com"
                      disabled
                      className="bg-muted"
                    />
                    <p className="text-xs text-muted-foreground">Email address cannot be changed</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      placeholder="+1 (555) 123-4567"
                      defaultValue="+1 954-483-8862"
                      disabled={!isEditing}
                    />
                  </div>

                  {isEditing && (
                    <div className="flex gap-2 pt-4">
                      <Button className="w-full">
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="shipping" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Address</CardTitle>
                  <CardDescription>Where should we ship your orders?</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="shippingAddress">Street Address</Label>
                    <Input
                      id="shippingAddress"
                      placeholder="123 Main Street"
                      defaultValue="123 Main Street"
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="shippingAddress2">Apartment, suite, etc. (optional)</Label>
                    <Input id="shippingAddress2" placeholder="Apt 4B" disabled={!isEditing} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="shippingCity">City</Label>
                      <Input
                        id="shippingCity"
                        placeholder="New York"
                        defaultValue="Fort Lauderdale"
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="shippingState">State</Label>
                      <Input id="shippingState" placeholder="FL" defaultValue="Florida" disabled={!isEditing} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="shippingZip">ZIP Code</Label>
                      <Input id="shippingZip" placeholder="10001" defaultValue="33301" disabled={!isEditing} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="shippingCountry">Country</Label>
                    <Input
                      id="shippingCountry"
                      placeholder="United States"
                      defaultValue="United States"
                      disabled={!isEditing}
                    />
                  </div>

                  {isEditing && (
                    <div className="flex gap-2 pt-4">
                      <Button className="w-full">
                        <Save className="w-4 h-4 mr-2" />
                        Save Address
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="billing" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Billing Address</CardTitle>
                  <CardDescription>Address for billing and invoices</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="billingAddress">Street Address</Label>
                    <Input
                      id="billingAddress"
                      placeholder="123 Main Street"
                      defaultValue="123 Main Street"
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="billingAddress2">Apartment, suite, etc. (optional)</Label>
                    <Input id="billingAddress2" placeholder="Apt 4B" disabled={!isEditing} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="billingCity">City</Label>
                      <Input
                        id="billingCity"
                        placeholder="New York"
                        defaultValue="Fort Lauderdale"
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="billingState">State</Label>
                      <Input id="billingState" placeholder="FL" defaultValue="Florida" disabled={!isEditing} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="billingZip">ZIP Code</Label>
                      <Input id="billingZip" placeholder="10001" defaultValue="33301" disabled={!isEditing} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="billingCountry">Country</Label>
                    <Input
                      id="billingCountry"
                      placeholder="United States"
                      defaultValue="United States"
                      disabled={!isEditing}
                    />
                  </div>

                  {isEditing && (
                    <div className="flex gap-2 pt-4">
                      <Button className="w-full">
                        <Save className="w-4 h-4 mr-2" />
                        Save Address
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
 
    </div>
  )
}

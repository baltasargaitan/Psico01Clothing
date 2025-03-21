"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { CreditCard, Landmark, Truck, Package } from "lucide-react"

export default function CheckoutForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // In a real implementation, you would submit the form data to your API
      // This could be a server action or API endpoint

      // Simulate a delay for the API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Order placed successfully!",
        description: "You will receive a confirmation email shortly.",
      })

      // Redirect to success page
      router.push("/checkout/success")
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not process your order. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-8">
        {/* Contact Information */}
        <div className="bg-zinc-900 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Contact Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                placeholder="Enter your first name"
                required
                className="bg-zinc-800 border-zinc-700"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                placeholder="Enter your last name"
                required
                className="bg-zinc-800 border-zinc-700"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                required
                className="bg-zinc-800 border-zinc-700"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                required
                className="bg-zinc-800 border-zinc-700"
              />
            </div>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="bg-zinc-900 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Shipping Address</h2>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                placeholder="Enter your street address"
                required
                className="bg-zinc-800 border-zinc-700"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" placeholder="Enter your city" required className="bg-zinc-800 border-zinc-700" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="province">Province</Label>
                <Input
                  id="province"
                  placeholder="Enter your province"
                  required
                  className="bg-zinc-800 border-zinc-700"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="postalCode">Postal Code</Label>
                <Input
                  id="postalCode"
                  placeholder="Enter your postal code"
                  required
                  className="bg-zinc-800 border-zinc-700"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  placeholder="Argentina"
                  defaultValue="Argentina"
                  required
                  className="bg-zinc-800 border-zinc-700"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Shipping Method */}
        <div className="bg-zinc-900 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Shipping Method</h2>

          <RadioGroup defaultValue="standard" className="space-y-3">
            <div className="flex items-center justify-between border border-zinc-800 rounded-md p-4">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="standard" id="standard" />
                <Label htmlFor="standard" className="flex items-center">
                  <Truck size={18} className="mr-2 text-[#39FF14]" />
                  Standard Shipping (3-5 business days)
                </Label>
              </div>
              <span className="font-mono">$4.99</span>
            </div>

            <div className="flex items-center justify-between border border-zinc-800 rounded-md p-4">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="express" id="express" />
                <Label htmlFor="express" className="flex items-center">
                  <Package size={18} className="mr-2 text-[#39FF14]" />
                  Express Shipping (1-2 business days)
                </Label>
              </div>
              <span className="font-mono">$9.99</span>
            </div>
          </RadioGroup>
        </div>

        {/* Payment Method */}
        <div className="bg-zinc-900 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Payment Method</h2>

          <Tabs defaultValue="card">
            <TabsList className="w-full bg-zinc-800 p-0 h-12">
              <TabsTrigger value="card" className="flex-1 h-full">
                <CreditCard size={16} className="mr-2" />
                Credit Card
              </TabsTrigger>
              <TabsTrigger value="bank" className="flex-1 h-full">
                <Landmark size={16} className="mr-2" />
                Bank Transfer
              </TabsTrigger>
            </TabsList>

            <TabsContent value="card" className="pt-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  placeholder="0000 0000 0000 0000"
                  required
                  className="bg-zinc-800 border-zinc-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input id="expiryDate" placeholder="MM/YY" required className="bg-zinc-800 border-zinc-700" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input id="cvv" placeholder="123" required className="bg-zinc-800 border-zinc-700" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="nameOnCard">Name on Card</Label>
                <Input
                  id="nameOnCard"
                  placeholder="Enter the name on your card"
                  required
                  className="bg-zinc-800 border-zinc-700"
                />
              </div>
            </TabsContent>

            <TabsContent value="bank" className="pt-4 space-y-4">
              <div className="p-4 border border-zinc-800 rounded-md">
                <p className="font-bold mb-2">Bank Transfer Instructions</p>
                <p className="text-gray-400 text-sm mb-4">
                  Please transfer the total amount to the following bank account:
                </p>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Bank:</span>
                    <span>Banco Nación Argentina</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Account Name:</span>
                    <span>PSICO01CLOTHING S.A.</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Account Number:</span>
                    <span>0000-1111-2222-3333-4444</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">CBU:</span>
                    <span>0110000000000000000000</span>
                  </div>
                </div>

                <p className="text-gray-400 text-sm mt-4">Your order will be processed once we confirm your payment.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full bg-[#39FF14] hover:bg-[#39FF14]/90 text-black h-14 text-lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Processing..." : "Place Order"}
        </Button>
      </div>
    </form>
  )
}


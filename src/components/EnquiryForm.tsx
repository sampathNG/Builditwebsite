// components/EnquiryForm.tsx
"use client";
import React, { useState, ChangeEvent } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent } from "@radix-ui/react-dialog";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Ruler,
  PaintBucket,
  Building2,
  Home,
} from "lucide-react";
import IconInput from "./IconInput";
import { Toaster } from "./ui/toaster";
import { FaRupeeSign } from "react-icons/fa";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";

interface FormData {
  type: "interior" | "construction" | "development";
  name: string;
  email: string;
  phone: string;
  area: { value: number; unit: string };
  location: string;
  budget: string;
  interiorTypes: string[];
  constructionType: string;
  developmentType: string;
  advance: string;
  ration: string;
}

const interiorTypes = [
  { id: "bedroom", label: "Bedroom" },
  { id: "washroom", label: "Washroom" },
  { id: "kitchen", label: "Kitchen" },
  { id: "diningRoom", label: "Dining Room" },
  { id: "wallpaper", label: "Wallpaper" },
  { id: "livingRoom", label: "Living Room" },
];

const constructionTypes = [
  { id: "residential", label: "Residential" },
  { id: "commercial", label: "Commercial" },
];

const developmentTypes = [
  { id: "villa", label: "Villa" },
  { id: "plotting", label: "Plotting" },
  { id: "highRise", label: "High Rise" },
];

const budgetOptions = [
  { id: "classic", label: "Classic" },
  { id: "premium", label: "Premium" },
  { id: "luxury", label: "Luxury" },
];

const areaUnits = [
  { id: "sqft", label: "Square Feet" },
  { id: "acre", label: "Acre" },
];

const EnquiryForm: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "interior" | "construction" | "development"
  >("interior");

  const [formData, setFormData] = useState<FormData>({
    type: "interior",
    name: "",
    email: "",
    phone: "",
    area: { value: 0, unit: "sqft" },
    location: "",
    budget: "",
    interiorTypes: [],
    constructionType: "",
    developmentType: "",
    advance: "",
    ration: "",
  });
  const [otp, setOtp] = useState("");
  const [isOtpWindowOpen, setIsOtpWindowOpen] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [otpArray, setOtpArray] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  function generateRandomNumber(length: number) {
    const characters = "0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    return result;
  }
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    if (name === "area-unit") {
      setFormData((prev) => ({ ...prev, area: { ...prev.area, unit: value } }));
    } else if (name === "area-value") {
      setFormData((prev) => ({
        ...prev,
        area: { ...prev.area, value: parseFloat(value) },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCheckboxChange = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      interiorTypes: prev.interiorTypes.includes(id)
        ? prev.interiorTypes.filter((type) => type !== id)
        : [...prev.interiorTypes, id],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = formData.email;
    handleSendOtp(email);
    setIsOtpWindowOpen(true);
    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        toast({
          title: "Enquiry Submitted",
          description: data.message,
        });
        // Reset form
        setFormData({
          type: "interior",
          name: "",
          email: "",
          phone: "",
          area: { value: 0, unit: "sqft" },
          location: "",
          budget: "",
          interiorTypes: [],
          constructionType: "",
          developmentType: "",
          advance: "",
          ration: "",
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit enquiry");
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to submit enquiry. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSendOtp = async (email: string) => {
    const otpp = generateRandomNumber(6);
    setOtpArray((prevArray) => [...prevArray, otpp]);
    try {
      const response = await axios.post("/api/send-email", {
        email,
        otpp,
      });
      console.log(response.data);
      setIsOtpSent(true);
      setIsOtpWindowOpen(true); // Open OTP window
    } catch (error) {
      console.log(error);
    }
  };
  const handleVerifyOtp = async () => {
    const lastOtp = otpArray[otpArray.length - 1];
    // Logic to verify OTP
    if (otp === lastOtp) {
      console.log("otp verified");
      setOtp("");
      // Example OTP
      setIsOtpVerified(true);
      setIsOtpWindowOpen(false);
    } else {
      console.log("otp not verified");
      setOtp("");
      //   setIsOtpVerified(true);
      setIsOtpWindowOpen(false);
      toast({
        title: "Error",
        description: "Invalid OTP. Please try again.",
        variant: "destructive",
      });
      alert("Incorrect Otp . Please try again.");
    }
  };
  const renderCommonFields = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-transparent">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <IconInput
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            icon={<User className="h-4 w-4" />}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <IconInput
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            icon={<Mail className="h-4 w-4" />}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-transparent">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <IconInput
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
            icon={<Phone className="h-4 w-4" />}
          />
        </div>
        <div className="space-y-2">
          <Label>Area</Label>
          <div className="flex items-center space-x-2">
            <IconInput
              id="area-value"
              name="area-value"
              type="number"
              value={formData.area.value.toString()}
              onChange={(e) => handleSelectChange("area-value", e.target.value)}
              required
              icon={<Ruler className="h-4 w-4" />}
            />
            <Select
              value={formData.area.unit}
              onValueChange={(value) => handleSelectChange("area-unit", value)}
            >
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                {areaUnits.map((unit) => (
                  <SelectItem key={unit.id} value={unit.id}>
                    {unit.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <div className="space-y-2 bg-transparent">
        <Label htmlFor="location">Location</Label>
        <IconInput
          id="location"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
          required
          icon={<MapPin className="h-4 w-4" />}
        />
      </div>
      <div className="space-y-2 bg-transparent">
        <Label htmlFor="budget">Budget</Label>
        <Select
          value={formData.budget}
          onValueChange={(value) => handleSelectChange("budget", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select budget" />
          </SelectTrigger>
          <SelectContent>
            {budgetOptions.map((option) => (
              <SelectItem key={option.id} value={option.id}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );

  return (
    <div className="h-[80vh] w-full max-w-2xl mx-auto sm:dark p-4 lg:p-8 bg-transparent">
      {!isOtpWindowOpen && (
        <Card className="h-full shadow-lg bg-transparent">
          <CardContent className="p-8 h-full overflow-y-auto">
            <Tabs
              value={activeTab}
              onValueChange={(value) =>
                setActiveTab(
                  value as "interior" | "construction" | "development"
                )
              }
              className="h-full flex flex-col"
            >
              <TabsList className="justify-center mb-8">
                <TabsTrigger
                  value="interior"
                  className="text-xs lg:text-lg font-medium py-2 lg:px-4 lg:py-2"
                >
                  Interior
                </TabsTrigger>
                <TabsTrigger
                  value="construction"
                  className="text-xs lg:text-lg font-medium p-2 lg:px-4 lg:py-2"
                >
                  Construction
                </TabsTrigger>
                <TabsTrigger
                  value="development"
                  className="text-xs lg:text-lg font-medium p-2 lg:px-4 lg:py-2"
                >
                  Development
                </TabsTrigger>
              </TabsList>
              <form onSubmit={handleSubmit} className="space-y-6 flex-grow">
                <TabsContent value="interior">
                  {renderCommonFields()}
                  <div className="space-y-4">
                    <div>
                      <Label>Type of Interior Work</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                        {interiorTypes.map((type) => (
                          <div
                            key={type.id}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={type.id}
                              checked={formData.interiorTypes.includes(type.id)}
                              onCheckedChange={() =>
                                handleCheckboxChange(type.id)
                              }
                            />
                            <Label htmlFor={type.id}>{type.label}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="construction">
                  {renderCommonFields()}
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="constructionType">
                        Type of Construction
                      </Label>
                      <Select
                        value={formData.constructionType}
                        onValueChange={(value) =>
                          handleSelectChange("constructionType", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select construction type" />
                        </SelectTrigger>
                        <SelectContent>
                          {constructionTypes.map((type) => (
                            <SelectItem key={type.id} value={type.id}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="development">
                  {renderCommonFields()}
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="developmentType">
                        Type of Development
                      </Label>
                      <Select
                        value={formData.developmentType}
                        onValueChange={(value) =>
                          handleSelectChange("developmentType", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select development type" />
                        </SelectTrigger>
                        <SelectContent>
                          {developmentTypes.map((type) => (
                            <SelectItem key={type.id} value={type.id}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="advance">Advance Amount</Label>
                    <IconInput
                      id="advance"
                      name="advance"
                      value={formData.advance}
                      onChange={handleInputChange}
                      icon={<FaRupeeSign className="h-4 w-4" />}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="ration">Ration</Label>
                    <IconInput
                      id="ration"
                      name="ration"
                      value={formData.ration}
                      onChange={handleInputChange}
                      required
                      icon={<Home className="h-4 w-4" />}
                      className="mt-2"
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full">
                  Submit Enquiry
                </Button>
              </form>
            </Tabs>
          </CardContent>
        </Card>
      )}

      {isOtpWindowOpen && (
        <Dialog open={isOtpWindowOpen} onOpenChange={setIsOtpWindowOpen}>
          <DialogContent className="bg-white p-8 rounded-lg shadow-lg w-96 mx-auto">
            <h2 className="text-lg font-bold mb-4 text-center">
              Verify Your Email
            </h2>
            <Input
              className="text-black bg-gray-100 p-2 rounded-lg w-full mb-4"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <Button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full"
              onClick={() => {
                // Handle OTP verification logic here
                setIsOtpWindowOpen(false);
              }}
            >
              Verify OTP
            </Button>
          </DialogContent>
        </Dialog>
      )}
      <Toaster />
    </div>
  );
};

export default EnquiryForm;

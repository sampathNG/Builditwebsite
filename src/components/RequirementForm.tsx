// components/RequirementForm.tsx

"use client";
import React, { useState, ChangeEvent } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { User, Phone, Mail, MapPin, Ruler } from "lucide-react";
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

const transactionTypes = [
  { id: "buy", label: "Buy" },
  { id: "sale", label: "Sale" },
];

const propertyTypes = [
  { id: "flat", label: "Flat" },
  { id: "independentBuilding", label: "Independent Building" },
  { id: "land", label: "Land" },
];

const durationOptions = [
  { id: "immediate", label: "Immediate" },
  { id: "3months", label: "Within 3 months" },
  { id: "6months", label: "Within 6 months" },
];

const areaUnits = [
  { id: "sqft", label: "Square Feet" },
  { id: "acre", label: "Acre" },
  { id: "gunta", label: "Gunta" },
];

interface FormData {
  transactionType: string;
  propertyType: string;
  area: { value: string; unit: string };
  location: string;
  budget: string;
  duration: string;
  name: string;
  email: string;
  phone: string;
}

const RequirementForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    transactionType: "",
    propertyType: "",
    area: { value: "", unit: "" },
    location: "",
    budget: "",
    duration: "",
    name: "",
    email: "",
    phone: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "area") {
      setFormData((prev) => ({
        ...prev,
        area: { ...prev.area, value: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    if (name === "area-unit") {
      setFormData((prev) => ({ ...prev, area: { ...prev.area, unit: value } }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/requirement", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        toast({
          title: "Requirement Submitted",
          description: data.message,
        });
        // Reset form
        setFormData({
          transactionType: "",
          propertyType: "",
          area: { value: "", unit: "" },
          location: "",
          budget: "",
          duration: "",
          name: "",
          email: "",
          phone: "",
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit requirement");
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to submit requirement. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full sm:max-w-2xl mx-auto sm:dark">
      <Card className="h-full">
        <CardHeader className="text-center text-2xl font-bold py-4">
          Post Your Requirement
        </CardHeader>
        <CardContent className="p-6 h-full overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Transaction Type</Label>
                <div className="grid grid-cols-2 gap-2">
                  {transactionTypes.map((type) => (
                    <div key={type.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={type.id}
                        checked={formData.transactionType === type.id}
                        onCheckedChange={() =>
                          handleSelectChange("transactionType", type.id)
                        }
                      />
                      <label htmlFor={type.id}>{type.label}</label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Property Type</Label>
                <div className="grid grid-cols-2 gap-2">
                  {propertyTypes.map((type) => (
                    <div key={type.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={type.id}
                        checked={formData.propertyType === type.id}
                        onCheckedChange={() =>
                          handleSelectChange("propertyType", type.id)
                        }
                      />
                      <label htmlFor={type.id}>{type.label}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Area</Label>
                <div className="flex items-center space-x-2">
                  <IconInput
                    id="area"
                    name="area"
                    type="text"
                    value={formData.area.value}
                    onChange={handleInputChange}
                    required
                    icon={<Ruler className="h-4 w-4" />}
                  />
                  <Select
                    value={formData.area.unit}
                    onValueChange={(value) =>
                      handleSelectChange("area-unit", value)
                    }
                  >
                    <SelectTrigger>
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
              <div className="space-y-2">
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
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="budget">Budget</Label>
                <IconInput
                  id="budget"
                  name="budget"
                  type="text"
                  value={formData.budget}
                  onChange={handleInputChange}
                  required
                  icon={<FaRupeeSign className="h-4 w-4" />}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Preferred Duration</Label>
                <Select
                  value={formData.duration}
                  onValueChange={(value) =>
                    handleSelectChange("duration", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select preferred duration" />
                  </SelectTrigger>
                  <SelectContent>
                    {durationOptions.map((option) => (
                      <SelectItem key={option.id} value={option.id}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            <Button type="submit" className="w-full">
              Submit Requirement
            </Button>
          </form>
        </CardContent>
      </Card>
      <Toaster />
    </div>
  );
};

export default RequirementForm;

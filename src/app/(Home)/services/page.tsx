/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Building2,
  Home,
  ArrowRight,
  Check,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import MaterialOptions from "@/components/Pacakage";
import Link from "next/link";

const services = [
  {
    type: "residential",
    title: "Residential Construction",
    description: "Building your dream home from the ground up.",
    image: "/residential.avif",
    features: [
      "Custom home design",
      "Home renovations",
      "Kitchen remodeling",
      "Bathroom upgrades",
      "Energy-efficient solutions",
      "Smart home integration",
    ],
  },
  {
    type: "commercial",
    title: "Commercial Construction",
    description: "Creating spaces that drive business success.",
    image: "/commercial.jpg",
    features: [
      "Office buildings",
      "Retail spaces",
      "Industrial facilities",
      "Healthcare centers",
      "Educational institutions",
      "Sustainable construction",
    ],
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

function ServicesPage() {
  const [activeTab, setActiveTab] = useState("residential");

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-32 px-4 relative overflow-hidden">
        <Image
          src="/real-estate-1.jpg"
          alt="Construction background"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 opacity-20"
        />
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <motion.div
          className="max-w-7xl mx-auto text-center relative z-10"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.h1
            className="text-3xl lg:text-7xl font-bold mb-6"
            variants={fadeInUp}
          >
            Buildit - Crafting Excellence in Every Project
          </motion.h1>
          <motion.p
            className="text-2xl mb-10 max-w-3xl mx-auto"
            variants={fadeInUp}
          >
            At Buildit, we pride ourselves on transforming visions into reality.
            With expertise in various sectors, we offer a wide range of services
            tailored to meet the unique needs of our clients, ensuring quality,
            innovation, and sustainability in every project.
          </motion.p>
        </motion.div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Tabs defaultValue="residential" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-12">
            <TabsTrigger
              value="residential"
              className="text-lg font-semibold py-4"
              onClick={() => setActiveTab("residential")}
            >
              <Home className="mr-2 h-5 w-5" /> Residential
            </TabsTrigger>
            <TabsTrigger
              value="commercial"
              className="text-lg font-semibold py-4"
              onClick={() => setActiveTab("commercial")}
            >
              <Building2 className="mr-2 h-5 w-5" /> Commercial
            </TabsTrigger>
          </TabsList>
          {services.map((service) => (
            <TabsContent key={service.type} value={service.type}>
              <motion.div
                className="grid grid-cols-1 lg:grid-cols-2 gap-12"
                initial="hidden"
                animate={activeTab === service.type ? "visible" : "hidden"}
                variants={stagger}
              >
                <motion.div variants={fadeInUp}>
                  <Image
                    src={service.image}
                    alt={service.title}
                    width={600}
                    height={400}
                    className="rounded-lg shadow-lg object-cover w-full h-[400px]"
                  />
                </motion.div>
                <motion.div variants={fadeInUp}>
                  <h2 className="text-4xl font-bold mb-6">{service.title}</h2>
                  <p className="text-xl text-gray-600 mb-8">
                    {service.description}
                  </p>
                  <ul className="space-y-4 mb-8">
                    {service.features.map((feature, index) => (
                      <motion.li
                        key={index}
                        className="flex items-center text-lg"
                        variants={fadeInUp}
                      >
                        <Check className="mr-2 h-6 w-6 text-green-500" />
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>

        <section className="mt-32">
          <motion.h2
            className="text-5xl font-bold text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Why Choose Buildit?
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                icon: "🏆",
                title: "Award-Winning Designs",
                description:
                  "Our innovative designs have won multiple industry awards.",
              },
              {
                icon: "👥",
                title: "Expert Team",
                description:
                  "Highly skilled professionals with years of experience.",
              },
              {
                icon: "🌿",
                title: "Sustainable Practices",
                description: "Committed to eco-friendly construction methods.",
              },
            ].map((item, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="text-center p-8 hover:shadow-lg transition-shadow duration-300">
                  <CardContent>
                    <div className="text-5xl mb-6">{item.icon}</div>
                    <h3 className="text-2xl font-semibold mb-4">
                      {item.title}
                    </h3>
                    <p className="text-gray-600">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <section className="mt-32">
          <motion.div
            className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg p-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl font-bold mb-8">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl mb-10 max-w-3xl mx-auto">
              Contact us today for a free consultation and let's bring your
              vision to life. Our team of experts is ready to turn your ideas
              into reality.
            </p>
            <Link href={"/about"}>
              <Button size="lg" variant="outline" className="mr-4 text-black">
                Know About Us
                <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </motion.div>
        </section>

        <section className="mt-32">
          <motion.h2
            className="text-5xl font-bold text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Material Options
          </motion.h2>
          <motion.div
            className="rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <MaterialOptions />
          </motion.div>
        </section>

        <section className="mt-32">
          <motion.h2
            className="text-5xl font-bold text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Contact Us
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <h3 className="text-3xl font-semibold mb-6">Get In Touch</h3>
              <p className="text-lg text-gray-600 mb-8">
                We're here to assist you. Whether you have a question, need a
                quote, or want to discuss your project, feel free to reach out
                to us. Our team is ready to help you with your construction
                needs.
              </p>
              <ul className="space-y-6">
                <li className="flex items-center text-lg">
                  <Phone className="mr-2 h-6 w-6 text-blue-600" />
                  +91 9652631186
                </li>
                <li className="flex items-center text-lg">
                  <Mail className="mr-2 h-6 w-6 text-blue-600" />
                  {/* builditdreamz@gmail.com */}
                  info@buildit.com
                </li>
                <li className="flex items-center text-lg">
                  <MapPin className="mr-2 h-6 w-6 text-blue-600" />
                  10-2-289/83, Mehar Mansion, Shanti Nagar Colony, Masab Tank
                  Hyderabad, Telangana 500028 India
                </li>
              </ul>
            </div>
            <div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.4143162844397!2d78.45109671487477!3d17.39587198807922!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb97dcc6a34d4f%3A0x8800e2e5d1ee13d1!2s10-2-289%2F83%2C%20Shanti%20Nagar%20Colony%2C%20Masab%20Tank%2C%20Hyderabad%2C%20Telangana%20500028!5e0!3m2!1sen!2sin!4v1627984635173!5m2!1sen!2sin"
                width="100%"
                height="450"
                className="rounded-lg border-0"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
}

export default ServicesPage;

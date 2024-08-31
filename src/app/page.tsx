"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardFooter } from "../components/ui/card";
import { Input } from "../components/ui/input";
import {
  ChevronLeft,
  ChevronRight,
  Bed,
  Bath,
  Square,
  Search,
  ArrowRight,
  Building2,
  Users,
  Trophy,
  Sparkles,
  Phone,
  Mail,
} from "lucide-react";
import MaterialOptions from "@/components/Pacakage";
import RequirementsForm from "@/components/RequirementForm";
import Navbar from "@/components/Navbar";
import Introduction from "@/components/Introduction";
import EnquiryForm from "@/components/EnquiryForm";

import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
const properties = [
  {
    id: 1,
    name: "The Villa",
    price: 5000000,
    bedrooms: 4,
    bathrooms: 5,
    area: 2000,
    image: "/villa.avif",
  },
  {
    id: 2,
    name: "Urban Loft",
    price: 750000,
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    image: "/urbanloft.jpg",
  },
  {
    id: 3,
    name: "Seaside Cottage",
    price: 1200000,
    bedrooms: 3,
    bathrooms: 2,
    area: 1500,
    image: "/cottage.jpg",
  },
];

const MotionCard = motion(Card);
const MotionButton = motion(Button);

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const slideVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.5 },
  },
};

const images = ["/coursorel-1.jpg", "/coursorel-2.jpg", "/coursorel-3.jpg"];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);

  const { toast } = useToast();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);
  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % properties.length);
  const prevSlide = () =>
    setCurrentSlide(
      (prev) => (prev - 1 + properties.length) % properties.length
    );

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleSendOtp = async () => {
    // Logic to send OTP to the entered email
    // POST(email, otpp);
    const otpp = generateRandomNumber(6);
    setOtpArray((prevArray) => [...prevArray, otpp]);

    try {
      const response = await axios.post("/api/send-email", {
        email,
        otpp,
      });

      console.log(response.data);
      setIsOtpSent(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleVerifyOtp = async () => {
    const lastOtp = otpArray[otpArray.length - 1];

    // Logic to verify OTP
    if (otp === lastOtp) {
      console.log("otp verified");
      setEmail("");
      setOtp("");
      // Example OTP
      setIsOtpVerified(true);
      setIsDialogOpen(false);
      // Navigate to blog creation page
    } else {
      console.log("otp not verified");
      setEmail("");
      setOtp("");
      setIsOtpVerified(true);
      setIsDialogOpen(false);
      toast({
        title: "Error",
        description: "Invalid OTP. Please try again.",
        variant: "destructive",
      });
      alert("Incorrect Otp . Please try again.");
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <section className="relative min-h-screen w-full overflow-hidden flex flex-col">
        {images.map((src, index) => (
          <Image
            key={src}
            src={src}
            alt={`Real estate image ${index + 1}`}
            layout="fill"
            objectFit="cover"
            className={`transition-opacity duration-1000 ${
              index === currentImage ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-black bg-opacity-50" />

        <div className="relative z-10 flex flex-col flex-grow">
          {/* RequirementsForm for large screens */}
          <div className="hidden lg:block mt-24 ml-9">
            <EnquiryForm />
          </div>

          {/* Content for small screens */}
          <div className="lg:hidden flex-grow flex flex-col justify-end p-4">
            <Link href={"/properties"}>
              <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg mb-4">
                Search Properties
              </button>
            </Link>
            <Link href={"/blog"}>
              <button className="w-full bg-white text-blue-600 py-3 px-6 rounded-lg mb-4">
                Blogs
              </button>
            </Link>
          </div>
        </div>
      </section>
      <main className=" mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <section className="mb-24 px-4 sm:px-6 lg:px-8">
          <motion.div
            className="lg:hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <EnquiryForm />
          </motion.div>
        </section>

        <section className="mb-24 px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Introduction />
          </motion.div>
        </section>

        <section className="mb-24">
          <motion.h2
            className="text-4xl font-bold mb-12 text-gray-800"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Why Choose BUILDIT?
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                icon: Building2,
                title: "Expert Construction",
                description: "State-of-the-art techniques and materials",
              },
              {
                icon: Users,
                title: "Client-Centric Approach",
                description: "Your vision, our expertise",
              },
              {
                icon: Trophy,
                title: "Award-Winning Designs",
                description: "Recognized for innovation and quality",
              },
              {
                icon: Sparkles,
                title: "Sustainable Practices",
                description: "Eco-friendly solutions for a better future",
              },
            ].map((item, index) => (
              <MotionCard
                key={index}
                className="text-center p-6 hover:shadow-lg transition-shadow duration-300"
                variants={fadeInUp}
                whileHover={{ y: -10 }}
              >
                <CardContent>
                  <item.icon className="mx-auto h-12 w-12 text-blue-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </CardContent>
              </MotionCard>
            ))}
          </motion.div>
        </section>
        <section className="mb-24">
          <motion.h2
            className="text-4xl font-bold text-center mb-12 text-gray-800"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Featured Properties
          </motion.h2>
          <div className="relative">
            <MotionButton
              variant="outline"
              onClick={prevSlide}
              className="absolute left-4 top-1/2 z-10 -translate-y-1/2 bg-white/80 hover:bg-white"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft />
            </MotionButton>
            <MotionButton
              variant="outline"
              onClick={nextSlide}
              className="absolute right-4 top-1/2 z-10 -translate-y-1/2 bg-white/80 hover:bg-white"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight />
            </MotionButton>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                variants={slideVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <Card className="w-full max-w-5xl mx-auto overflow-hidden shadow-2xl">
                  <CardContent className="p-0 relative">
                    <Image
                      src={properties[currentSlide].image}
                      alt={properties[currentSlide].name}
                      width={1200}
                      height={600}
                      className="w-full h-[600px] object-cover"
                    />
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-8"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                    >
                      <h3 className="text-4xl font-bold text-white mb-3">
                        {properties[currentSlide].name}
                      </h3>
                      <p className="text-2xl text-white mb-4">
                        ${properties[currentSlide].price.toLocaleString()}
                      </p>
                      <div className="flex space-x-6 text-white mb-6">
                        <span className="flex items-center">
                          <Bed className="mr-2" size={24} />{" "}
                          {properties[currentSlide].bedrooms} Beds
                        </span>
                        <span className="flex items-center">
                          <Bath className="mr-2" size={24} />{" "}
                          {properties[currentSlide].bathrooms} Baths
                        </span>
                        <span className="flex items-center">
                          <Square className="mr-2" size={24} />{" "}
                          {properties[currentSlide].area} sqft
                        </span>
                      </div>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        <section className="mb-24">
          <motion.div
            className="flex justify-between items-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-800">Our Projects</h2>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {properties.map((property, index) => (
              <MotionCard
                key={property.id}
                className="overflow-hidden hover:shadow-xl transition duration-300"
                variants={fadeInUp}
                whileHover={{ y: -10 }}
              >
                <CardContent className="p-0 relative">
                  <Image
                    src={property.image}
                    alt={property.name}
                    width={400}
                    height={300}
                    className="w-full h-[300px] object-cover"
                  />
                  <motion.div
                    className="absolute top-0 right-0 bg-blue-600 text-white px-4 py-2 m-4 rounded-full text-lg font-semibold"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    ${property.price.toLocaleString()}
                  </motion.div>
                </CardContent>
                <CardFooter className="flex flex-col items-start p-6">
                  <h3 className="text-2xl font-bold mb-3">{property.name}</h3>
                  <div className="flex justify-between w-full text-gray-600 mb-6">
                    <span className="flex items-center">
                      <Bed className="mr-2" size={20} /> {property.bedrooms}
                    </span>
                    <span className="flex items-center">
                      <Bath className="mr-2" size={20} /> {property.bathrooms}
                    </span>
                    <span className="flex items-center">
                      <Square className="mr-2" size={20} /> {property.area} sqft
                    </span>
                  </div>
                </CardFooter>
              </MotionCard>
            ))}
          </motion.div>
        </section>

        <section className="mb-24">
          <motion.h2
            className="text-4xl font-bold text-center mb-12 text-gray-800"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Our Location
          </motion.h2>
          <motion.div
            className="bg-white rounded-lg shadow-xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.4143162844397!2d78.45109671487477!3d17.39587198807922!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb97dcc6a34d4f%3A0x8800e2e5d1ee13d1!2s10-2-289%2F83%2C%20Shanti%20Nagar%20Colony%2C%20Masab%20Tank%2C%20Hyderabad%2C%20Telangana%20500028!5e0!3m2!1sen!2sin!4v1627984635173!5m2!1sen!2sin"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
              ></iframe>
            </div>
            <div className="p-6 flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <h3 className="text-2xl font-semibold mb-2">
                  BUILDIT Headquarters
                </h3>
                <p className="text-gray-600">
                  10-2-289/83,Mehar Mansion ,Shanti Nagar Colony, Masab Tank,
                  Hyderabad, Telangana 500028,India
                </p>
              </div>
              <div className="flex space-x-4">
                <MotionButton
                  className="flex items-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Phone size={20} />
                  <span>+91 9652631186</span>
                </MotionButton>
                <MotionButton
                  className="flex items-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Mail size={20} />
                  <span>builditdreamz@gmail.com</span>
                </MotionButton>
              </div>
            </div>
          </motion.div>
        </section>

        <section>
          <motion.div
            className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white rounded-3xl p-16 text-center shadow-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl mb-8">
              Contact our team of experts to bring your construction dreams to
              life.
            </p>
            <MotionButton
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50 transition-colors duration-300 py-6 px-10 text-xl font-semibold rounded-full shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/enquiry">Get in Touch</Link>

              <ArrowRight className="ml-2 h-6 w-6" />
            </MotionButton>
          </motion.div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <h3 className="text-3xl font-bold mb-6">BUILDIT</h3>
              <p className="text-gray-400">
                Your trusted partner in construction and development.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/about"
                    className="hover:text-blue-400 transition-colors duration-300"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="hover:text-blue-400 transition-colors duration-300"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="/projects"
                    className="hover:text-blue-400 transition-colors duration-300"
                  >
                    Projects
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-blue-400 transition-colors duration-300"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-6">Contact Us</h4>
              <address className="text-gray-400 not-italic">
                <p>
                  10-2-289/83, Mehar Mansion, Shanti Nagar Colony, Masab Tank
                </p>
                <p>Hyderabad, Telangana 500028</p>
                <p>India</p>
                <p className="mt-4">
                  Phone: <a href="tel:+919652631186">+91 9652631186</a>
                </p>
                <p>
                  Email:{" "}
                  {/* <a href="mailto:builditdreamz@gmail.com">
                    builditdreamz@gmail.com */}
                  <a href="mailto:info@buildit.com">info@buildit.com</a>
                </p>
              </address>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-6">Follow Us</h4>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>

                <a
                  href="https://www.instagram.com/builditdreams"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>

                <a
                  href="https://www.youtube.com/@builditdreams"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 BUILDIT. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

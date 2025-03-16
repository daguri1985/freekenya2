import Image from "next/image";
import Navbar from "../components/Navbar";
import Header from "@/components/Header";
import Focus from "@/components/Focus";
import Register from "@/components/Register";

export default function Home() {
  return (
<>
    <Navbar/>
    <Header />
    <Focus />
    <Register />
</>
  );
}

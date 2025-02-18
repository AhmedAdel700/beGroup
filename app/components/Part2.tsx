"use client";
import { useTranslations } from "next-intl";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useRef } from "react";

export default function Part2() {
  const t = useTranslations("Part2");
  const position: [number, number] = [30.061653083941284, 31.336842199768714];

  // Custom marker icon
  const customIcon = new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [-1, -45],
  });

  // Create a ref for the marker
  const markerRef = useRef<L.Marker>(null);

  // Open popup automatically when the marker is mounted
  useEffect(() => {
    const timer = setTimeout(() => {
      if (markerRef.current) {
        markerRef.current.openPopup();
      }
    }, 500); // Delay to ensure marker is rendered
    return () => clearTimeout(timer);
  }, []);

  function styleText(text: string) {
    // Split the text into words
    const words = text.split(" ");

    // Extract the words you want to style
    const firstWord = words[0]; // "Digi"
    const secondWord = words[1]; // "Fly"
    const thirdWord = words[2]; // "Company"
    const remainingText = words.slice(3).join(" "); // "welcomes you"

    // Return the JSX with styled elements
    return (
      <p className="flex gap-1 flex-wrap">
        <span
          className={
            firstWord !== "Digi" ? `font-bold` : `font-bold text-green-600`
          }
        >
          {firstWord}
        </span>{" "}
        <span
          className={
            secondWord !== "Fly" ? `font-bold text-green-600` : "font-bold"
          }
        >
          {secondWord}
        </span>{" "}
        <span>{thirdWord}</span>
        <span>{remainingText}</span>
      </p>
    );
  }

  return (
    <>
      <div className="flex items-center bg-background px-6 lg:px-12 md:px-12 pt-4">
        <span className="w-[64px] h-[4px] bg-customPurple rounded-sm"></span>
        <h2 className="text-xl mx-4">{t("Part 2")}</h2>
      </div>

      <section className="bg-background py-10">
        <MapContainer
          center={position}
          zoom={25}
          style={{ height: "500px", width: "100%" }}
        >
          {/* Tile Layer from OpenStreetMap */}
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {/* Marker with Popup */}
          <Marker position={position} icon={customIcon} ref={markerRef}>
            <Popup>{styleText(t("Digi Fly Company welcomes you"))}</Popup>
          </Marker>
        </MapContainer>
      </section>
    </>
  );
}

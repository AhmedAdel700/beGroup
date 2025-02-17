"use client";
import { useTranslations } from "next-intl";
import L from "leaflet";
import { useEffect } from "react";

export default function Part2() {
  const t = useTranslations("Part2");
  useEffect(() => {
    const map = L.map("map", {
      center: [51.505, -0.09], // Set initial map center [latitude, longitude]
      zoom: 13, // Set initial zoom level
    });

    // Add a tile layer (you can use any tile provider)
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Add a marker at the center of the map
    L.marker([51.5, -0.09])
      .addTo(map)
      .bindPopup("<b>Hello world!</b><br />I am a popup.")
      .openPopup();

    return () => {
      map.remove();
    };
  }, []);

  return (
    <>
      <div className="flex items-center bg-background px-6 lg:px-12 md:px-12 pt-4">
        <span className="w-[64px] h-[4px] bg-customPurple rounded-sm"></span>
        <h2 className="text-xl mx-4">{t("Part 2")}</h2>
      </div>

      <section
        className="bg-background py-10">
        <div
          id="map"
          style={{
            height: "500px",
            width: "100%",
          }}
        ></div>
      </section>
    </>
  );
}

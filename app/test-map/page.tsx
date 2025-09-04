"use client";

import { useEffect } from "react";

export default function MapTest() {
  useEffect(() => {
    if ((window as any).google) {
      initMap();
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      initMap();
    };

    document.body.appendChild(script);

    function initMap() {
      const map = new (window as any).google.maps.Map(document.getElementById("map"), {
        center: { lat: 25.251, lng: 86.984 },
        zoom: 12,
      });
      console.log("Google Map rendered!", map);
    }

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      id="map"
      style={{
        width: "100%",
        height: "500px",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    ></div>
  );
}

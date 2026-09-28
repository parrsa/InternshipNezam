"use client"
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, TileLayer, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import { useEffect, useState } from "react";
import { LucideMapPinPlus, MapPin } from "lucide-react";

interface LocationMapProps {
    latitude?: number;
    longitude?: number;
    zoom?: number;
    height?: string | number;
    className?: string;
    draggableMarker?: boolean;
    onPositionChange?: (lat: number, lng: number) => void;
}

function PinMarker() {
    return (
        <div className="w-10 h-10 rounded-full flex justify-center items-center bg-neutral-200 relative">
            <div className="absolute w-1 h-11 top-5 rounded-md bg-gray-700 left-1/2 -translate-x-1/2 z-0"></div>
            <div className="w-[80%] h-[80%] rounded-full bg-[#B400AE] flex justify-center items-center relative z-10">
                <div className="w-1/2 h-1/2 rounded-full bg-neutral-200"></div>
            </div>
        </div>
    );
}

const customIcon = new L.DivIcon({
    className: "custom-marker-icon ",
    html: renderToStaticMarkup(<PinMarker />),
    iconSize: [48, 48],
    iconAnchor: [24, 24],
});

function ClickToSelect({ onSelect }: { onSelect: (lat: number, lng: number) => void }) {
    useMapEvents({
        click(e) {
            onSelect(e.latlng.lat, e.latlng.lng);
        },
    });
    return null;
}

// دکمه‌های + / - زوم، گوشه پایین-چپ (مطابق طرح)
function ZoomControls() {
    const map = useMap();
    return (
        <div className="absolute bottom-16 left-3 z-[1000] flex flex-col gap-2">
            <button
                type="button"
                onClick={() => map.zoomIn()}
                aria-label="بزرگ‌نمایی"
                className="w-12 h-12 rounded-xl bg-input-700 flex items-center justify-center text-lg font-bold shadow-md active:scale-95 transition-transform"
            >
                +
            </button>
            <button
                type="button"
                onClick={() => map.zoomOut()}
                aria-label="کوچک‌نمایی"
                className="w-12 h-12 rounded-xl bg-input-700  flex items-center justify-center text-lg font-bold shadow-md active:scale-95 transition-transform"
            >
                −
            </button>
        </div>
    );
}

// دکمه موقعیت‌یابی، گوشه پایین-راست (مطابق طرح)
function LocateControl({ onLocate }: { onLocate: (lat: number, lng: number) => void }) {
    const map = useMap();
    const [loading, setLoading] = useState(false);

    const handleClick = () => {
        if (!navigator.geolocation) return;
        setLoading(true);
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const { latitude, longitude } = pos.coords;
                map.setView([latitude, longitude], 15);
                onLocate(latitude, longitude);
                setLoading(false);
            },
            () => setLoading(false),
            { enableHighAccuracy: true, timeout: 8000 }
        );
    };

    return (
        <button
            type="button"
            onClick={e => {
                handleClick()
                e.stopPropagation()
            }}
            aria-label="موقعیت من"
            className="absolute bottom-3 right-3 z-[1000] w-12  h-12 cursor-pointer  rounded-xl bg-input-700 border border-neutral-300 shadow-md flex items-center justify-center active:scale-95 transition-transform"
        >
            <MapPin className="" />
        </button>
    );
}

export default function LocationMap({
    latitude = 35.6892,
    longitude = 51.389,
    zoom = 13,
    height = 200,
    className = "",
    draggableMarker = false,
    onPositionChange,
}: LocationMapProps) {
    const [position, setPosition] = useState<[number, number]>([latitude, longitude]);

    const updatePosition = (lat: number, lng: number) => {
        setPosition([lat, lng]);
        onPositionChange?.(lat, lng);
    };

    useEffect(() => {
        updatePosition(latitude, longitude);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [latitude, longitude]);

    return (
        <div className={`w-full rounded-3xl overflow-hidden z-10 ${className}`} style={{ height }}>
            <MapContainer
                center={position}
                zoom={zoom}
                zoomControl={false}
                transform3DLimit={1}
                style={{ width: "100%", height: "100%" }}
            >
                <TileLayer url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}" />

                <Marker
                    position={position}
                    icon={customIcon}
                    draggable={draggableMarker}
                    {...(draggableMarker
                        ? {
                            eventHandlers: {
                                dragend: (e: any) => {
                                    const { lat, lng } = e.target.getLatLng();
                                    updatePosition(lat, lng);
                                },
                            },
                        }
                        : {})}
                />
                {draggableMarker && <ClickToSelect onSelect={updatePosition} />}

                {draggableMarker && (
                    <ZoomControls />

                )}
                {draggableMarker && (
                    <LocateControl onLocate={updatePosition} />

                )}
            </MapContainer>
        </div>
    );
}
"use client";
import { RootState } from "@/redux/store";
import {
  ArrowLeft,
  Building2,
  CreditCard,
  CreditCardIcon,
  Home,
  Loader,
  Loader2,
  LocateFixed,
  MapPin,
  Navigation2,
  Phone,
  Search,
  Truck,
  User,
} from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import { useSelector } from "react-redux";
import "leaflet/dist/leaflet.css";
import L, { LatLngExpression } from "leaflet";
import axios from "axios";

const markerIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/128/684/684908.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const Checkout = () => {
  const router = useRouter();
  const { userData } = useSelector((state: RootState) => state.user);
  const { cartData } = useSelector((state: RootState) => state.cart);
  const { subTotal, finalTotal, deliveryFee } = useSelector(
    (state: RootState) => state.cart
  );

  const [address, setAddress] = useState({
    name: "",
    mobile: "",
    city: "",
    state: "",
    pinCode: "",
    fullAddress: "",
  });

  const [searchQuery, setSearchQuery] = useState<string>("");

  const [position, setPosition] = useState<[number, number] | null>(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"online" | "cod">("cod");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setPosition([latitude, longitude]);
        },
        (error) => {
          console.log(`Location error ${error}`);
        },
        { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 }
      );
    }
  }, []);

  useEffect(() => {
    if (userData) {
      setAddress((pre) => ({ ...pre, name: userData.name || "" }));
      setAddress((pre) => ({ ...pre, mobile: userData.mobile || "" }));
    }
  }, [userData]);

  const DraggableMarker: React.FC = () => {
    const map = useMap();
    useEffect(() => {
      map.setView(position as LatLngExpression, 15, { animate: true });
    }, [position, map]);

    return (
      <Marker
        draggable={true}
        icon={markerIcon}
        position={position as LatLngExpression}
        eventHandlers={{
          dragend: (e: L.LeafletEvent) => {
            const marker = e.target as L.Marker;
            const { lat, lng } = marker.getLatLng();
            setPosition([lat, lng]);
          },
        }}
      />
    );
  };

  useEffect(() => {
    const fetchAddress = async () => {
      if (!position) return;

      try {
        const res = await axios.get(
          `/api/user/reverse-geocode?lat=${position[0]}&lon=${position[1]}`
        );
        console.log(res.data);
        setAddress((prev) => ({ ...prev, city: res.data.address.city }));
        setAddress((prev) => ({ ...prev, state: res.data.address.state }));
        setAddress((prev) => ({ ...prev, pinCode: res.data.address.postcode }));
        setAddress((prev) => ({ ...prev, fullAddress: res.data.display_name }));
      } catch (error) {
        console.log(error);
      }
    };

    fetchAddress();
  }, [position]);

  const handleSearchQuery = async () => {
    setSearchLoading(true);
    if (!searchQuery.trim()) return;
    const res = await axios.get(`/api/user/location-search?q=${searchQuery}`);
    if (res) {
      if (res.data?.length > 0) {
        const { lat, lon } = res.data[0];
        setPosition([lat, lon]);
        setSearchLoading(false);
      }
    }
  };

  const handleCurrentLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setPosition([latitude, longitude]);
        },
        (error) => {
          console.log("Location error:", error);
        },
        { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 }
      );
    }
  };

  const handleCod = async () => {
    if (!position) return;
    try {
      const res = await axios.post("/api/user/order", {
        userId: userData?._id,
        items: cartData.map((item) => ({
          grocery: item._id,
          name: item.name,
          unit: item.unit,
          price: item.price,
          image: item.image,
          quantity: item.quantity,
        })),
        totalAmount: finalTotal,
        address: {
          fullName: address.name,
          mobile: address.mobile,
          city: address.city,
          state: address.state,
          pinCode: address.pinCode,
          fullAddress: address.fullAddress,
          latitude: position[0],
          longitude: position[1],
        },
        paymentMethod,
      });

      console.log(res);
    } catch (error) {
      console.log(error);
      
    }
  };

  return (
    <div className="w-[90%] sm:w-[80%] mx-auto relative py-10">
      <motion.button
        onClick={() => router.push("/user/cart")}
        whileTap={{ scale: 0.97 }}
        className="absolute flex gap-2 left-0 top-2 text-green-700 hover:text-green-800 font-semibold items-center"
      >
        <ArrowLeft size={16} />
        <span>Back to cart</span>
      </motion.button>

      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-green-700 font-bold text-3xl md:text-4xl mb-10 text-center"
      >
        Checkout page
      </motion.h1>

      <div className="grid md:grid-cols-2 gap-8 ">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
        >
          <h1 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <MapPin /> Delivery Address
          </h1>

          <div className="space-y-4">
            <div className="relative">
              <User
                className="absolute left-3 top-3 text-green-600"
                size={18}
              />
              <input
                className="pl-10 p-3 w-full rounded-xl bg-gray-50 border text-sm"
                type="text"
                value={address.name}
                onChange={(e) =>
                  setAddress((pre) => ({ ...pre, name: e.target.value }))
                }
              />
            </div>

            <div className="relative">
              <Phone
                className="absolute left-3 top-3 text-green-600"
                size={18}
              />
              <input
                className="pl-10 p-3 w-full rounded-xl bg-gray-50 border text-sm"
                type="text"
                value={address.mobile}
                onChange={(e) =>
                  setAddress((pre) => ({ ...pre, mobile: e.target.value }))
                }
              />
            </div>

            <div className="relative">
              <Home
                className="absolute left-3 top-3 text-green-600"
                size={18}
              />
              <input
                className="pl-10 p-3 w-full rounded-xl bg-gray-50 border text-sm"
                type="text"
                placeholder="full address"
                value={address.fullAddress}
                onChange={(e) =>
                  setAddress((pre) => ({ ...pre, fullAddress: e.target.value }))
                }
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="relative">
                <Building2
                  className="absolute left-3 top-3 text-green-600"
                  size={18}
                />
                <input
                  className="pl-10 p-3 w-full rounded-xl bg-gray-50 border text-sm"
                  type="text"
                  placeholder="city"
                  value={address.city}
                  onChange={(e) =>
                    setAddress((pre) => ({ ...pre, city: e.target.value }))
                  }
                />
              </div>

              <div className="relative">
                <Navigation2
                  className="absolute left-3 top-3 text-green-600"
                  size={18}
                />
                <input
                  className="pl-10 p-3 w-full rounded-xl bg-gray-50 border text-sm"
                  type="text"
                  placeholder="state"
                  value={address.state}
                  onChange={(e) =>
                    setAddress({ ...address, state: e.target.value })
                  }
                />
              </div>

              <div className="relative">
                <Search
                  className="absolute left-3 top-3 text-green-600"
                  size={18}
                />
                <input
                  className="pl-10 p-3 w-full rounded-xl bg-gray-50 border text-sm"
                  type="text"
                  placeholder="pincode"
                  value={address.pinCode}
                  onChange={(e) =>
                    setAddress({ ...address, pinCode: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="flex gap-2 mt-3">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 border p-3 shadow-lg rounded-2xl focus:ring-2 focus:ring-green-500 text-sm outline-none"
                placeholder="search your city..."
              />
              <button
                onClick={handleSearchQuery}
                className="bg-green-600 text-white px-5 font-medium rounded-lg hover:bg-green-700 transition-all cursor-pointer"
              >
                {searchLoading ? (
                  <Loader2 size={22} className=" animate-spin" />
                ) : (
                  "Search"
                )}
              </button>
            </div>

            <div className="relative mt-6 h-[330px] rounded-xl overflow-hidden border border-gray-200 shadow-inner">
              {position && (
                <MapContainer
                  center={position as LatLngExpression}
                  zoom={13}
                  scrollWheelZoom={true}
                  className="w-full h-full"
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <DraggableMarker />
                </MapContainer>
              )}

              <motion.button
                onClick={handleCurrentLocation}
                whileTap={{ scale: 0.93 }}
                className="absolute right-4 z-999 text-white hover:bg-green-700 transition-all flex items-center justify-center bottom-4 bg-green-600 rounded-full p-3"
              >
                <LocateFixed size={22} />
              </motion.button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
        >
          <h2 className="flex gap-2 mb-4 text-xl font-semibold text-gray-800">
            <CreditCard className="text-green-700" /> Payment Method
          </h2>
          <div className="space-y-4 mb-6">
            <button
              onClick={() => setPaymentMethod("online")}
              className={`flex gap-3 items-center p-3 w-full border rounded-lg transition-all ${
                paymentMethod === "online"
                  ? "border-green-700 bg-green-100 shadow-sm hover:bg-gray-50"
                  : "hover:bg-gray-50"
              }`}
            >
              <CreditCardIcon />
              <span>Pay Online (Stripe)</span>
            </button>

            <button
              onClick={() => setPaymentMethod("cod")}
              className={`flex gap-3 items-center p-3 w-full border rounded-lg transition-all ${
                paymentMethod === "cod"
                  ? "border-green-700 bg-green-100 shadow-sm hover:bg-gray-50"
                  : "hover:bg-gray-50"
              }`}
            >
              <Truck />
              <span>Cash on Delivery</span>
            </button>
          </div>

          <div className="space-y-2 border-t pt-4 text-sm sm:text-base text-gray-700">
            <div className="flex justify-between">
              <span className="font-semibold">Subtotal:</span>
              <span className="font-semibold text-green-700">₹{subTotal}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-semibold">Delivery Fee:</span>
              <span className="font-semibold text-green-700">
                ₹{deliveryFee}
              </span>
            </div>

            <div className="flex justify-between text-lg pt-3 border-t">
              <span className="font-bold">Final Amount:</span>
              <span className="font-bold text-green-700">₹{finalTotal}</span>
            </div>
          </div>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              if (paymentMethod === "cod") {
                handleCod();
              } else {
                null;
              }
            }}
            className="w-full bg-green-600 cursor-pointer hover:bg-green-700 text-white py-3 rounded-full transition-all font-semibold mt-5 duration-300"
          >
            {paymentMethod === "online" ? "Pay & Place Order" : "Place Order"}
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Checkout;

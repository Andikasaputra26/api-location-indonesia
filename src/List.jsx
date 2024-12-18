import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function ListProvinsi() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://alamat.thecloudalert.com/api/provinsi/get/"
        );
        // console.log("Respons dari API:", response.data);
        setData(response.data.result || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading)
    return (
      <motion.div
        className="flex justify-center items-center h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-xl">Loading...</p>
      </motion.div>
    );
  if (error)
    return (
      <motion.div
        className="flex justify-center items-center h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-xl text-red-500">Error: {error}</p>
      </motion.div>
    );
  if (!Array.isArray(data) || data.length === 0)
    return (
      <motion.div
        className="flex justify-center items-center h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-xl">Data tidak ditemukan.</p>
      </motion.div>
    );

  return (
    <motion.div
      className="flex flex-col justify-center items-center h-screen"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="text-2xl font-bold mb-4"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Daftar Provinsi
      </motion.h1>
      <motion.select
        name="provinsi"
        id="provinsi"
        className="p-2 border border-gray-300 rounded"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {data.map((provinsi) => (
          <motion.option
            key={provinsi.id}
            value={provinsi.id}
            whileHover={{ scale: 1.1 }}
          >
            {provinsi.text}
          </motion.option>
        ))}
      </motion.select>
    </motion.div>
  );
}

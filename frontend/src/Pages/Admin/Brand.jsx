import { useState, useEffect } from "react";
import { Plus, Trash2, X, UploadCloud } from "lucide-react";
import {
  getBrandsAPI,
  getCategoriesAPI,
  addBrandAPI,
  deleteBrandAPI,
} from "../../api/api";

export default function Brand() {
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [data, setData] = useState({
    productName: "",
    category: "",
    brandName: "",
    brandLogo: null,
    brandImage: null,
  });

  const [previewLogo, setPreviewLogo] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  // Fetch brands
  const fetchBrands = async () => {
    try {
      const res = await getBrandsAPI();
      setBrands(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await getCategoriesAPI();
      setCategories(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBrands();
    fetchCategories();
  }, []);

  // Handle image selection
  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    if (type === "logo") {
      setData({ ...data, brandLogo: file });
      setPreviewLogo(URL.createObjectURL(file));
    } else {
      setData({ ...data, brandImage: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // Drag-drop handler
  const handleDrop = (e, type) => {
    e.preventDefault();

    const file = e.dataTransfer.files[0];
    if (!file) return;

    if (type === "logo") {
      setData({ ...data, brandLogo: file });
      setPreviewLogo(URL.createObjectURL(file));
    } else {
      setData({ ...data, brandImage: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // Add brand
  const handleAddBrand = async () => {
    if (
      !data.productName ||
      !data.category ||
      !data.brandName ||
      !data.brandLogo ||
      !data.brandImage
    ) {
      return alert("Please fill all fields");
    }

    const formData = new FormData();
    formData.append("productName", data.productName);
    formData.append("category", data.category);
    formData.append("brandName", data.brandName);
    formData.append("brandLogo", data.brandLogo);
    formData.append("brandImage", data.brandImage);

    try {
      await addBrandAPI(formData);
      setShowModal(false);
      fetchBrands();
    } catch (err) {
      console.log(err);
      alert("Error adding brand");
    }
  };

  // Delete brand
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this brand?")) return;
    await deleteBrandAPI(id);
    fetchBrands();
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Brands</h1>

        <button
          onClick={() => setShowModal(true)}
          className="bg-[#00A884] text-white px-5 py-3 rounded-xl flex items-center gap-2"
        >
          <Plus size={18} /> Add Brand
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-4">#</th>
              <th className="px-6 py-4">Product</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Brand</th>
              <th className="px-6 py-4">Logo</th>
              <th className="px-6 py-4">Image</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {brands.map((item, index) => (
              <tr key={item._id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">{item.productName}</td>
                <td className="px-6 py-4">{item.category?.name}</td>
                <td className="px-6 py-4">{item.brandName}</td>

                <td className="px-6 py-4">
                  <img
                    src={`http://localhost:5000/${item.brandLogo}`}
                    className="h-12 w-12 rounded-lg object-cover"
                  />
                </td>

                <td className="px-6 py-4">
                  <img
                    src={`http://localhost:5000/${item.brandImage}`}
                    className="h-12 w-12 rounded-lg object-cover"
                  />
                </td>

                <td className="px-6 py-4">
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="text-red-600 hover:bg-red-100 p-2 rounded-lg"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Brand Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-xl max-w-xl w-full shadow-xl">
            <div className="flex justify-between mb-6">
              <h2 className="text-2xl font-bold">Add Brand</h2>
              <X size={24} onClick={() => setShowModal(false)} />
            </div>

            <div className="space-y-4">

              {/* Product Name */}
              <input
                type="text"
                placeholder="Product Name"
                className="w-full border rounded-xl px-4 py-3"
                onChange={(e) =>
                  setData({ ...data, productName: e.target.value })
                }
              />

              {/* Category */}
              <select
                className="w-full border rounded-xl px-4 py-3"
                onChange={(e) => setData({ ...data, category: e.target.value })}
              >
                <option>Select Category</option>
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>

              {/* BRAND NAME */}
              <input
                type="text"
                placeholder="Brand Name"
                className="w-full border rounded-xl px-4 py-3"
                onChange={(e) =>
                  setData({ ...data, brandName: e.target.value })
                }
              />

              {/* BRAND LOGO UPLOAD */}
              <label className="font-medium">Brand Logo</label>
              <div
                className="border-2 border-dashed rounded-xl p-5 text-center cursor-pointer bg-gray-50"
                onDrop={(e) => handleDrop(e, "logo")}
                onDragOver={(e) => e.preventDefault()}
              >
                <input
                  type="file"
                  className="hidden"
                  id="brand-logo"
                  onChange={(e) => handleFileChange(e, "logo")}
                />

                {!previewLogo ? (
                  <label htmlFor="brand-logo" className="cursor-pointer flex flex-col items-center">
                    <UploadCloud size={45} className="text-[#00A884]" />
                    <p className="font-medium mt-2">Drop or select file</p>
                    <p className="text-xs text-green-600">Icon (128×128)</p>
                  </label>
                ) : (
                  <img
                    src={previewLogo}
                    className="h-24 mx-auto rounded-lg object-contain"
                  />
                )}
              </div>

              {/* BRAND IMAGE UPLOAD */}
              <label className="font-medium">Brand Image</label>
              <div
                className="border-2 border-dashed rounded-xl p-5 text-center cursor-pointer bg-gray-50"
                onDrop={(e) => handleDrop(e, "image")}
                onDragOver={(e) => e.preventDefault()}
              >
                <input
                  type="file"
                  className="hidden"
                  id="brand-image"
                  onChange={(e) => handleFileChange(e, "image")}
                />

                {!previewImage ? (
                  <label htmlFor="brand-image" className="cursor-pointer flex flex-col items-center">
                    <UploadCloud size={45} className="text-[#00A884]" />
                    <p className="font-medium mt-2">Drop or select file</p>
                    <p className="text-xs text-green-600">Icon (128×128)</p>
                  </label>
                ) : (
                  <img
                    src={previewImage}
                    className="h-24 mx-auto rounded-lg object-contain"
                  />
                )}
              </div>

              {/* BUTTONS */}
              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2 bg-gray-200 rounded-lg"
                >
                  Cancel
                </button>

                <button
                  onClick={handleAddBrand}
                  className="px-5 py-2 bg-[#00A884] text-white rounded-lg"
                >
                  Save
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}

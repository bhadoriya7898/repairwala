import { useState, useEffect } from "react";
import { Plus, Trash2, X, UploadCloud } from "lucide-react";
import {
  getBrandsAPI,
  getCategoriesAPI,
  addBrandAPI,
  deleteBrandAPI,
} from "../../api/api";

/* ========================================================
   Reusable Image Uploader Component
======================================================== */
function ImageUploader({ label, preview, onChange, onDrop }) {
  return (
    <div>
      <label className="font-medium">{label}</label>
      <div
        className="border-2 border-dashed rounded-xl p-5 text-center cursor-pointer bg-gray-50"
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <input
          type="file"
          className="hidden"
          id={label}
          onChange={onChange}
        />

        {!preview ? (
          <label
            htmlFor={label}
            className="cursor-pointer flex flex-col items-center"
          >
            <UploadCloud size={45} className="text-[#00A884]" />
            <p className="font-medium mt-2">Drop or select file</p>
            <p className="text-xs text-green-600">Icon (128×128)</p>
          </label>
        ) : (
          <img
            src={preview}
            className="h-24 mx-auto rounded-lg object-contain"
          />
        )}
      </div>
    </div>
  );
}

/* ========================================================
   Delete Confirmation Modal
======================================================== */
function DeleteModal({ open, onClose, onConfirm, brandName }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <div className="bg-white p-6 rounded-xl max-w-md w-full shadow-xl">
        <div className="flex justify-between mb-6">
          <h2 className="text-xl font-bold">Delete Brand</h2>
          <X size={24} onClick={onClose} className="cursor-pointer" />
        </div>

        <p className="text-gray-700 mb-6">
          Are you sure you want to delete <strong>{brandName}</strong>?
        </p>

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-5 py-2 bg-gray-200 rounded-lg">
            Cancel
          </button>
          <button onClick={onConfirm} className="px-5 py-2 bg-red-600 text-white rounded-lg">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

/* ========================================================
   Brand Card (Mobile)
======================================================== */
function BrandCard({ item, onDelete }) {
  return (
    <div className="border rounded-xl p-4 shadow-sm bg-gray-50 flex justify-between items-center">
      <div>
        <p className="font-bold">{item.brandName}</p>
        <p className="text-sm text-gray-600">
          {item.productName} • {item.category?.name}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <img
          src={`http://localhost:5000/${item.brandLogo}`}
          className="h-12 w-12 rounded-lg object-cover"
        />

        <button onClick={() => onDelete(item)} className="text-red-600 p-2 rounded-lg">
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}

/* ========================================================
   Brand Row (Desktop Table)
======================================================== */
function BrandRow({ item, index, onDelete }) {
  return (
    <tr className="border-b hover:bg-gray-50">
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
          onClick={() => onDelete(item)}
          className="text-red-600 hover:bg-red-100 p-2 rounded-lg"
        >
          <Trash2 size={18} />
        </button>
      </td>
    </tr>
  );
}

/* ========================================================
   Main Brand Component
======================================================== */
export default function Brand() {
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [brandToDelete, setBrandToDelete] = useState(null);

  const [data, setData] = useState({
    productName: "",
    category: "",
    brandName: "",
    brandLogo: null,
    brandImage: null,
  });

  const [previewLogo, setPreviewLogo] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  /* ---------------- FETCHING ---------------- */
  const fetchBrands = async () => {
    try {
      const res = await getBrandsAPI();
      setBrands(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await getCategoriesAPI();
      setCategories(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    Promise.all([fetchBrands(), fetchCategories()]);
  }, []);

  /* ---------------- FORM HANDLERS ---------------- */
  const handleChange = (e) =>
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleFile = (file, type) => {
    if (type === "logo") {
      setData((p) => ({ ...p, brandLogo: file }));
      setPreviewLogo(URL.createObjectURL(file));
    } else {
      setData((p) => ({ ...p, brandImage: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) handleFile(file, type);
  };

  const handleDrop = (e, type) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file, type);
  };

  /* ---------------- ADD BRAND (FIXED RESET) ---------------- */
  const handleAddBrand = async () => {
    if (!data.productName || !data.category || !data.brandName || !data.brandLogo || !data.brandImage) {
      return alert("Please fill all fields");
    }

    const formData = new FormData();
    Object.keys(data).forEach((key) => formData.append(key, data[key]));

    try {
      await addBrandAPI(formData);

      // ⭐ RESET STATE AFTER ADD
      setData({
        productName: "",
        category: "",
        brandName: "",
        brandLogo: null,
        brandImage: null,
      });

      setPreviewLogo(null);
      setPreviewImage(null);

      setShowModal(false);
      fetchBrands();
    } catch (err) {
      console.log(err);
      alert("Error adding brand");
    }
  };

  /* ---------------- DELETE BRAND ---------------- */
  const confirmDelete = async () => {
    await deleteBrandAPI(brandToDelete._id);
    setDeleteModal(false);
    fetchBrands();
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Brands</h1>

        <button
          onClick={() => setShowModal(true)}
          className="bg-[#00A884] text-white px-5 py-3 rounded-xl flex items-center gap-2"
        >
          <Plus size={18} /> Add Brand
        </button>
      </div>

      {/* ---------------------- TABLE (DESKTOP) ---------------------- */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full min-w-[900px]">
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
                <BrandRow
                  key={item._id}
                  item={item}
                  index={index}
                  onDelete={(b) => {
                    setBrandToDelete(b);
                    setDeleteModal(true);
                  }}
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* ---------------------- MOBILE CARDS ---------------------- */}
        <div className="md:hidden p-4 space-y-4">
          {brands.map((item) => (
            <BrandCard
              key={item._id}
              item={item}
              onDelete={(b) => {
                setBrandToDelete(b);
                setDeleteModal(true);
              }}
            />
          ))}
        </div>
      </div>

      {/* ---------------------- ADD BRAND MODAL ---------------------- */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-xl max-w-xl w-full shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between mb-6">
              <h2 className="text-2xl font-bold">Add Brand</h2>
              <X size={24} onClick={() => setShowModal(false)} className="cursor-pointer" />
            </div>

            <div className="space-y-4">
              <input
                type="text"
                name="productName"
                placeholder="Product Name"
                className="w-full border rounded-xl px-4 py-3"
                onChange={handleChange}
              />

              <select
                name="category"
                className="w-full border rounded-xl px-4 py-3"
                onChange={handleChange}
              >
                <option>Select Category</option>
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>

              <input
                type="text"
                name="brandName"
                placeholder="Brand Name"
                className="w-full border rounded-xl px-4 py-3"
                onChange={handleChange}
              />

              <ImageUploader
                label="Brand Logo"
                preview={previewLogo}
                onChange={(e) => handleFileChange(e, "logo")}
                onDrop={(e) => handleDrop(e, "logo")}
              />

              <ImageUploader
                label="Brand Image"
                preview={previewImage}
                onChange={(e) => handleFileChange(e, "image")}
                onDrop={(e) => handleDrop(e, "image")}
              />

              <div className="flex justify-end gap-3 mt-4">
                <button onClick={() => setShowModal(false)} className="px-5 py-2 bg-gray-200 rounded-lg">
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

      {/* ---------------------- DELETE MODAL ---------------------- */}
      <DeleteModal
        open={deleteModal}
        brandName={brandToDelete?.brandName}
        onClose={() => setDeleteModal(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}

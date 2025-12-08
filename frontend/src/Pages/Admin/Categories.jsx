import { useState, useEffect } from "react";
import { Plus, X, Trash2, UploadCloud } from "lucide-react";
import {
  getCategoriesAPI,
  addCategoryAPI,
  deleteCategoryAPI,
} from "../../api/api";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const [data, setData] = useState({ name: "", image: null });

  // Fetch Categories
  const fetchCategories = async () => {
    try {
      const res = await getCategoriesAPI();
      setCategories(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // File select handler
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setData({ ...data, image: file });
    setPreviewImage(URL.createObjectURL(file));
  };

  // Drag-drop handler
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file) return;

    setData({ ...data, image: file });
    setPreviewImage(URL.createObjectURL(file));
  };

  // Add Category
  const handleAddCategory = async () => {
    if (!data.name || !data.image) return alert("All fields required");

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("image", data.image);

      await addCategoryAPI(formData);

      setShowModal(false);
      setData({ name: "", image: null });
      setPreviewImage(null);
      fetchCategories();
    } catch (err) {
      console.log(err);
      alert("Error creating category");
    }
  };

  // Delete Category
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category?")) return;

    try {
      await deleteCategoryAPI(id);
      fetchCategories();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Categories</h1>

        <button
          onClick={() => setShowModal(true)}
          className="bg-[#00A884] text-white px-5 py-3 rounded-xl flex items-center gap-2"
        >
          <Plus size={18} /> Add Category
        </button>
      </div>

      {/* TABLE (Perfect 4-column alignment) */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <table className="w-full border border-gray-300 border-collapse">

          {/* HEADER */}
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-3 text-left w-20">S No</th>
              <th className="border border-gray-300 px-4 py-3 text-left">Name</th>
              <th className="border border-gray-300 px-4 py-3 text-center w-40">Image</th>
              <th className="border border-gray-300 px-4 py-3 text-center w-32">Actions</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {categories.map((item, index) => (
              <tr key={item._id} className="hover:bg-gray-50">

                {/* # */}
                <td className="border border-gray-300 px-4 py-3 text-left">
                  {index + 1}
                </td>

                {/* Name */}
                <td className="border border-gray-300 px-4 py-3 text-left">
                  {item.name}
                </td>

                {/* Image */}
                <td className="border border-gray-300 px-4 py-3 text-center">
                  <img
                    src={`https://repairwalaunitech.onrender.com/${item.image}`}
                    className="h-16 w-16 object-cover mx-auto rounded-lg"
                  />
                </td>

                {/* Action */}
                <td className="border border-gray-300 px-4 py-3 text-center">
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

      {/* Add Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-xl w-full max-w-lg shadow-xl">
            <div className="flex justify-between mb-6">
              <h2 className="text-2xl font-bold">Add Category</h2>
              <X size={24} onClick={() => setShowModal(false)} />
            </div>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Category Name"
                className="w-full border rounded-xl px-4 py-3"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
              />

              {/* Drag Drop Box */}
              <label className="font-medium">Category Image</label>

              <div
                className="border-2 border-dashed rounded-xl p-5 text-center cursor-pointer bg-gray-50"
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
              >
                <input
                  type="file"
                  className="hidden"
                  id="category-image"
                  onChange={handleFileChange}
                />

                {!previewImage ? (
                  <label
                    htmlFor="category-image"
                    className="cursor-pointer flex flex-col items-center"
                  >
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

              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2 bg-gray-200 rounded-lg"
                >
                  Cancel
                </button>

                <button
                  onClick={handleAddCategory}
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

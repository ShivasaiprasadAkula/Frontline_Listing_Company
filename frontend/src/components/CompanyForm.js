import { useForm } from "react-hook-form";

function CompanyForm({ onSubmit, title, submitText, defaultValues = {} }) {
  const { register, handleSubmit, formState: { errors }, setError, clearErrors, trigger } = useForm({ defaultValues });

  const renderLabel = (name, required = false) => (
    <label className="mb-1 font-medium text-gray-700 capitalize">
      {name}{required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-7xl bg-white p-8 rounded-3xl space-y-6 shadow-lg border border-gray-400">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">{title}</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="bg-gray-100 p-6 rounded-2xl shadow-md space-y-4 border border-gray-300">
            <h3 className="text-xl font-semibold text-gray-700">General Info</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                {renderLabel("name", true)}
                <input
                  className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Company Name"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && <span className="text-red-500 text-sm mt-1">{errors.name.message}</span>}
              </div>
              <div className="flex flex-col">
                {renderLabel("industry", true)}
                <select
                  className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                  {...register("industry", { required: "Industry is required" })}
                >
                  <option value="">Select Industry</option>
                  <option value="Information Technology">Information Technology</option>
                  <option value="Finance">Finance</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Education">Education</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Retail">Retail</option>
                  <option value="Other">Other</option>
                </select>
                {errors.industry && <span className="text-red-500 text-sm mt-1">{errors.industry.message}</span>}
              </div>
              <div className="flex flex-col">
                {renderLabel("type", true)}
                <select
                  className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                  {...register("type", { required: "Type is required" })}
                >
                  <option value="">Select Type</option>
                  <option value="Startup">Startup</option>
                  <option value="MNC">MNC</option>
                  <option value="SME">SME</option>
                  <option value="Other">Other</option>
                </select>
                {errors.type && <span className="text-red-500 text-sm mt-1">{errors.type.message}</span>}
              </div>
              <div className="flex flex-col">
                {renderLabel("description", false)}
                <input
                  className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Description"
                  {...register("description")}
                />
              </div>
            </div>
          </div>
          <div className="bg-gray-100 p-6 rounded-2xl shadow-md space-y-4 border border-gray-300">
            <h3 className="text-xl font-semibold text-gray-700">Location</h3>
            <div className="flex flex-col">
              {renderLabel("address", true)}
              <textarea
                className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                {...register("address", { required: "Address is required" })}
                placeholder="Full Address"
                rows={5}
              />
              {errors.address && <span className="text-red-500 text-sm mt-1">{errors.address.message}</span>}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                {renderLabel("city", true)}
                <input
                  className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="City"
                  {...register("city", { required: "City is required" })}
                />
                {errors.city && <span className="text-red-500 text-sm mt-1">{errors.city.message}</span>}
              </div>
              <div className="flex flex-col">
                {renderLabel("state", true)}
                <input
                  className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="State"
                  {...register("state", { required: "State is required" })}
                />
                {errors.state && <span className="text-red-500 text-sm mt-1">{errors.state.message}</span>}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                {renderLabel("country", true)}
                <input
                  className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Country"
                  {...register("country")}
                />
              </div>
              <div className="flex flex-col">
                {renderLabel("pincode", true)}
                <input
                  className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Pincode"
                  {...register("pincode", {
                    required: "Pincode is required",
                    onBlur: (e) => {
                      const val = e.target.value;
                      if (val && val.length !== 6) setError("pincode", { type: "manual", message: "Pincode must be 6 digits" });
                    },
                  })}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/[^0-9]/.test(value)) {
                      setError("pincode", { type: "manual", message: "Use numbers only" });
                    } else {
                      clearErrors("pincode");
                    }
                    e.target.value = value.replace(/[^0-9]/g, "");
                  }}
                />
                {errors.pincode && <span className="text-red-500 text-sm mt-1">{errors.pincode.message}</span>}
              </div>
            </div>
          </div>
          <div className="bg-gray-100 p-6 rounded-2xl shadow-md space-y-4 border border-gray-300">
            <h3 className="text-xl font-semibold text-gray-700">Other Info</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col">
                {renderLabel("foundedYear", true)}
                <input
                  className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Founded Year"
                  {...register("foundedYear", {
                    required: "Founded Year is required",
                    onBlur: (e) => {
                      const val = e.target.value;
                      if (val && val.length !== 4) setError("foundedYear", { type: "manual", message: "Founded Year must be 4 digits" });
                    },
                  })}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/[^0-9]/.test(value)) {
                      setError("foundedYear", { type: "manual", message: "Use numbers only" });
                    } else {
                      clearErrors("foundedYear");
                    }
                    e.target.value = value.replace(/[^0-9]/g, "");
                  }}
                />
                {errors.foundedYear && <span className="text-red-500 text-sm mt-1">{errors.foundedYear.message}</span>}
              </div>
              <div className="flex flex-col">
                {renderLabel("employeeCount", true)}
                <input
                  className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Employee Count"
                  {...register("employeeCount", {
                    required: "Employee Count is required",
                    onBlur: (e) => { },
                  })}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/[^0-9]/.test(value)) {
                      setError("employeeCount", { type: "manual", message: "Use numbers only" });
                    } else {
                      clearErrors("employeeCount");
                    }
                    e.target.value = value.replace(/[^0-9]/g, "");
                  }}
                />
                {errors.employeeCount && <span className="text-red-500 text-sm mt-1">{errors.employeeCount.message}</span>}
              </div>
              <div className="flex flex-col">
                {renderLabel("website", false)}
                <input
                  className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Website URL"
                  {...register("website")}
                />
              </div>
            </div>
          </div>
          <div className="bg-gray-100 p-6 rounded-2xl shadow-md space-y-4 border border-gray-300">
            <h3 className="text-xl font-semibold text-gray-700">Contact Info</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col">
                {renderLabel("email", true)}
                <input
                  className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter valid email" },
                    onBlur: () => trigger("email"),
                  })}
                />
                {errors.email && <span className="text-red-500 text-sm mt-1">{errors.email.message}</span>}
              </div>
              <div className="flex flex-col">
                {renderLabel("phone", true)}
                <input
                  className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Phone Number"
                  {...register("phone", {
                    required: "Phone number is required",
                    onBlur: (e) => {
                      const val = e.target.value;
                      if (val && val.length !== 10) setError("phone", { type: "manual", message: "Phone number must be 10 digits" });
                    },
                  })}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/[^0-9]/.test(value)) {
                      setError("phone", { type: "manual", message: "Use numbers only" });
                    } else {
                      clearErrors("phone");
                    }
                    e.target.value = value.replace(/[^0-9]/g, "");
                  }}
                />
                {errors.phone && <span className="text-red-500 text-sm mt-1">{errors.phone.message}</span>}
              </div>
              <div className="flex flex-col">
                {renderLabel("isActive", false)}
                <select
                  className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                  {...register("isActive")}
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-10 py-2.5 rounded-2xl font-semibold transition"
            >
              {submitText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CompanyForm;

import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Building,
  Calendar,
  Eye,
  EyeOff,
  Upload,
  Check,
  AlertCircle,
} from "lucide-react";

const createManagerByAdmin = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    storeName: "",
    storeType: "",
    experience: "",
    education: "",
    password: "",
    confirmPassword: "",
    profilePicture: null,
    resume: null,
    agreeTerms: false,
    receiveUpdates: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);

  const storeTypes = [
    "Retail Store",
    "Grocery Store",
    "Electronics Store",
    "Clothing Store",
    "Restaurant",
    "Pharmacy",
    "Hardware Store",
    "Bookstore",
    "Other",
  ];

  const experienceLevels = [
    "Entry Level (0-1 years)",
    "Mid Level (2-5 years)",
    "Senior Level (5-10 years)",
    "Executive Level (10+ years)",
  ];

  const educationLevels = [
    "High School",
    "Associate Degree",
    "Bachelor's Degree",
    "Master's Degree",
    "MBA",
    "Other",
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleFileUpload = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        [fieldName]: file,
      }));
    }
  };

  const validateStep = (currentStep) => {
    const newErrors = {};

    if (currentStep === 1) {
      if (!formData.firstName.trim())
        newErrors.firstName = "First name is required";
      if (!formData.lastName.trim())
        newErrors.lastName = "Last name is required";
      if (!formData.email.trim()) newErrors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(formData.email))
        newErrors.email = "Invalid email format";
      if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
      if (!formData.dateOfBirth)
        newErrors.dateOfBirth = "Date of birth is required";
    }

    if (currentStep === 2) {
      if (!formData.address.trim()) newErrors.address = "Address is required";
      if (!formData.city.trim()) newErrors.city = "City is required";
      if (!formData.state.trim()) newErrors.state = "State is required";
      if (!formData.zipCode.trim()) newErrors.zipCode = "ZIP code is required";
    }

    if (currentStep === 3) {
      if (!formData.storeName.trim())
        newErrors.storeName = "Store name is required";
      if (!formData.storeType) newErrors.storeType = "Store type is required";
      if (!formData.experience)
        newErrors.experience = "Experience level is required";
      if (!formData.education)
        newErrors.education = "Education level is required";
    }

    if (currentStep === 4) {
      if (!formData.password) newErrors.password = "Password is required";
      else if (formData.password.length < 8)
        newErrors.password = "Password must be at least 8 characters";
      if (!formData.confirmPassword)
        newErrors.confirmPassword = "Please confirm your password";
      else if (formData.password !== formData.confirmPassword)
        newErrors.confirmPassword = "Passwords do not match";
      if (!formData.agreeTerms)
        newErrors.agreeTerms = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(step)) return;

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Form submitted:", formData);
      setIsSubmitting(false);
      alert(
        "Registration successful! Welcome to our store management platform."
      );
    }, 2000);
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3, 4].map((stepNumber) => (
        <div key={stepNumber} className="flex items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
              stepNumber <= step
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            {stepNumber < step ? <Check size={16} /> : stepNumber}
          </div>
          {stepNumber < 4 && (
            <div
              className={`w-16 h-1 mx-2 ${
                stepNumber < step ? "bg-blue-600" : "bg-gray-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Personal Information
        </h2>
        <p className="text-gray-600 mt-2">
          Let's start with your basic details
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First Name *
          </label>
          <div className="relative">
            <User
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.firstName ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your first name"
            />
          </div>
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle size={16} />
              {errors.firstName}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Last Name *
          </label>
          <div className="relative">
            <User
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.lastName ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your last name"
            />
          </div>
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle size={16} />
              {errors.lastName}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email Address *
        </label>
        <div className="relative">
          <Mail
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your email address"
          />
        </div>
        {errors.email && (
          <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
            <AlertCircle size={16} />
            {errors.email}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number *
          </label>
          <div className="relative">
            <Phone
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.phone ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your phone number"
            />
          </div>
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle size={16} />
              {errors.phone}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date of Birth *
          </label>
          <div className="relative">
            <Calendar
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.dateOfBirth ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>
          {errors.dateOfBirth && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle size={16} />
              {errors.dateOfBirth}
            </p>
          )}
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Address Information
        </h2>
        <p className="text-gray-600 mt-2">Where are you located?</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Street Address *
        </label>
        <div className="relative">
          <MapPin
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.address ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your street address"
          />
        </div>
        {errors.address && (
          <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
            <AlertCircle size={16} />
            {errors.address}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            City *
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.city ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="City"
          />
          {errors.city && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle size={16} />
              {errors.city}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            State *
          </label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.state ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="State"
          />
          {errors.state && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle size={16} />
              {errors.state}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ZIP Code *
          </label>
          <input
            type="text"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.zipCode ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="ZIP Code"
          />
          {errors.zipCode && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle size={16} />
              {errors.zipCode}
            </p>
          )}
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Professional Information
        </h2>
        <p className="text-gray-600 mt-2">
          Tell us about your store and experience
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Store Name *
        </label>
        <div className="relative">
          <Building
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            name="storeName"
            value={formData.storeName}
            onChange={handleInputChange}
            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.storeName ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your store name"
          />
        </div>
        {errors.storeName && (
          <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
            <AlertCircle size={16} />
            {errors.storeName}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Store Type *
        </label>
        <select
          name="storeType"
          value={formData.storeType}
          onChange={handleInputChange}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.storeType ? "border-red-500" : "border-gray-300"
          }`}
        >
          <option value="">Select store type</option>
          {storeTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        {errors.storeType && (
          <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
            <AlertCircle size={16} />
            {errors.storeType}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Experience Level *
          </label>
          <select
            name="experience"
            value={formData.experience}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.experience ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select experience level</option>
            {experienceLevels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
          {errors.experience && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle size={16} />
              {errors.experience}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Education Level *
          </label>
          <select
            name="education"
            value={formData.education}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.education ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select education level</option>
            {educationLevels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
          {errors.education && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle size={16} />
              {errors.education}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Profile Picture
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="mt-4">
              <label className="cursor-pointer">
                <span className="text-sm text-gray-600">
                  {formData.profilePicture
                    ? formData.profilePicture.name
                    : "Click to upload profile picture"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, "profilePicture")}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Resume/CV
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="mt-4">
              <label className="cursor-pointer">
                <span className="text-sm text-gray-600">
                  {formData.resume
                    ? formData.resume.name
                    : "Click to upload resume"}
                </span>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => handleFileUpload(e, "resume")}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Account Security</h2>
        <p className="text-gray-600 mt-2">
          Set up your account password and preferences
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Password *
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className={`w-full px-4 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Create a strong password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {errors.password && (
          <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
            <AlertCircle size={16} />
            {errors.password}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Confirm Password *
        </label>
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className={`w-full px-4 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.confirmPassword ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Confirm your password"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
            <AlertCircle size={16} />
            {errors.confirmPassword}
          </p>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="agreeTerms"
              name="agreeTerms"
              type="checkbox"
              checked={formData.agreeTerms}
              onChange={handleInputChange}
              className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="agreeTerms" className="font-medium text-gray-700">
              I agree to the Terms and Conditions *
            </label>
            <p className="text-gray-500">
              By checking this box, you agree to our terms of service and
              privacy policy.
            </p>
          </div>
        </div>
        {errors.agreeTerms && (
          <p className="text-sm text-red-600 flex items-center gap-1">
            <AlertCircle size={16} />
            {errors.agreeTerms}
          </p>
        )}

        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="receiveUpdates"
              name="receiveUpdates"
              type="checkbox"
              checked={formData.receiveUpdates}
              onChange={handleInputChange}
              className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
          </div>
          <div className="ml-3 text-sm">
            <label
              htmlFor="receiveUpdates"
              className="font-medium text-gray-700"
            >
              Receive email updates
            </label>
            <p className="text-gray-500">
              Get notified about new features, updates, and promotional offers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Store Manager Registration
          </h1>
          <p className="mt-2 text-gray-600">
            Join our platform and start managing your store efficiently
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          {renderStepIndicator()}

          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
          {step === 4 && renderStep4()}

          <div className="flex justify-between mt-8">
            <button
              type="button"
              onClick={handlePrevious}
              disabled={step === 1}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                step === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Previous
            </button>

            {step < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                onClick={()=>handleSubmit()}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                } text-white`}
              >
                {isSubmitting ? "Creating Account..." : "Create Account"}
              </button>
            )}
          </div>
          {/* </form> */}
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <a
              href="#"
              className="text-blue-600 hover:text-blue-500 font-medium"
            >
              Sign in here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default createManagerByAdmin;

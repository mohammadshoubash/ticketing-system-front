import AppLayout from "../layouts/AppLayout.jsx";
import Breadcrumb from "../components/Breadcrumb.jsx";
import priorities from "../data/priorities.json";
import countries from "../data/countries.json";
import languages from "../data/languages.json";
import formfields from "../data/formfields.json";

export default function CreateTicket() {
  return (
    <AppLayout>
      <Breadcrumb pageName="Create" />

      <div className="mb-6">
        <h1 className="text-3xl font-bold">Create new Ticket</h1>
      </div>

      <form encType="multipart/form-data">
        {/* Title */}
        <div className="mb-4">
          <label className="block mb-2 font-medium" htmlFor="title">
            Title
          </label>
          <input
            className="w-full p-2 rounded"
            type="text"
            id="title"
            name="title"
            placeholder="Enter ticket title"
          />
        </div>

        {/* Type */}
        <div className="mb-4">
          <label className="block mb-2 font-medium" htmlFor="type">
            Type
          </label>
          <select className="w-full p-2 rounded" id="type" name="type">
            <option value="">Select Type</option>
            <option value="voice">Voice</option>
            <option value="non-voice">Non Voice</option>
          </select>
        </div>

        {/* Priority */}
        <div className="mb-4">
          <label className="block mb-2 font-medium" htmlFor="priority">
            Priority
          </label>
          <select className="w-full p-2 rounded" id="priority" name="priority">
            <option value="">Select Priority</option>
            {priorities.map((priority) => (
              <option key={priority.value} value={priority.value}>
                {priority.priority}
              </option>
            ))}
          </select>
        </div>

        {/* Comment */}
        <div className="mb-4">
          <label className="block mb-2 font-medium" htmlFor="comment">
            Comment
          </label>
          <textarea
            className="w-full p-2 rounded"
            id="comment"
            name="comment"
            rows="4"
            placeholder="Enter ticket comment"
          ></textarea>
        </div>

        {/* Attachment */}
        <div className="mb-4">
          <label className="block mb-2 font-medium" htmlFor="attachment">
            Attachment
          </label>
          
          <input class="block w-full text-gray-900 border border-gray-50 rounded-lg cursor-pointer bg-gray-50" id="file_input" type="file" name="attachment" />
        </div>

        {/* Country */}
        <div className="mb-4">
          <label className="block mb-2 font-medium" htmlFor="country">
            Country
          </label>
          <select className="w-full p-2 rounded" id="country" name="country">
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country.common} value={country.common}>
                {country.common}
              </option>
            ))}
          </select>
        </div>

        {/* Language */}
        <div className="mb-4">
          <label className="block mb-2 font-medium" htmlFor="language">
            Language
          </label>
          <select className="w-full p-2 rounded" id="language" name="language">
            <option value="">Select Language</option>
            {languages.map((language) => (
              <option key={language.language} value={language.language}>
                {language.language}
              </option>
            ))}
          </select>
        </div>
        
        {/* Customer Details */}
        <div className="mt-4">
          <h2 className="text-xl">Cutomer Information</h2>
          <hr className="mb-4 mt-2 text-gray-300" />
        </div>

        {/* Form fields */}
        {formfields.map((field) => (
          <div className="mb-4" key={field.id}>
            <label className="block mb-2 font-medium" htmlFor={field.id}>
              {field.label}
            </label>
            {field.type === "textarea" ? (
              <textarea
                className="w-full p-2 rounded"
                id={field.id}
                name={field.id}
                rows="4"
                placeholder={field.placeholder}
              ></textarea>
            ) : (
              <input
                className="w-full p-2 rounded"
                type={field.type}
                id={field.id}
                name={field.name}
                placeholder={field.placeholder}
              />
            )}
          </div>
        ))}

        <div className="flex items-center gap-2">
          <button
            className="primary-btn px-4 py-2 rounded cursor-pointer"
            type="submit"
          >
            Create Ticket
          </button>
          <a
            className="secondary-btn px-4 py-2 rounded cursor-pointer"
            href="/"
          >
            Back
          </a>
        </div>
      </form>
    </AppLayout>
  );
}

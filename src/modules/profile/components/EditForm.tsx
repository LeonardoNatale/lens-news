import React from 'react'

// Create a EditForm component
const EditForm = (props: any) => {
  // Set the initial editing state to false

  return (
    <div className="w-full max-w-sm bg-slate-100 p-6 rounded-lg">
      <form className="flex flex-col gap-4 ">
        <div>
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="bio" className="block text-gray-700 text-sm font-bold mb-2">
            Bio:
          </label>
          <textarea
            id="bio"
            name="bio"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ></textarea>
        </div>
        <div>
          <label
            htmlFor="cover_picture"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Cover Picture URL:
          </label>
          <input
            type="url"
            id="cover_picture"
            name="cover_picture"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={props.onCancel}
          >
            Cancel
          </button>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditForm

import { useState } from "react";

export default function DeleteAllButton({ handleDeleteAll }) {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div>
      <button
        className="bg-red-600 cursor-pointer px-4 py-2 transition-transform 
        hover:-translate-y-1 rounded-sm absolute top-4 right-50 font-bold"
        onClick={() => setIsVisible(true)}
      >
        Delete all
      </button>
      {isVisible && (
        <div
          className="fixed inset-0 bg-black/50 flex justify-center items-center z-10"
          onClick={() => setIsVisible(false)}
        >
          <div
            className="border-2 rounded-2xl bg-white h-50 w-100 grid grid-rows-2 grid-cols-2 gap-x-2 justify-center items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="col-span-2 text-2xl mx-2 justify-self-center text-center">
              This will delete all items <br />
              and is not undoable!
            </p>
            <button
              className="bg-blue-600 px-2 py-1 h-10 border-0 m-2 rounded-sm cursor-pointer"
              onClick={() => setIsVisible(false)}
            >
              Cancel
            </button>

            <button
              className="bg-amber-300 px-2 py-1 h-10 border-0 m-2 rounded-sm cursor-pointer"
              onClick={() => {
                handleDeleteAll();
                setIsVisible(false);
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

import { FaFacebook, FaWhatsapp } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { MdEmail } from "react-icons/md";

export default function Recommendations() {
  return (
    <div className="w-[95%] h-[85%] mx-auto bg-white rounded-md mt-4 flex flex-col items-center justify-center">
      <div className="mb-4">
        <p className="text-center font-bold">
          Hey Champ!
          <br /> It looks like you don&apos;t have any recommendations yet
        </p>
      </div>
      <div className="mb-6">
        <p className="text-center">
          But don&apos;t worry, you can always request for recommendations{" "}
          <br /> from your colleagues, friends and family
        </p>
      </div>

      <div className="w-[60%] h-40 border-dashed border-2 border-gray-200 rounded-md">
        <p className="text-center mb-4 font-bold">Ask for recommendations via:</p>
        <div className="flex gap-4 w-full items-center justify-center">
          <button
            type="button"
            title="Email button"
            className="bg-amber-400 text-white p-4 rounded-full flex gap-2 items-center"
          >
            <MdEmail />
            <span>Email</span>
          </button>
          <button
            type="button"
            title="WhatsApp button"
            className="bg-green-400 text-white p-4 rounded-full flex gap-2 items-center"
          >
            <FaWhatsapp />
            <span>WhatsApp</span>
          </button>
          <button
            type="button"
            title="Facebook button"
            className="bg-blue-600 text-white p-4 rounded-full flex gap-2 items-center"
          >
            <FaFacebook />
            <span>Facebook</span>
          </button>
          <button
            type="button"
            title="Twitter button"
            className="bg-black text-white p-4 rounded-full flex gap-2 items-center"
          >
            <BsTwitterX />
            <span>x(Twitter)</span>
          </button>
        </div>
      </div>
    </div>
  );
}

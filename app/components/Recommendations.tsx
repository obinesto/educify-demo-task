"use client";
import { FaFacebook, FaWhatsapp } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { useState } from "react";

export default function Recommendations() {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [emailData, setEmailData] = useState({
    recipientEmail: "",
    message: "",
  });

  const handleEmailClick = () => {
    setShowEmailForm(true);
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      "I'd like to request a professional recommendation from you."
    );
    window.open(`https://wa.me/?text=${message}`, "_blank");
  };

  const handleFacebookClick = () => {
    window.open("https://www.facebook.com/sharer/sharer.php", "_blank");
  };

  const handleTwitterClick = () => {
    const message = encodeURIComponent(
      "I'd like to request a professional recommendation."
    );
    window.open(`https://twitter.com/intent/tweet?text=${message}`, "_blank");
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailData.recipientEmail && emailData.message) {
      //email sending logic with call from API end point
      console.log("Sending email:", emailData);
      setShowEmailForm(false);
      setEmailData({ recipientEmail: "", message: "" });
    }
  };

  const handleEmailClose = () => {
    setShowEmailForm(false);
    setEmailData({ recipientEmail: "", message: "" });
  };

  return (
    <div className="w-[95%] h-[85%] mx-auto bg-white rounded-md mt-4 flex flex-col items-center justify-center relative">
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
        <p className="text-center mb-4 font-bold">
          Ask for recommendations via:
        </p>
        <div className="flex gap-4 w-full items-center justify-center">
          <button
            type="button"
            title="Email button"
            onClick={handleEmailClick}
            className="bg-amber-400 text-white p-4 rounded-full flex gap-2 items-center cursor-pointer"
          >
            <MdEmail />
            <span>Email</span>
          </button>
          <button
            type="button"
            title="WhatsApp button"
            onClick={handleWhatsAppClick}
            className="bg-green-400 text-white p-4 rounded-full flex gap-2 items-center cursor-pointer"
          >
            <FaWhatsapp />
            <span>WhatsApp</span>
          </button>
          <button
            type="button"
            title="Facebook button"
            onClick={handleFacebookClick}
            className="bg-blue-600 text-white p-4 rounded-full flex gap-2 items-center cursor-pointer"
          >
            <FaFacebook />
            <span>Facebook</span>
          </button>
          <button
            type="button"
            title="Twitter button"
            onClick={handleTwitterClick}
            className="bg-black text-white p-4 rounded-full flex gap-2 items-center cursor-pointer"
          >
            <BsTwitterX />
            <span>x(Twitter)</span>
          </button>
        </div>
      </div>

      {showEmailForm && (
        <div className="fixed bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-[500px] max-w-[90%]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Get Recommendation via email</h3>
              <button
                onClick={handleEmailClose}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleEmailSubmit}>
              <div className="mb-4">
                <label htmlFor="recipientEmail" className="block mb-2">
                  Recipient Email:
                </label>
                <input
                  type="email"
                  id="recipientEmail"
                  value={emailData.recipientEmail}
                  onChange={(e) =>
                    setEmailData({
                      ...emailData,
                      recipientEmail: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block mb-2">
                  Message:
                </label>
                <textarea
                  id="message"
                  value={emailData.message}
                  onChange={(e) =>
                    setEmailData({ ...emailData, message: e.target.value })
                  }
                  className="w-full p-2 border rounded h-32"
                  placeholder="Enter your message"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={!emailData.recipientEmail || !emailData.message}
                className={`w-full p-3 rounded text-white ${
                  !emailData.recipientEmail || !emailData.message
                    ? "bg-gray-400"
                    : "bg-amber-400 hover:bg-amber-500"
                }`}
              >
                Send Email
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
